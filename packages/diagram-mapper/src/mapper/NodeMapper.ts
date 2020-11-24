import * as _ from 'lodash'
import { Configuration } from '../config/Configuration'
import DomainModel from '../domain/DomainModel'
import { ImageReference } from '../representation/model/Primitives'
import { NodeBounds } from '../representation/model/Bounds'
import { NodeAppearance } from '../representation/model/Appearance'
import { Node } from '../representation/model/Node'
import { DescriptionModel } from '../description/model/DescriptionModel'
import Description from '../description/Description'
import {
  BaseNodeDescription,
  NodeAppearanceHint,
  NodeDimensionHint,
  NodeDescription
} from '../description/model/NodeDescription'
import FieldMapper from './FieldMapper'
import PortMapper from './PortMapper'

export default class NodeMapper {
  private static $inject = ['representationConfig', 'description', 'domainModel', 'fieldMapper', 'portMapper']

  private _config: Configuration
  private _description: Description
  private _domainModel: DomainModel
  private _fieldMapper: FieldMapper
  private _portMapper: PortMapper

  constructor(
    representationConfig: Configuration,
    description: Description,
    domainModel: DomainModel,
    fieldMapper: FieldMapper,
    portMapper: PortMapper
  ) {
    this._config = representationConfig
    this._description = description
    this._domainModel = domainModel
    this._fieldMapper = fieldMapper
    this._portMapper = portMapper
  }

  mapNodes(element: any, description: DescriptionModel): Node[] {
    return _(description.nodes || [])
      .map(nodeDescription => this.createNodes(nodeDescription, element))
      .flatMap()
      .value()
  }

  createNodes(nodeDescription: NodeDescription, parentElement: any, parentKey?: string): Node[] {
    return this._domainModel.queryArray(nodeDescription.element, parentElement).map((nodeElement, index) => {
      const localKey = this._domainModel.query(nodeDescription.key, nodeElement)
      const key = _([parentKey, localKey]).compact().join('.')

      // Template is optional, hence it can be undefined
      const template = this.resolveTemplateDescription(nodeDescription)

      // Map node fields
      const fields = [
        ...this._fieldMapper.mapFields(key, nodeDescription, nodeElement),
        ...(_.isNil(template) ? [] : this._fieldMapper.mapFields(key, template, nodeElement))
      ]

      // Compute node bounds
      const bounds = this.createBounds(
        // Respect configured fields to ensure minimal height
        fields.length,
        // Use configured bounds as hint
        this._domainModel.query(nodeDescription.size, nodeElement),
        // Use template bounds as hint as well
        _.isNil(template) ? undefined : this._domainModel.query(template.size, nodeElement)
      )

      // Map node ports
      const ports = [
        ...this._portMapper.mapPorts(key, nodeDescription, nodeElement, bounds)
      ]

      return {
        element: nodeElement,
        key,

        fields,
        ports,

        // Recursively map children nodes
        children: _(nodeDescription.children)
          .map(childDescription => this.createNodes(childDescription, nodeElement, key))
          .flatMap()
          .value(),

        // Slightly move bounds of every node to keep them distinguishable
        bounds: this.shiftBounds(bounds, index),

        appearance: this.createAppearance(
          // Use configured appearance as hint
          this._domainModel.query(nodeDescription.appearance, nodeElement),
          // Use template bounds as hint as well
          _.isNil(template) ? undefined : this._domainModel.query(template.appearance, nodeElement)
        ),

        // Map behaviors
        moveableTo: [
          ...(this._domainModel.query(nodeDescription.moveableTo, nodeElement) || []),
          ...((_.isNil(template) ? [] : this._domainModel.query(template.moveableTo, nodeElement)) || [])
        ],
        onReceive: nodeDescription.onReceive || _.noop
      }
    })
  }

  protected resolveTemplateDescription(nodeDescription: NodeDescription): BaseNodeDescription | undefined {
    if (nodeDescription.template) {
      return this._description.resolveNodeTemplate(nodeDescription.template)
    }
  }

  protected createBounds(fieldCount: number, hint?: NodeDimensionHint, templateHint?: NodeDimensionHint): NodeBounds {
    // TODO: Consider ports in required minimal width/height
    const requiredHeight = this._config.fieldHeight * fieldCount
    return {
      x: this._config.nodeBounds.x,
      y: this._config.nodeBounds.y,
      width: hint?.width || templateHint?.width || this._config.nodeBounds.width,
      height: Math.max(hint?.height || templateHint?.height || this._config.nodeBounds.height, requiredHeight),

      // Special node bounds attributes
      resizable:
        (!_.isNil(hint?.resizable) && hint?.resizable) ||
        (!_.isNil(templateHint?.resizable) && templateHint?.resizable) ||
        false,
      scrollable:
        (!_.isNil(hint?.scrollable) && hint?.scrollable) ||
        (!_.isNil(templateHint?.scrollable) && templateHint?.scrollable) ||
        false
    }
  }

  protected shiftBounds(bounds: NodeBounds, index: number): NodeBounds {
    return {
      ...bounds,
      x: bounds.x! + index * this._config.nodeOffset.x,
      y: bounds.y! + index * this._config.nodeOffset.y
    }
  }

  protected createAppearance(hint?: NodeAppearanceHint, templateHint?: NodeAppearanceHint): NodeAppearance {
    return _.defaultsDeep({}, hint, templateHint, this._config.node.appearance)
  }

  protected createBackground(hint?: ImageReference): ImageReference | undefined {
    if (!hint || !hint.url) {
      return undefined
    }

    return {
      url: hint.url,
      scale: hint.scale ? hint.scale : this._config.backgroundScale
    }
  }
}
