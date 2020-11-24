import ResizeModule from 'diagram-js/lib/features/resize'
import ModelingModule from '../modeling/Module'
import Resize from '../resize/Resize'
import ResizeRuleProvider from './ResizeRuleProvider'
import ResizeShapeHandlerProvider from './ResizeShapeHandler'

export default {
  __depends__: [ ResizeModule, ModelingModule ],
  __init__: ['resizeRuleProvider'],

  resize: ['type', Resize],
  resizeRuleProvider: ['type', ResizeRuleProvider],
  resizeShapeHandlerProvider: ['type', ResizeShapeHandlerProvider]
}
