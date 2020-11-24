import ConfigModule from '../config/Module'
import RepresentationModule from '../representation/Module'
import Renderer from './Renderer'
import NodeRenderer from './NodeRenderer'
import FieldRenderer from './FieldRenderer'
import PortRenderer from './PortRenderer'
import EdgeRenderer from './EdgeRenderer'

export default {
  __depends__: [ ConfigModule, RepresentationModule ],
  __init__: ['renderer'],

  renderer: ['type', Renderer],
  nodeRenderer: ['type', NodeRenderer],
  fieldRenderer: ['type', FieldRenderer],
  portRenderer: ['type', PortRenderer],
  edgeRenderer: ['type', EdgeRenderer]
}
