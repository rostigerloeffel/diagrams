import { Bounds, Dimension } from './Primitives'

/**
 * Node bounds are possibly resizable and provide a scrolling context.
 */
export interface NodeDimension extends Dimension {
  resizable: boolean
  scrollable: boolean
}

export interface NodeBounds extends Bounds, NodeDimension {}
