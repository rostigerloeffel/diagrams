import { FieldAppearance, NodeAppearance } from './Appearance'
import { NodeBounds } from './Bounds'
import { Bounds, Location, ModelMapper, Point } from './Primitives'

/**
 * Common base interface for all node structure-related elements.
 */
export interface BaseElement {
  // The related model element respectively value
  element: any

  // The key, used to identify the element.
  // Be aware, whether the key is unique or not on its own
  // depends on the kind of element. Node keys are unique,
  // field and port keys are unique when combined with
  // their parent node keys.
  key: string

  // TODO: Bounds are meaningless on edges
  bounds: Bounds
}

/**
 * Nodes represent domain elements. Nodes may be nested to
 * depict complex domain structures. Moreover. nodes can be
 * connected by edges.
 */
export interface Node extends BaseElement {
  children: Node[]
  fields: Field[]
  ports: Port[]

  bounds: NodeBounds
  appearance: NodeAppearance

  // Behavioral aspects
  moveableTo: string[]
  onReceive: ModelMapper<any>
}

/**
 * Fields represent domain element properties displayed on nodes.
 */
export interface Field extends BaseElement {
  // TODO: Consider moving these properties to appearance, at least image
  label?: string,
  image?: string,

  appearance: FieldAppearance
}

/**
 * Ports represent edge endpoints on nodes.
 */
export interface Port extends BaseElement {
  location: Location
}

/**
 * Edges represent connections between ports and nodes.
 */
export interface Edge extends BaseElement {
  source: string
  target: string

  waypoints: Point[]
}
