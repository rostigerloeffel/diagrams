declare module 'diagram-js/lib/layout/BaseLayouter' {
  import { Point } from 'diagram-js/lib/core'
  import { Connection } from 'diagram-js/lib/model'

  export interface LayoutingHints {
    connectionStart?: Point
    connectionEnd?: Point
    source?: Point
    target?: Point
    [other: string]: any
  }

  export default class BaseLayouter {
    layoutConnection(connection: Connection, hints?: LayoutingHints): Point[]
  }
}

declare module 'diagram-js/lib/layout/ManhattanLayout' {
  import { Point, Bounds } from 'diagram-js/lib/core'
  import { LayoutingHints } from 'diagram-js/lib/layout/BaseLayouter'

  export interface ManhattanHints extends LayoutingHints {
    preferredLayouts?: string[]
  }

  export function repairConnection(
    source: Bounds,
    target: Bounds,
    start: Point,
    end: Point,
    waypoints: Point[],
    hints: ManhattanHints
  ): Point[]

  export function withoutRedundantPoints(waypoints: Point[]): Point[]
}

declare module 'diagram-js/lib/layout/CroppingConnectionDocking' {
  export default class CroppingConnectionDocking {}
}

declare module 'diagram-js/lib/layout/LayoutUtil' {
  import { Point, Bounds } from 'diagram-js/lib/core'

  export function getMid(bounds: Bounds | Point): Point
  export function getOrientation(rect: Bounds, reference: Bounds, padding: Point | number): string
}