import { Base, Shape } from 'diagram-js/lib/model'
import { Direction, EventBus } from 'diagram-js/lib/core'
import DefaultResize from 'diagram-js/lib/features/resize/Resize'
import Rules from 'diagram-js/lib/features/rules/Rules'
import Modeling from 'diagram-js/lib/features/modeling/Modeling'
import { computeChildrenBBox, getMinResizeBounds } from 'diagram-js/lib/features/resize/ResizeUtil'
import { Configuration } from '../config/Configuration'
import { Location, Padding } from '../representation/model/Primitives'
import { Port } from '../representation/model/Node'

export default class Resize extends DefaultResize {
  private static $inject = ['representationConfig', 'eventBus', 'rules', 'modeling', 'dragging']

  private _representationConfig: Configuration

  constructor(
    representationConfig: Configuration,
    eventBus: EventBus,
    rules: Rules,
    modeling: Modeling,
    dragging: any
  ) {
    super(eventBus, rules, modeling, dragging)

    this._representationConfig = representationConfig
  }

  computeMinResizeBox(context: any) {
    const { shape, direction, minDimensions, childrenBoxPadding } = context

    const fixedMinDimensions = {
      width: minDimensions?.width || this._representationConfig.minNodeSize.width,
      height: minDimensions?.height || this._representationConfig.minNodeSize.height
    }

    const elementPadding = {
      top: childrenBoxPadding?.top || this._representationConfig.nodePadding.height,
      bottom: childrenBoxPadding?.bottom || this._representationConfig.nodePadding.height,
      left: childrenBoxPadding?.left || this._representationConfig.nodePadding.width,
      right: childrenBoxPadding?.right || this._representationConfig.nodePadding.width
    }

    const childrenBounds = this.computeConnectedNodeBounds(direction, shape, elementPadding)
    const boundingBox = computeChildrenBBox(childrenBounds, elementPadding)

    return getMinResizeBounds(direction, shape, fixedMinDimensions, boundingBox)
  }

  // Fix the default diagram-js resize behavior by considering the port children
  protected computeConnectedNodeBounds(direction: Direction, shape: Shape, padding: Padding) {
    // All non-port children must be handled as usual
    const nonPortChildren = shape.children.filter((child: Base) => child.type !== 'port')

    // Move all ports slightly to center, to prevent resizing above them
    const center = {
      x: shape.x + shape.width / 2.0,
      y: shape.y + shape.height / 2.0
    }

    const portChildren = shape.children
      .filter((child: Base) => child.type === 'port')
      .filter((port: Shape) => !this.matchesDirectionLocation(direction, port.businessObject.location))
      .map((port: Shape) => this.movePortTowardsCenter(port, padding))

    return [...nonPortChildren, ...portChildren]
  }

  protected matchesDirectionLocation(direction: Direction, location: Location) {
    switch (location) {
      case Location.North:
        return direction.includes('n')
      case Location.South:
        return direction.includes('s')
      case Location.West:
        return direction.includes('w')
      case Location.East:
        return direction.includes('e')
    }
  }

  protected movePortTowardsCenter(portShape: Shape, padding: Padding) {
    const port: Port = portShape.businessObject
    return {
      x:
        port.location === Location.West
          ? portShape.x + portShape.width + padding.left
          : port.location === Location.East
          ? portShape.x - portShape.width - padding.right
          : portShape.x,
      y:
        port.location === Location.North
          ? portShape.y + portShape.height + padding.top
          : port.location === Location.South
          ? portShape.y - portShape.height - padding.bottom
          : portShape.y,
      width: portShape.width,
      height: portShape.height
    }
  }
}
