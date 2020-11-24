import * as _ from 'lodash'
import { Injector } from 'didi'
import { EventBus, ElementFactory } from 'diagram-js/lib/core'
import { CommandStack, HandlerConstructor } from 'diagram-js/lib/command'
import { HandlerRegistration } from 'diagram-js/lib/features/modeling'
import BaseModeling from 'diagram-js/lib/features/modeling/Modeling'
import CompoundHandlerModeling from './CompoundHandlerModeling'
import CompoundCommandHandler from './CompoundHandler'

export type CompoundHandlerRegistration = {
  [handlerId: string]: HandlerConstructor[]
}

export default class Modeling extends BaseModeling implements CompoundHandlerModeling {
  private static $inject = ['eventBus', 'elementFactory', 'commandStack']

  private _registeredHandlers: CompoundHandlerRegistration

  constructor(eventBus: EventBus, elementFactory: ElementFactory, commandStack: CommandStack) {
    super(eventBus, elementFactory, commandStack)

    this._registeredHandlers = _.mapValues(super.getHandlers(), handler => [handler])
  }

  registerHandler(handlerId: string, handler: HandlerConstructor): void {
    const handlers = this._registeredHandlers[handlerId]
    if (_.isNil(handlers)) {
      this._registeredHandlers[handlerId] = []
    }
    this._registeredHandlers[handlerId].push(handler)
  }

  getHandlers(): HandlerRegistration {
    return _.mapValues(this._registeredHandlers, this.getHandlerConstructor)
  }

  protected getHandlerConstructor(handlers: HandlerConstructor[]): HandlerConstructor {
    class Handler extends CompoundCommandHandler {
      private static $inject = ['injector']

      constructor(injector: Injector) {
        super(injector, handlers)
      }
    }

    return Handler
  }
}
