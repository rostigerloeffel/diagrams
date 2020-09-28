declare module 'diagram-js/lib/features/resize' {
  import { Module } from 'didi'
  import { Shape } from 'diagram-js/lib/model'
  import { Bounds, Dimension, Direction } from 'diagram-js/lib/core'

  const module: Module
  export default module

  export type DirectionOrContext =
    | {
        direction: Direction
        [attribute: string]: any
      }
    | Direction

  export interface Resize {
    canResize(context: any): boolean | null
    activate(event: any, shape: Shape, contextOrDirection: DirectionOrContext): void
    computeMinResizeBox(context: {
      direction: string
      shape: Shape
      minDimensions?: Dimension
      [attribute: string]: any
    }): Bounds
  }

  export interface ResizeHandles {
    makeDraggable(element: Shape, gfx: SVGAElement, direction: DirectionOrContext): void
    createResizer(element: Shape, direction: DirectionOrContext): void
    addResizer(shape: Shape): void
    removeResizers(): void
  }

  export interface ResizePreview {}
}

declare module 'diagram-js/lib/features/resize/Resize' {
  import { Shape } from 'diagram-js/lib/model'
  import { Bounds, Dimension } from 'diagram-js/lib/core'
  import { Resize, DirectionOrContext } from 'diagram-js/lib/features/resize'

  export default class implements Resize {
    canResize(context: any): boolean | null
    activate(event: any, shape: Shape, contextOrDirection: DirectionOrContext): void
    computeMinResizeBox(context: {
      direction: string
      shape: Shape
      minDimensions?: Dimension
      [attribute: string]: any
    }): Bounds
  }
}

declare module 'diagram-js/lib/features/resize/ResizeHandles' {
  import { Shape } from 'diagram-js/lib/model'
  import { ResizeHandles, DirectionOrContext } from 'diagram-js/lib/features/resize'

  export default class implements ResizeHandles {
    makeDraggable(element: Shape, gfx: SVGAElement, direction: DirectionOrContext): void
    createResizer(element: Shape, direction: DirectionOrContext): void
    addResizer(shape: Shape): void
    removeResizers(): void
  }
}

declare module 'diagram-js/lib/features/resize/ResizePreview' {
  import { ResizePreview } from 'diagram-js/lib/features/resize'

  export default class implements ResizePreview {}
}

declare module 'diagram-js/lib/features/ResizeUtil' {
  import { Point, Bounds, Dimension, Padding, Direction } from 'diagram-js/lib/core'
  import { Shape } from 'diagram-js/lib/model'

  export interface ResizeConstraints {
    min: Padding
    max: Padding
  }

  export function substractTRBL(trblA: Padding, trblB: Padding): Padding
  export function resizeBounds(bounds: Bounds, direction: Direction, delta: Point): Bounds
  export function resizeTRBL(bounds: Bounds, resize: Padding): Bounds
  export function reattachPoint(bounds: Bounds, newBounds: Bounds, point: Point): Point
  export function ensureConstraints(currentBounds: Bounds, resizeConstraints: ResizeConstraints): Bounds
  export function getMinResizeBounds(
    direction: Direction,
    currentBounds: Bounds,
    minDimensions: Dimension,
    childrenBounds: Bounds
  ): Bounds
  // Be careful: 'any' on padding is intented!
  export function addPadding(bbox: Bounds, padding: any | Padding): Bounds
  export function computeChildrenBBox(shapeOrChildren: Shape | Shape[], padding: any | Padding): Bounds
}
