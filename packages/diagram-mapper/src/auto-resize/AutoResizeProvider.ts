import DefaultAutoResizeProvider from 'diagram-js/lib/features/auto-resize/AutoResizeProvider'
import { Base, Shape } from 'diagram-js/lib/model'

export default class AutoResizeProvider extends DefaultAutoResizeProvider {
  canResize(elements: Base[], target: Shape) {
    for (let element of elements) {
      if (element.businessObject?.moveableTo?.includes(target.id) === false) {
        return false
      }
    }

    return true
  }
}
