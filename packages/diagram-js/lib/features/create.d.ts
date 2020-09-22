// TODO: Replace any by types

declare module 'diagram-js/lib/features/create' {
  import { Injector, Module } from 'didi'

  const module: Module
  export default module
}

declare module 'diagram-js/lib/features/create/Create' {
  import { Base } from 'diagram-js/lib/model'
  import { Canvas, EventBus, Point } from 'diagram-js/lib/core'
  import { Modeling } from 'diagram-js/lib/features/modeling'

  export interface Create {
    start(event: string | object, elements: Base | Base[], context: object): void
    start(event: string | object, elements: Base | Base[]): void
  }

  export default class DefaultCreate {
    constructor(canvas: Canvas, dragging: any, eventBus: EventBus, modeling: Modeling, rules: any)

    start(event: string | object, elements: Base | Base[], context: object): void
    start(event: string | object, elements: Base | Base[]): void

    protected canCreate(elements: Base[], target: Base, position: Point, source: Base, hints: boolean | null | object): void
    protected setMarker(element: Base | string, marker: string): void
    protected cancel(): void
  }
}

declare module 'diagram-js/lib/features/create/CreatePreview' {
  import { Base } from 'diagram-js/lib/model'
  import { Canvas, EventBus } from 'diagram-js/lib/core'

  export interface CreatePreview {
    createDragGroup(elements: Base[]): void
  }

  export default class DefaultCreatePreview implements CreatePreview {
    constructor(canvas: Canvas, eventBus: EventBus, graphicsFactory: any, previewSupport: any, styles: any)

    createDragGroup(elements: Base[]): void
  }
}

declare module 'diagram-js/lib/features/create/CreateConnectPreview' {
  import { Injector } from 'didi'
  import { EventBus } from 'diagram-js/lib/core'

  export default class DefaultCreateConnectPreview {
    constructor(injector: Injector, eventBus: EventBus)
  }
}
