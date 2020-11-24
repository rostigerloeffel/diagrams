import * as _ from 'lodash'
import BaseRuleProvider from 'diagram-js/lib/features/rules/RuleProvider'
import { EventBus } from 'diagram-js/lib/core'
import { Shape } from 'diagram-js/lib/model'

export default class MoveRuleProvider extends BaseRuleProvider {
  private static $inject = ['eventBus']

  constructor(eventBus: EventBus) {
    super(eventBus)
  }

  init() {
    // Only allow nodes to be moved
    super.addRule('elements.move', (context: any) => {
      const notANode = context.shapes.find((shape: Shape) => shape.type !== 'node')
      if (!_.isNil(notANode)) {
        return false
      } else {
        return undefined
      }
    })
  }
}
