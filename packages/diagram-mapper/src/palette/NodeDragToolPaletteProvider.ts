import * as _ from 'lodash'
import { EventBus } from 'diagram-js/lib/core'
import Create from 'diagram-js/lib/features/create/Create'
import Palette, { PaletteProvider } from 'diagram-js/lib/features/palette/Palette'
import Description from '../description/Description'
import { NodeDescription } from '../description/model/NodeDescription'
import { NodeModelToolDescription, ToolDescription } from '../description/model/ToolDescription'
import ElementFactory from '../representation/ElementFactory'
import DomainModel from '../domain/DomainModel'
import NodeMapper from '../mapper/NodeMapper'

export default class NodeDragToolPaletteProvider implements PaletteProvider {
  private static $inject = [
    'eventBus',
    'palette',
    'create',
    'elementFactory',
    'domainModel',
    'description',
    'nodeMapper'
  ]

  private _create: Create
  private _elementFactory: ElementFactory
  private _domainModel: DomainModel
  private _description: Description
  private _nodeMapper: NodeMapper

  constructor(
    eventBus: EventBus,
    palette: Palette,
    create: Create,
    elementFactory: ElementFactory,
    domainModel: DomainModel,
    description: Description,
    nodeMapper: NodeMapper
  ) {
    this._create = create
    this._elementFactory = elementFactory
    this._domainModel = domainModel
    this._description = description
    this._nodeMapper = nodeMapper

    eventBus.on('description.changed', () => palette.registerProvider(this))
  }

  getPaletteEntries() {
    const palette = this._description.getDescription()?.palette || []
    return _(palette)
      .filter(_.isObject)
      .filter(entry => (entry as ToolDescription).type === 'node')
      .map(entry => this.mapToolDescription(entry as NodeModelToolDescription))
      .keyBy('key')
      .value()
  }

  mapToolDescription(tool: NodeModelToolDescription) {
    return {
      key: tool.key,
      group: 'create',
      className: tool.appearance?.className || 'palette-icon-create-shape',
      title: tool.appearance?.description || 'create',

      action: {
        dragstart: (event: any) => {
          // Create dummy node description
          const nodeDescription = {
            element: tool.element,
            template: tool.template
          }

          // Map description to nodes
          const shapes = _(this._nodeMapper.createNodes(nodeDescription as NodeDescription, this._domainModel.model))
            .map(node =>
              this._elementFactory.createNode({
                ...node,
                key: _.uniqueId('node_drag_'),
                moveableTo: tool.moveableTo
              })
            )
            .flatten()
            .value()

          this._create.start(event, shapes)
        }
      }
    }
  }
}
