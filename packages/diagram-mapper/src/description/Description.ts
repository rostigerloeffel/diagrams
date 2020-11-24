import * as _ from 'lodash'
import { EventBus } from 'diagram-js/lib/core'
import { DescriptionModel } from './model/DescriptionModel'
import { NodeDescriptionTemplate } from './model/NodeDescription'

/**
 * Description service which can be used to load a description model and query
 * different aspects.
 */
export default class Description {
  private static $inject = ['eventBus']

  private _eventBus: EventBus
  private _representationDescription?: DescriptionModel

  constructor(eventBus: EventBus) {
    this._eventBus = eventBus
  }

  describe(description: DescriptionModel) {
    this._representationDescription = description
    this._eventBus.fire('description.changed', description)
  }

  getDescription() {
    return this._representationDescription
  }

  resolveNodeTemplate(templateKey: string): Partial<NodeDescriptionTemplate> {
    const result = this._representationDescription?.nodeTemplates?.find(template => template.key === templateKey)
    const template = _.isNil(result) || _.isNil(result.template) ? {} : this.resolveNodeTemplate(result.template)

    const fields = _.unionBy([], result?.fields || [], template?.fields || [], 'key')

    return {
      ...template,
      ...result,
      fields
    }
  }
}
