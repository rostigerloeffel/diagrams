import { ElementRegistry } from 'diagram-js/lib/core'
import DefaultElementFactory from 'diagram-js/lib/core/ElementFactory'
import { Base } from 'diagram-js/lib/model'

export default class ElementFactory extends DefaultElementFactory {
  private static $inject = ['elementRegistry']

  private _elementRegistry: ElementRegistry

  constructor(elementRegistry: ElementRegistry) {
    super()
    this._elementRegistry = elementRegistry
  }

  create(type: string, attrs: any = {}): Base | Base[] {
    switch (type) {
      case 'node':
        return this.createNode(attrs)
      case 'field':
        return this.createField(attrs)
      case 'port':
        return this.createPort(attrs)
      case 'edge':
        return this.createEdge(attrs)
      default:
        return super.create(type, attrs)
    }
  }

  createNode(attrs: any = {}) {
    return super.create('shape', { type: 'node', id: attrs.key, ...attrs.bounds, businessObject: attrs })
  }

  createField(attrs: any = {}) {
    return super.create('shape', { type: 'field', id: attrs.key, ...attrs.bounds, businessObject: attrs })
  }

  createPort(attrs: any = {}) {
    return super.create('shape', { type: 'port', id: attrs.key, ...attrs.bounds, businessObject: attrs })
  }

  createEdge(attrs: any = {}) {
    const source = this._elementRegistry.get(attrs.source)
    const target = this._elementRegistry.get(attrs.target)

    return super.create('connection', {
      type: 'edge',
      id: attrs.key,
      source,
      target,
      waypoints: attrs.waypoints,
      businessObject: attrs
    })
  }
}
