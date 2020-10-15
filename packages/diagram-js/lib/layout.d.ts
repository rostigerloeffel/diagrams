declare module 'diagram-js/lib/layout/BaseLayouter' {
  import { Point } from 'diagram-js/lib/core'
  import { Connection } from 'diagram-js/lib/model'

  export interface LayoutingHints {
    connectionStart?: Point
    connectionEnd?: Point
    source?: Point
    target?: Point
    preferredLayouts?: string[]
    preserveDocking?: string
    [other: string]: any
  }

  export default class BaseLayouter {
    layoutConnection(connection: Connection, hints?: LayoutingHints): Point[]
  }
}

declare module 'diagram-js/lib/layout/ManhattanLayout' {
  import { Point, Bounds } from 'diagram-js/lib/core'
  import { LayoutingHints } from 'diagram-js/lib/layout/BaseLayouter'

  export function connectPoints(a: Point, b: Point, directions: string): Point[]
  export function connectRectangles(
    source: Bounds,
    target: Bounds,
    start: Point,
    end: Point,
    hints: LayoutingHints
  ): Point[]

  export function repairConnection(
    source: Bounds,
    target: Bounds,
    start: Point,
    end: Point,
    waypoints: Point[],
    hints: LayoutingHints
  ): Point[]
  export function repairConnection(source: Bounds, target: Bounds, waypoints: Point[], hints: LayoutingHints): Point[]

  export function tryLayoutStraight(
    source: Bounds,
    target: Bounds,
    start: Point,
    end: Point,
    hints: LayoutingHints
  ): Point[] | null

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
