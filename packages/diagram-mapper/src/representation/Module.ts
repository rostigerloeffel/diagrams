import ConfigModule from '../config/Module'
import ElementFactory from './ElementFactory'
import MoveRuleProvider from './rules/MoveRuleProvider'
import HierarchyRuleProvider from './rules/HierarchyRuleProvider'
import Modeling from '../modeling/Modeling'

export default {
  __depends__: [ ConfigModule ],
  __init__: ['moveRuleProvider', 'hierarchyRuleProvider', 'modeling'],

  elementFactory: ['type', ElementFactory],
  moveRuleProvider: ['type', MoveRuleProvider],
  hierarchyRuleProvider: ['type', HierarchyRuleProvider],
  modeling: ['type', Modeling],
}
