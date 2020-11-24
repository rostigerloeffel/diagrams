import * as _ from 'lodash'
import { Point, Bounds } from 'diagram-js/lib/core'
import BaseLayouter, { LayoutingHints } from 'diagram-js/lib/layout/BaseLayouter'
import { Connection, Shape } from 'diagram-js/lib/model'
import { repairConnection, withoutRedundantPoints } from 'diagram-js/lib/layout/ManhattanLayout'
import { getMid } from 'diagram-js/lib/layout/LayoutUtil'
import { Port } from '../representation/model/Node'
import { Location } from '../representation/model/Primitives'

export type LayoutDirection = 't' | 'b' | 'l' | 'r' | 'v' | 'h'

/**
 * This layouter is used by diagram-js to layout edges during user interactions.
 */
export default class Layouter extends BaseLayouter {
  layoutConnection(connection: Connection, hints: LayoutingHints = {}) {
    const source: Bounds = hints.source || connection.source
    const target: Bounds = hints.target || connection.target
    const waypoints: Array<Point> = hints.waypoints || connection.waypoints

    const connectionStart: Point = hints.connectionStart || getMid(source)
    const connectionEnd: Point = hints.connectionEnd || getMid(target)

    // Preview or render already established connection between two given shapes
    if (this.hasValidBusinessObject(source) && this.hasValidBusinessObject(target)) {
      const manhattanOptions = _.assign({ preferredLayouts: this.getPreferredLayouts(source, target) }, hints)
      return withoutRedundantPoints(
        repairConnection(source, target, connectionStart, connectionEnd, [], manhattanOptions)
      )
    }

    // Render preview with at most one shape selected
    return [connectionStart, connectionEnd]
  }

  hasValidBusinessObject(shape?: Shape): boolean {
    return shape && shape.businessObject
  }

  getPreferredLayouts(source: Shape, target: Shape) {
    const layoutDirection = this.areVerticallyDisjunct(this.getNode(source), this.getNode(target)) ? 'v' : 'h'

    let sourceLayout = layoutDirection
    let targetLayout = layoutDirection

    if (_.isEqual(source.type, 'port')) {
      sourceLayout = this.mapPortToLayout(source.businessObject as Port)
    }

    if (_.isEqual(target.type, 'port')) {
      targetLayout = this.mapPortToLayout(target.businessObject as Port)
    }

    return [`${sourceLayout}:${targetLayout}`]
  }

  protected mapPortToLayout(port: Port): LayoutDirection {
    switch (port.location) {
      case Location.North:
        return 't'
      case Location.South:
        return 'b'
      case Location.West:
        return 'l'
      case Location.East:
        return 'r'
    }
  }

  protected getNode(shape: Shape) {
    if (_.isEqual(shape.type, 'port')) {
      return shape.parent
    } else {
      return shape
    }
  }

  protected areVerticallyDisjunct(bounds1: Shape, bounds2: Shape) {
    return this.isStrictlyAbove(bounds1, bounds2) || this.isStrictlyAbove(bounds2, bounds1)
  }

  protected isStrictlyAbove(bounds1: Shape, bounds2: Shape) {
    return bounds1.y + bounds1.height < bounds2.y
  }
}
