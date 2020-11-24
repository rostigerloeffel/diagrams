import DescriptionModelModule from '../description/Module'
import DomainModelModule from '../domain/Module'
import RepresentationModule from '../representation/Module'
import MapperModule from '../mapper/Module'
import Delta from './delta/Delta'
import DeltaUpdater from './DeltaUpdater'

export default {
  __depends__: [DescriptionModelModule, DomainModelModule, RepresentationModule, MapperModule],

  delta: ['type', Delta],
  updater: ['type', DeltaUpdater],

  // This service is optional and can be overridden
  representationLayouter: ['value', undefined]
}
