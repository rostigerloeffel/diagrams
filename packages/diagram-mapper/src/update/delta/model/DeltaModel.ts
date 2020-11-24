import { RepresentationModel } from '../../../representation/model/RepresentationModel'
import { DeltaNode, DeltaEdge } from './DeltaNode'

export interface DeltaModel extends RepresentationModel {
  nodes: DeltaNode[]
  edges: DeltaEdge[]
}
