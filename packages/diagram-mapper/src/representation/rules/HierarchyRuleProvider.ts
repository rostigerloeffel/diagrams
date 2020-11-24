import * as _ from 'lodash'
import BaseRuleProvider from 'diagram-js/lib/features/rules/RuleProvider'
import { EventBus } from 'diagram-js/lib/core'
import { Shape } from 'diagram-js/lib/model'

export default class HierarchyRuleProvider extends BaseRuleProvider {
  private static $inject = ['eventBus']

  constructor(eventBus: EventBus) {
    super(eventBus)
  }

  init() {
    super.addRule('shape.create', 2000, (context: any) => {
      const { shape, target } = context

      if (_.isNil(target)) {
        return true
      }

      return this.isMovableTo(shape.businessObject, target.id)
    })

    super.addRule('elements.move', (context: any) => {
      const { shapes, target } = context

      if (_.isNil(target) || _.isNil(shapes)) {
        return undefined
      }

      // Try to find a shape which is NOT moveable
      const unmoveableShape = shapes.find((shape: Shape) => {
        return (
          // Shape should be moved out of the current container
          shape.parent &&
          shape.parent.id !== target.id &&
          // ...and the target is not declared as a valid move destination
          !this.isMovableTo(shape.businessObject, target.id)
        )
      })

      // The movement is allowed if we haven't found any unmoveable shape
      if (!_.isNil(unmoveableShape)) {
        return false
      } else {
        return undefined
      }
    })
  }

  isMovableTo(businessObject: any, targetId: string) {
    return _.isNil(businessObject.moveableTo) || _.get(businessObject, 'moveableTo', []).includes(targetId)
  }
}
