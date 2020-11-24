import * as _ from 'lodash'
import { Shape, Base, Connection } from 'diagram-js/lib/model'
import { EventBus } from 'diagram-js/lib/core'
import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer'
import NodeRenderer from './NodeRenderer'
import FieldRenderer from './FieldRenderer'
import PortRenderer from './PortRenderer'
import EdgeRenderer from './EdgeRenderer'

export default class Renderer extends BaseRenderer {
  private static $inject = ['eventBus', 'nodeRenderer', 'fieldRenderer', 'portRenderer', 'edgeRenderer']

  private _nodeRenderer: NodeRenderer
  private _fieldRenderer: FieldRenderer
  private _portRenderer: PortRenderer
  private _edgeRenderer: EdgeRenderer

  constructor(
    eventBus: EventBus,
    nodeRenderer: NodeRenderer,
    fieldRenderer: FieldRenderer,
    portRenderer: PortRenderer,
    edgeRenderer: EdgeRenderer
  ) {
    super(eventBus)

    this._nodeRenderer = nodeRenderer
    this._fieldRenderer = fieldRenderer
    this._portRenderer = portRenderer
    this._edgeRenderer = edgeRenderer
  }

  canRender(_element: Base) {
    return true
  }

  drawShape(visuals: any, shape: Shape) {
    switch (shape.type) {
      case 'node':
        return this._nodeRenderer.drawNode(visuals, shape)
      case 'field':
        return this._fieldRenderer.drawField(visuals, shape)
      case 'port':
        return this._portRenderer.drawPort(visuals, shape)
    }
    return visuals
  }

  drawConnection(visuals: any, connection: Connection) {
    switch (connection.type) {
      case 'edge':
        return this._edgeRenderer.drawEdge(visuals, connection)
    }
    return visuals
  }
}
