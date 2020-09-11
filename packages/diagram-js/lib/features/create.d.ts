// TODO: Replace any by types

declare module 'diagram-js/lib/features/create' {
  import { Injector, Module } from 'didi'

  const module: Module
  export default module
}

declare module 'diagram-js/lib/features/create/Create' {
  import { Canvas, EventBus } from 'diagram-js/lib/core'
  import { Modeling } from 'diagram-js/lib/features/modeling'

  export interface Create {
    start(event: string | object, elements: Base | Base[], context: object)
    start(event: string | object, elements: Base | Base[])
  }

  export default class DefaultCreate {
    constructor(canvas: Canvas, dragging: any, eventBus: EventBus, modeling: Modeling, rules: any)

    start(event: string | object, elements: Base | Base[], context: object)
    start(event: string | object, elements: Base | Base[])

    protected canCreate(elements: Base[], target: Base, position: Point, source: Base, hints: boolean | null | object)
    protected setMarker(element: Base | string, marker: string)
    protected cancel()
  }
}

declare module 'diagram-js/lib/features/create/CreatePreview' {
  import { Canvas, EventBus } from 'diagram-js/lib/core'

  export interface CreatePreview {
    createDragGroup(elements: Base[])
  }

  export default class DefaultCreatePreview implements CreatePreview {
    constructor(canvas: Canvas, eventBus: EventBus, graphicsFactory: any, previewSupport: any, styles: any)

    createDragGroup(elements: Base[])
  }
}

declare module 'diagram-js/lib/features/create/CreateConnectPreview' {
  import { Injector } from 'didi'
  import { EventBus } from 'diagram-js/lib/core'
  
  export default class DefaultCreateConnectPreview implements CreateConnectPreview {
    constructor(injector: Injector, eventBus: EventBus)
  }
}