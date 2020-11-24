import { EventBus } from 'diagram-js/lib/core'
import DomainModel from '../domain/DomainModel'
import { CommandHandler } from 'diagram-js/lib/command'
import Modeling from './Modeling'

class NodeMoveDomainUpdateHandler implements CommandHandler {
  private static $inject = ['eventBus', 'domainModel']

  private _eventBus: EventBus
  private _domainModel: DomainModel

  constructor(eventBus: EventBus, domainModel: DomainModel) {
    this._eventBus = eventBus
    this._domainModel = domainModel
  }

  postExecute(context: any) {
    if (context.newParent && context.oldParent.id !== context.newParent.id) {
      const node = context.shape.businessObject
      const targetNode = context.newParent.businessObject

      const updatedDomainModel = targetNode.onReceive(node.element, this._domainModel.model)
      this._eventBus.fire('domain-model.changed', { model: updatedDomainModel })
    }
  }
}

export default class NodeMoveDomainUpdateHandlerProvider {
  private static $inject = ['modeling']

  constructor(modeling: Modeling) {
    modeling.registerHandler('shape.move', NodeMoveDomainUpdateHandler)
  }
}
