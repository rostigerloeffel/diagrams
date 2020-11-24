import * as _ from 'lodash'
import { Configuration } from '../config/Configuration'
import DomainModel from '../domain/DomainModel'
import { Edge } from '../representation/model/Node'
import { DescriptionModel } from '../description/model/DescriptionModel'
import Description from '../description/Description'
import { EdgeDescription } from '../description/model/NodeDescription'

export default class EdgeMapper {
  private static $inject = ['representationConfig', 'description', 'domainModel']

  private _config: Configuration
  private _description: Description
  private _domainModel: DomainModel

  constructor(representationConfig: Configuration, description: Description, domainModel: DomainModel) {
    this._config = representationConfig
    this._description = description
    this._domainModel = domainModel
  }

  mapEdges(element: any, description: DescriptionModel): Edge[] {
    return _(description.edges || [])
      .map(edgeDescription => this.createEdges(edgeDescription, element))
      .flatMap()
      .value()
  }

  createEdges(edgeDescription: EdgeDescription, parentElement: any): Edge[] {
    return this._domainModel.queryArray(edgeDescription.element, parentElement).map(edgeElement => ({
      element: edgeElement,
      key: this._domainModel.query(edgeDescription.key, edgeElement),

      source: this._domainModel.query(edgeDescription.source, edgeElement),
      target: this._domainModel.query(edgeDescription.target, edgeElement),

      // Waypoints are computed by layouter
      waypoints: [],

      // TODO: Remove bounds from BaseElement
      bounds: { x: 0, y: 0, width: 0, height: 0 }
    }))
  }
}
