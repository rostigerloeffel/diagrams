import ConfigModule from '../config/Module'
import RepresentationModule from '../representation/Module'
import DescriptionModule from '../description/Module'
import NodeMapper from './NodeMapper'
import FieldMapper from './FieldMapper'
import PortMapper from './PortMapper'
import EdgeMapper from './EdgeMapper'
import RepresentationMapper from './RepresentationMapper'

export default {
  __depends__: [ ConfigModule, RepresentationModule, DescriptionModule ],

  representationMapper: ['type', RepresentationMapper],
  nodeMapper: ['type', NodeMapper],
  fieldMapper: ['type', FieldMapper],
  portMapper: ['type', PortMapper],
  edgeMapper: ['type', EdgeMapper]
}
