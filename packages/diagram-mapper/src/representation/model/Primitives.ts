/**
 * Represents a two-dimensional point on a plane.
 */
export interface Point {
  x: number
  y: number
}

/**
 * Represents a two-dimensional dimension (respectively size).
 */
export interface Dimension {
  width: number
  height: number
}

/**
 * Bounds represent a rectangular area (hence point and dimension) on a plane.
 */
export type Bounds = Point & Dimension

/**
 * Represents an indentation in context of bounds.
 */
export interface Padding {
  top: number
  bottom: number
  left: number
  right: number
}

/**
 * Represents an image with scaling.
 *
 * TODO: Move this to appearance.
 */
export interface ImageReference {
  url: string
  scale?: number
}

/**
 * Identifies a side respectively position on a geometrical shape.
 */
export enum Location {
  North,
  South,
  West,
  East
}

/**
 * Represents a function which takes a domain model element as well as
 * the domain model and returns the updated domain model.
 */
export type ModelMapper<T> = (modelElement: any, model: any) => T
