import ModelingModule from 'diagram-js/lib/features/modeling'
import Modeling from '../modeling/Modeling'
import NodeMoveDomainUpdateHandlerProvider from './NodeMoveDomainUpdateHandler'
import ResizeShapeHandlerProvider from '../resize/ResizeShapeHandler'

export default {
  __depends__: [ ModelingModule ],
  __init__: ['modeling', 'nodeMoveDomainUpdateHandlerProvider', 'resizeShapeHandlerProvider'],

  modeling: ['type', Modeling],
  nodeMoveDomainUpdateHandlerProvider: ['type', NodeMoveDomainUpdateHandlerProvider],
  resizeShapeHandlerProvider: ['type', ResizeShapeHandlerProvider]
}
