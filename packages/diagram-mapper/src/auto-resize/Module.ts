import AutoResizeModule from 'diagram-js/lib/features/auto-resize'
import ConfigModule from '../config/Module'
import AutoResizeProvider from './AutoResizeProvider'
import AutoResize from './AutoResize'

export default {
  __depends__: [ AutoResizeModule, ConfigModule ],
  __init__: [ 'autoResizeProvider', 'autoResize' ],

  autoResizeProvider: ['type', AutoResizeProvider],
  autoResize: [ 'type', AutoResize ]
}
