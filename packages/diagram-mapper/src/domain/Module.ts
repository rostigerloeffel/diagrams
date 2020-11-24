import DescriptionModule from '../description/Module'
import DomainModel from './DomainModel'

export default {
  __depends__: [DescriptionModule],

  domainModel: ['type', DomainModel]
}
