declare module 'diagram-js/lib/command' {
  import { Module } from 'didi'

  const module: Module
  export default module

  export interface CommandHandler {
    canExecute?(context: object): boolean
    preExecute?(context: object): void
    execute?(context: object): void
    postExecute?(context: object): void
    revert?(context: object): void
  }

  export type HandlerConstructor = (...params: any) => void

  export interface CommandStack {
    canExecute(command: string, context: object): boolean
    execute(command: string, context: object): void
    undo(): void
    canUndo(): boolean
    redo(): void
    canRedo(): void
    clear(emit: boolean): void
    register(command: string, handler: CommandHandler): void
    registerHandler(command: string, handler: HandlerConstructor): void
  }
}

declare module 'diagram-js/lib/command/CommandInterceptor' {
  import { EventBus } from 'diagram-js/lib/core'

  export type InterceptorHandler = (event: any) => void

  export default abstract class BaseCommandInterceptor {
    constructor(eventBus: EventBus)

    canExecute(
      events: string | string[],
      priority: number,
      handlerFn: InterceptorHandler,
      unwrap: boolean,
      that: object
    ): boolean
    canExecute(events: string | string[], handlerFn: InterceptorHandler, unwrap: boolean): boolean
    canExecute(events: string | string[], handlerFn: InterceptorHandler): boolean

    preExecute(
      events: string | string[],
      priority: number,
      handlerFn: InterceptorHandler,
      unwrap: boolean,
      that: object
    ): void
    preExecute(events: string | string[], handlerFn: InterceptorHandler, unwrap: boolean): void
    preExecute(events: string | string[], handlerFn: InterceptorHandler): void

    preExecuted(
      events: string | string[],
      priority: number,
      handlerFn: InterceptorHandler,
      unwrap: boolean,
      that: object
    ): void
    preExecuted(events: string | string[], handlerFn: InterceptorHandler, unwrap: boolean): void
    preExecuted(events: string | string[], handlerFn: InterceptorHandler): void

    execute(
      events: string | string[],
      priority: number,
      handlerFn: InterceptorHandler,
      unwrap: boolean,
      that: object
    ): void
    execute(events: string | string[], handlerFn: InterceptorHandler, unwrap: boolean): void
    execute(events: string | string[], handlerFn: InterceptorHandler): void

    executed(
      events: string | string[],
      priority: number,
      handlerFn: InterceptorHandler,
      unwrap: boolean,
      that: object
    ): void
    executed(events: string | string[], handlerFn: InterceptorHandler, unwrap: boolean): void
    executed(events: string | string[], handlerFn: InterceptorHandler): void

    postExecute(
      events: string | string[],
      priority: number,
      handlerFn: InterceptorHandler,
      unwrap: boolean,
      that: object
    ): void
    postExecute(events: string | string[], handlerFn: InterceptorHandler, unwrap: boolean): void
    postExecute(events: string | string[], handlerFn: InterceptorHandler): void

    postExecuted(
      events: string | string[],
      priority: number,
      handlerFn: InterceptorHandler,
      unwrap: boolean,
      that: object
    ): void
    postExecuted(events: string | string[], handlerFn: InterceptorHandler, unwrap: boolean): void
    postExecuted(events: string | string[], handlerFn: InterceptorHandler): void

    revert(
      events: string | string[],
      priority: number,
      handlerFn: InterceptorHandler,
      unwrap: boolean,
      that: object
    ): void
    revert(events: string | string[], handlerFn: InterceptorHandler, unwrap: boolean): void
    revert(events: string | string[], handlerFn: InterceptorHandler): void

    reverted(
      events: string | string[],
      priority: number,
      handlerFn: InterceptorHandler,
      unwrap: boolean,
      that: object
    ): void
    reverted(events: string | string[], handlerFn: InterceptorHandler, unwrap: boolean): void
    reverted(events: string | string[], handlerFn: InterceptorHandler): void
  }
}
