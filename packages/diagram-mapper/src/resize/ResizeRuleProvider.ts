import BaseRuleProvider from 'diagram-js/lib/features/rules/RuleProvider'
import { EventBus } from 'diagram-js/lib/core'

export default class ResizeRuleProvider extends BaseRuleProvider {
  private static $inject = ['eventBus']

  constructor(eventBus: EventBus) {
    super(eventBus)
  }

  init() {
    // Only allow resizing if explicitly enabled
    super.addRule('shape.resize', (context: any) => {
      return context.shape?.businessObject?.bounds?.resizable === true
    })
  }
}
