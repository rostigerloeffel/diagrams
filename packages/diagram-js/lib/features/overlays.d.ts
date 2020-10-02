declare module 'diagram-js/lib/features/overlays' {
  import { Module } from 'didi'
  import { Padding } from 'diagram-js/lib/core'
  import { Base } from 'diagram-js/lib/model'

  const module: Module
  export default module

  export interface Search {
    id?: string
    element?: string|Base
    type: string
  }

  export interface Overlay {
    html: string|HTMLElement
    show?: {
      minZoom: number
      maxZoom: number
    }
    position: Partial<Padding>
    scale?: boolean|{
      min: number
      max: number
    }
  }

  export interface Overlays {
    get(search: string|Search): object|object[]
    add(element: string|Base, type: string, overlay: Overlay): string
    add(element: string|Base, overlay: Overlay): string
    remove(search: string|Search): void
    show(): void
    hide(): void
    clear(): void
  }
}

declare module 'diagram-js/lib/features/overlays/Overlays' {
  import { Canvas, ElementRegistry, EventBus } from 'diagram-js/lib/core'
  import { Base } from 'diagram-js/lib/model'
  import { Overlays, Search, Overlay } from 'diagram-js/lib/features/overlays'

  export default class implements Overlays {
    constructor(config: object, eventBus: EventBus, canvas: Canvas, elementRegistry: ElementRegistry)

    get(search: string|Search): object|object[]
    add(element: string|Base, type: string, overlay: Overlay): string
    add(element: string|Base, overlay: Overlay): string
    remove(search: string|Search): void
    show(): void
    hide(): void
    clear(): void
  }
}
