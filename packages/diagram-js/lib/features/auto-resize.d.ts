declare module 'diagram-js/lib/features/auto-resize' {
  import { Module } from 'didi'
  import { Shape } from 'diagram-js/lib/model'
  import { Bounds, Padding } from 'diagram-js/lib/core'
  import { CommandInterceptor } from 'diagram-js/lib/command'
  import { RuleProvider } from 'diagram-js/lib/features/rules'

  const module: Module
  export default module

  export interface AutoResizeHints {
    autoResize?: string
    // TODO: Check layout hint in https://github.com/bpmn-io/diagram-js/blob/b1e3c54db6ffb87df5bac09e3560af5d4b4e3125/lib/features/modeling/cmd/ResizeShapeHandler.js#L79
    [attrs: string]: any
  }

  export interface AutoResize extends CommandInterceptor {
    getOffset(shape: Shape): Padding
    getPadding(shape: Shape): Padding
    resize(shape: Shape, newBounds: Bounds, hints: AutoResizeHints): void
  }

  export interface AutoResizeProvider extends RuleProvider {
    canResize(elements: Shape[], target: Shape): boolean
  }
}

declare module 'diagram-js/lib/features/auto-resize/AutoResize' {
  import { Shape } from 'diagram-js/lib/model'
  import { Bounds, Padding, EventBus, ElementRegistry } from 'diagram-js/lib/core'
  import { Modeling } from 'diagram-js/lib/features/modeling'
  import { Rules } from 'diagram-js/lib/features/rules'
  import BaseCommandInterceptor from 'diagram-js/lib/command/CommandInterceptor'
  import { AutoResize, AutoResizeHints } from 'diagram-js/lib/features/auto-resize'

  export default class extends BaseCommandInterceptor implements AutoResize {
    constructor(eventBus: EventBus, elementRegistry: ElementRegistry, modeling: Modeling, rules: Rules)

    getOffset(shape: Shape): Padding
    getPadding(shape: Shape): Padding
    resize(shape: Shape, newBounds: Bounds, hints: AutoResizeHints): void
  }
}

declare module 'diagram-js/lib/features/auto-resize/AutoResizeProvider' {
  import { Shape } from 'diagram-js/lib/model'
  import { EventBus } from 'diagram-js/lib/core'
  import BaseRuleProvider from 'diagram-js/lib/features/rules/RuleProvider'
  import { AutoResizeProvider } from 'diagram-js/lib/features/auto-resize'

  export default class extends BaseRuleProvider implements AutoResizeProvider {
    constructor(eventBus: EventBus)

    canResize(elements: Shape[], target: Shape): boolean
  }
}
