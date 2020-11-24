import { HandlerConstructor } from 'diagram-js/lib/command'

export default interface CompoundHandlerModeling {
  registerHandler(handlerId: string, handler: HandlerConstructor): void
}
