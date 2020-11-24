import * as _ from 'lodash'
import { Shape } from 'diagram-js/lib/model'
import { EventBus, Canvas, ElementFactory, ElementRegistry } from 'diagram-js/lib/core'
import DomainModel from '../domain/DomainModel'
import Description from '../description/Description'
import { RepresentationModel } from '../representation/model/RepresentationModel'
import Delta from './delta/Delta'
import { DeltaKind } from './delta/model/DeltaKind'
import { DeltaEdge, DeltaNode } from './delta/model/DeltaNode'
import Layouter from '../layout/Layouter'
import BaseUpdater from './BaseUpdater'
import RepresentationMapper from '../mapper/RepresentationMapper'

export default class DeltaUpdater extends BaseUpdater {
  private static $inject = [
    'eventBus',
    'elementFactory',
    'elementRegistry',
    'canvas',
    'description',
    'domainModel',
    'representationMapper',
    'representationLayouter',
    'delta'
  ]

  private _delta: Delta

  constructor(
    eventBus: EventBus,
    elementFactory: ElementFactory,
    elementRegistry: ElementRegistry,
    canvas: Canvas,
    description: Description,
    domainModel: DomainModel,
    representationMapper: RepresentationMapper,
    representationLayouter: Layouter,
    delta: Delta
  ) {
    super(eventBus, elementFactory, elementRegistry, canvas, description, domainModel, representationMapper, representationLayouter)
    this._delta = delta
  }

  protected handleRepresentationUpdate(
    updatedRepresentationModel: RepresentationModel,
    updateCanvas: boolean
  ): void {
    const differenceRepresentation = this._delta.computeDifferenceRepresentation(
      this.getRepresentationModel(),
      updatedRepresentationModel
    )

    // Update canvas (shapes and connections)
    differenceRepresentation.nodes.forEach(node => this.updateNode(node, updateCanvas))
    differenceRepresentation.edges.forEach(edge => this.updateEdge(edge, updateCanvas))
  }

  protected updateNode(node: DeltaNode, updateCanvas: boolean, parentShape?: Shape) {
    if (node.kind === DeltaKind.Added) {
      // Add node as well as all children nodes
      this.addNode(node, updateCanvas, parentShape)
      // Add all connected port nodes
      node.ports.forEach(port => this.addPort(port, updateCanvas, node))
    } else if (node.kind === DeltaKind.Removed) {
      // Remove node as well as all children nodes
      // TODO: Fix this! Introduce "Moved" delta
      //this.removeNode(node)
      return
    } else {
      // Be careful: the node may have new children which need a valid parent shape,
      // hence retrieve the shape of the node
      const nodeRootShape = this.findCorrespondingShape(node)

      // Furthermore, node got probably repositioned/resized by layouter,
      // hence apply bounds
      if (nodeRootShape) {
        // TODO
        /*
        nodeRootShape.x = node.bounds.x
        nodeRootShape.y = node.bounds.y
        */
        /*
        nodeRootShape.width = node.bounds.width
        nodeRootShape.height = node.bounds.height
        */
        /*
        console.log(node.bounds)
        console.log({ x: nodeRootShape.x, y: nodeRootShape.y, width: nodeRootShape.width, height: nodeRootShape.height })
        */
      }

      // Inspect each child node
      node.children.forEach(childNode => this.updateNode(childNode, updateCanvas, nodeRootShape))
    }
  }

  protected updateEdge(edge: DeltaEdge, updateCanvas: boolean) {
    if (edge.kind === DeltaKind.Added) {
      this.addEdge(edge, updateCanvas)
    }
  }
}
