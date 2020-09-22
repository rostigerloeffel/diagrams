declare module 'diagram-js/lib/features/palette' {
  import { Module } from 'didi'

  const module: Module
  export default module
}

declare module 'diagram-js/lib/features/palette/Palette' {
  import { Canvas, EventBus } from 'diagram-js/lib/core'

  export interface PaletteProvider {
    getPaletteEntries(): object
  }

  export default class Palette {
    constructor(eventBus: EventBus, canvas: Canvas)
    registerProvider(priority: number, provider: PaletteProvider): void
    registerProvider(provider: PaletteProvider): void
  }
}
