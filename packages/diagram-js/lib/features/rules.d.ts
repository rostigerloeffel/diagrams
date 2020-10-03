declare module 'diagram-js/lib/features/rules' {
  import { Module } from 'didi'
  import { CommandInterceptor } from 'diagram-js/lib/command'

  const module: Module
  export default module

  export type Callback = (context: object) => boolean | null | undefined

  export interface Rules {
    allowed(action: string, context: object): boolean | null
  }

  export interface RuleProvider extends CommandInterceptor {
    addRule(action: string | string[], priority: number, fn: Callback): void
    addRule(action: string | string[], fn: Callback): void

    init(): void
  }
}

declare module 'diagram-js/lib/features/rules/Rules' {
  import { Injector } from 'didi'
  import Rules from 'diagram-js/lib/features/rules/Rules'

  export default class implements Rules {
    constructor(injector: Injector)

    allowed(action: string, context: object): boolean | null
  }
}

declare module 'diagram-js/lib/features/rules/RuleProvider' {
  import { EventBus } from 'diagram-js/lib/core'
  import BaseCommandInterceptor from 'diagram-js/lib/command/CommandInterceptor'
  import { RuleProvider, Callback } from 'diagram-js/lib/features/rules'

  export default abstract class BaseRuleProvider extends BaseCommandInterceptor implements RuleProvider {
    constructor(eventBus: EventBus)

    addRule(action: string | string[], priority: number, fn: Callback): void
    addRule(action: string | string[], fn: Callback): void

    init(): void
  }
}
