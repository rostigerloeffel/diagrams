import * as _ from 'lodash'
import { Edge, Node } from '../../representation/model/Node'
import { RepresentationModel } from '../../representation/model/RepresentationModel'
import { DeltaKind } from './model/DeltaKind'
import { DeltaModel } from './model/DeltaModel'
import { DeltaEdge, DeltaNode } from './model/DeltaNode'

export default class Delta {
  computeDifferenceRepresentation(oldRepresentation: RepresentationModel, newRepresentation: RepresentationModel): DeltaModel {
    return {
      nodes: this.computeDeltaNodes(oldRepresentation.nodes, newRepresentation.nodes),
      edges: this.computeDeltaEdges(oldRepresentation.edges, newRepresentation.edges)
    }
  }

  protected computeDeltaNodes(oldNodes: Node[], newNodes: Node[]): DeltaNode[] {
    const oldNodeKeys = oldNodes.map(node => node.key)
    const newNodeKeys = newNodes.map(node => node.key)

    return [
      // Mark newly added nodes, skip children
      ...newNodes
        .filter(node => !oldNodeKeys.includes(node.key))
        .map(node => ({
          ...node,
          kind: DeltaKind.Added
        })),
      // Mark removed nodes, skip children
      ...oldNodes
        .filter(node => !newNodeKeys.includes(node.key))
        .map(node => ({
          ...node,
          kind: DeltaKind.Removed
        })),
      // Mark remaining nodes and check children recursively
      ...oldNodes
        .filter(node => newNodeKeys.includes(node.key))
        .map(node => ({
          ...node,
          kind: DeltaKind.None,
          children: this.computeDeltaNodes(
            node.children,
            newNodes.find(newNode => newNode.key === node.key)?.children || []
          )
        }))
    ] as DeltaNode[]
  }

  protected computeDeltaEdges(oldEges: Edge[], newEdges: Edge[]): DeltaEdge[] {
    const oldEdgeKeys = oldEges.map(edge => edge.key)
    const newEdgeKeys = newEdges.map(edge => edge.key)

    return [
      // Mark newly added nodes, skip children
      ...newEdges
        .filter(edge => !oldEdgeKeys.includes(edge.key))
        .map(edge => ({
          ...edge,
          kind: DeltaKind.Added
        })),
      // Mark removed nodes, skip children
      ...oldEges
        .filter(edge => !newEdgeKeys.includes(edge.key))
        .map(edge => ({
          ...edge,
          kind: DeltaKind.Removed
        })),
      // Mark remaining nodes and check children recursively
      ...oldEges
        .filter(edge => newEdgeKeys.includes(edge.key))
        .map(edge => ({
          ...edge,
          kind: DeltaKind.None
        }))
    ] as DeltaEdge[]
  }
}
