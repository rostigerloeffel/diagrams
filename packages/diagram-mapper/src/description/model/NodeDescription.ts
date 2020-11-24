import { NodeAppearance, FieldAppearance, PortAppearance } from '../../representation/model/Appearance'
import { NodeDimension } from '../../representation/model/Bounds'
import { Location, ModelMapper } from '../../representation/model/Primitives'

export type Query<ResultType> = ((model: any) => ResultType) | ResultType

export interface BaseElementDescription {
  element: Query<any | any[]>
  key: Query<string>
}

export type NodeDimensionHint = Partial<NodeDimension>
export type NodeAppearanceHint = Partial<NodeAppearance>

export interface BaseNodeDescription {
  template?: string

  incoming?: IncomingEdgeDescription[]
  outgoing?: OutgoingEdgeDescription[]

  fields?: FieldDescription[]
  ports?: PortDescription[]

  size?: Query<NodeDimensionHint>
  appearance?: Query<NodeAppearanceHint>

  moveableTo?: string[]
  onReceive?: ModelMapper<any>
}

export interface NodeDescriptionTemplate extends BaseNodeDescription {
  key: string
}
export interface NodeDescription extends BaseElementDescription, BaseNodeDescription {
  children?: NodeDescription[]
}

export type FieldAppearanceHint = Partial<FieldAppearance>

export interface FieldDescription extends BaseElementDescription {
  editable?: boolean
  label?: Query<string>
  image?: Query<string>
  appearance?: Query<FieldAppearanceHint>
}

export type PortAppearanceHint = Partial<PortAppearance>

export interface PortDescription extends BaseElementDescription {
  incoming?: IncomingEdgeDescription[]
  outgoing?: OutgoingEdgeDescription[]

  location?: Query<Location>
  appearance?: Query<PortAppearanceHint>
}

export interface IncomingEdgeDescription extends BaseElementDescription {
  source: Query<string>
}

export interface OutgoingEdgeDescription extends BaseElementDescription {
  target: Query<string>
}

export interface EdgeDescription extends IncomingEdgeDescription, OutgoingEdgeDescription, BaseElementDescription {}
