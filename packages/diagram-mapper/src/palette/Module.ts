import PaletteModule from 'diagram-js/lib/features/palette'
import DomainModelModule from '../domain/Module'
import DescriptionModule from '../description/Module'
import NodeDragToolPaletteProvider from './NodeDragToolPaletteProvider'

export default {
  __depends__: [PaletteModule, DomainModelModule, DescriptionModule],
  __init__: ['nodeDragPaletteProvider'],

  nodeDragPaletteProvider: ['type', NodeDragToolPaletteProvider]
}
