declare module 'diagram-js/lib/features/rules' {
  import { Module } from 'didi'

  const module: Module
  export default module

  export type Callback = (context: object) => boolean | null

  export interface RuleProvider {
    addRule(action: string | string[], priority: number, fn: Callback): void
    init(): void
  }
}

declare module 'diagram-js/lib/features/rules/RuleProvider' {
  import { EventBus } from 'diagram-js/lib/core'
  import { RuleProvider, Callback } from 'diagram-js/lib/features/rules'

  export default abstract class BaseRuleProvider implements RuleProvider {
    constructor(eventBus: EventBus)

    addRule(action: string | string[], priority: number, fn: Callback): void
    abstract init(): void
  }
}
