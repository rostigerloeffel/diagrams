import ConfigModule from '../config/Module'
import CroppingConnectionDocking from 'diagram-js/lib/layout/CroppingConnectionDocking'
import RepresentationModule from '../representation/Module'
import ElkLayouter from './ElkLayouter'
import OnTheFlyLayouter from './OnTheFlyLayouter'

export default {
  __depends__: [ConfigModule, RepresentationModule],
  __init__: ['layouter'],

  representationLayouter: ['type', ElkLayouter],
  layouter: ['type', OnTheFlyLayouter],
  connectionDocking: ['type', CroppingConnectionDocking]
}
