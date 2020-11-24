import { ElementRegistry, EventBus } from 'diagram-js/lib/core'
import { Modeling } from 'diagram-js/lib/features/modeling'
import { Rules } from 'diagram-js/lib/features/rules'
import DefaultAutoResize from 'diagram-js/lib/features/auto-resize/AutoResize'
import { Configuration } from '../config/Configuration'

export default class AutoResize extends DefaultAutoResize {
  private static $inject = ['representationConfig', 'eventBus', 'elementRegistry', 'modeling', 'rules']

  private _representationConfig: Configuration

  constructor(representationConfig: Configuration, eventBus: EventBus, elementRegistry: ElementRegistry, modeling: Modeling, rules: Rules) {
    super(eventBus, elementRegistry, modeling, rules)

    this._representationConfig = representationConfig
  }

  getOffset() {
    return this._representationConfig.autoResizeOffset
  }

  getPadding() {
    return this._representationConfig.autoResizePadding
  }
}
