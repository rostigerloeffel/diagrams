import * as _ from 'lodash'
import { EventBus, Canvas, ElementFactory, ElementRegistry } from 'diagram-js/lib/core'
import Description from '../description/Description'
import { RepresentationModel } from '../representation/model/RepresentationModel'
import DomainModel from '../domain/DomainModel'
import { Point } from '../representation/model/Primitives'
import { Node } from '../representation/model/Node'
import Layouter from '../layout/Layouter'
import BaseUpdater from './BaseUpdater'
import RepresentationMapper from '../mapper/RepresentationMapper'

export default class SimpleUpdater extends BaseUpdater {
  private static $inject = [
    'eventBus',
    'elementFactory',
    'elementRegistry',
    'canvas',
    'description',
    'domainModel',
    'representationMapper',
    'layouter'
  ]

  constructor(
    eventBus: EventBus,
    elementFactory: ElementFactory,
    elementRegistry: ElementRegistry,
    canvas: Canvas,
    description: Description,
    domainModel: DomainModel,
    representationMapper: RepresentationMapper,
    layouter: Layouter
  ) {
    super(eventBus, elementFactory, elementRegistry, canvas, description, domainModel, representationMapper, layouter)
  }

  protected handleRepresentationUpdate(updatedRepresentationModel: RepresentationModel, updateCanvas: boolean): void {
    updatedRepresentationModel.nodes.forEach(node => this.addNode(node, updateCanvas))
  }

  protected findPreviousCoordinatesIfAvailable(_node: Node): Point | undefined {
    return undefined
  }
}
