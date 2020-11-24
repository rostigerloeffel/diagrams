import { Node, Edge } from '../../../representation/model/Node'
import { DeltaKind } from './DeltaKind'

export interface BaseDeltaElement {
  kind: DeltaKind
}

export interface DeltaNode extends Node, BaseDeltaElement {
  children: DeltaNode[]
}

export interface DeltaEdge extends Edge, BaseDeltaElement {
}
