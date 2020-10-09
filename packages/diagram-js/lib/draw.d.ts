declare module 'diagram-js/lib/draw' {
  import { Module } from 'didi'
  import { Base, Connection, Shape } from 'diagram-js/lib/model'

  const module: Module
  export default module

  export interface Renderer {
    canRender(element: Base): boolean
    drawShape(visuals: SVGElement, shape: Shape): SVGElement
    drawConnection(visuals: SVGElement, connection: Connection): SVGElement
    getShapePath(shape: Shape): string
    getConnectionPath(connection: Connection): string
  }

  export interface Styles {
    cls(className: string, traits: string[], additionalAttrs: object): object
    cls(className: string, additionalAttrs: object): object
    style(traits: string[], additionalAttrs: object): object
    style(additionalAttrs: object): object
    computeStyle(custom: object, traits: string[], defaultStyles: object): object
    computeStyle(custom: object, defaultStyles: object): object
    computeStyle(traits: string[], defaultStyles: object): object
    computeStyle(defaultStyles: object): object
  }
}

declare module 'diagram-js/lib/draw/BaseRenderer' {
  import { EventBus } from 'diagram-js/lib/core'
  import { Base, Connection, Shape } from 'diagram-js/lib/model'
  import { Renderer } from 'diagram-js/lib/draw'

  export default abstract class implements Renderer {
    constructor(eventBus: EventBus, renderPriority?: number)
    canRender(element: Base): boolean
    drawShape(visuals: SVGElement, shape: Shape): SVGElement
    drawConnection(visuals: SVGElement, connection: Connection): SVGElement
    getShapePath(shape: Shape): string
    getConnectionPath(connection: Connection): string
  }
}

declare module 'diagram-js/lib/draw/DefaultRenderer' {
  import { EventBus } from 'diagram-js/lib/core'
  import { Base, Connection, Shape } from 'diagram-js/lib/model'
  import { Styles } from 'diagram-js/lib/draw'
  import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer'

  export default class extends BaseRenderer {
    constructor(eventBus: EventBus, styles: Styles)
    canRender(element: Base): boolean
    drawShape(visuals: SVGElement, shape: Shape): SVGElement
    drawConnection(visuals: SVGElement, connection: Connection): SVGElement
    getShapePath(shape: Shape): string
    getConnectionPath(connection: Connection): string
  }
}

declare module 'diagram-js/lib/draw/Styles' {
  import Styles from 'diagram-js/lib/draw/Styles'

  export default class implements Styles {
    cls(className: string, traits: string[], additionalAttrs: object): object
    cls(className: string, additionalAttrs: object): object
    style(traits: string[], additionalAttrs: object): object
    style(additionalAttrs: object): object
    computeStyle(custom: object, traits: string[], defaultStyles: object): object
    computeStyle(custom: object, defaultStyles: object): object
    computeStyle(traits: string[], defaultStyles: object): object
    computeStyle(defaultStyles: object): object
  }
}
