import * as _ from 'lodash'
import { Injector } from 'didi'
import { Base } from 'diagram-js/lib/model'
import { CommandHandler, HandlerConstructor } from 'diagram-js/lib/command'

/**
 * Encapsulates several independent commands and can be registered as
 * a single command.
 */
export default class CompoundCommandHandler implements CommandHandler {
  private _handlers: CommandHandler[]

  constructor(injector: Injector, handlerConstructors: HandlerConstructor[]) {
    this._handlers = handlerConstructors.map(injector.instantiate)
  }

  canExecute?(context: object): boolean {
    return (
      this._handlers.find(handler => _.isFunction(handler.canExecute) && !handler.canExecute(context)) === undefined
    )
  }

  preExecute?(context: object): void {
    this._handlers.forEach(handler => _.isFunction(handler.preExecute) && handler.preExecute(context))
  }

  execute?(context: object): Base[] {
    return this._handlers.reduce(
      (changedElements, handler) => [
        ...changedElements,
        ...(_.isFunction(handler.execute) ? this.asArray(handler.execute(context)) : [])
      ],
      [] as Base[]
    )
  }

  postExecute?(context: object): void {
    this._handlers.forEach(handler => !_.isNil(handler.postExecute) && handler.postExecute(context))
  }

  revert?(context: object): Base[] {
    return this._handlers.reduce(
      (changedElements, handler) => [
        ...changedElements,
        ...(_.isFunction(handler.revert) ? this.asArray(handler.revert(context)) : [])
      ],
      [] as Base[]
    )
  }

  // Be careful: diagram-js specifies the return type of execute/revert must be Array<Base>
  // (https://github.com/bpmn-io/diagram-js/blob/develop/lib/command/CommandHandler.js),
  // nevertheless it sometimes returns just Base
  // (https://github.com/bpmn-io/diagram-js/blob/develop/lib/features/modeling/cmd/ResizeShapeHandler.js#L69),
  // hence we have to handle it correctly.
  private asArray(elements: Base | Base[]) {
    if (_.isArray(elements)) {
      return elements
    } else {
      return [elements]
    }
  }
}
