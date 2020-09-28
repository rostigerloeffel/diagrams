declare module 'diagram-js/lib/core' {
  import { Module } from 'didi'
  import { Base, Shape, Root, Label, Connection } from 'diagram-js/lib/model'

  const module: Module
  export default module

  export type Callback = (event: any) => void
  export interface EventBus {
    on(events: string | string[], priority: number, callback: Callback): void
    on(events: string | string[], callback: Callback): void
    on(events: string | string[], priority: number, callback: Callback, that: object): void
    on(events: string | string[], callback: Callback, that: object): void

    once(events: string | string[], priority: number, callback: Callback): void
    once(events: string | string[], callback: Callback): void
    once(events: string | string[], priority: number, callback: Callback, that: object): void
    once(events: string | string[], callback: Callback, that: object): void

    off(events: string | string[], callback: Callback): void

    fire(type: string, context: object): void
  }

  export interface ElementFactory {
    create(type: string): Base | Base[]
    create(type: 'shape'): Shape | Shape[]
    create(type: 'root'): Root
    create(type: 'label'): Label
    create(type: 'connection'): Connection

    create(type: string, attrs: object): Base | Base[]
    create(type: 'shape', attrs: object): Shape | Shape[]
    create(type: 'root', attrs: object): Root
    create(type: 'label', attrs: object): Label
    create(type: 'connection', attrs: object): Connection

    createShape(attrs: object): Shape
    createRoot(attrs: object): Root
    createLabel(attrs: object): Label
    createConnection(attrs: object): Connection
  }

  export interface ElementRegistry {
    add(element: Base, gfx: SVGElement, secondaryGfx?: SVGElement): void
    remove(element: Base): void
    updateId(element: Base, newId: string): void
    get(filter: string | SVGElement): Base
    filter(predicate: (element: Base) => boolean): Base[]
    forEach(functor: (element: Base) => void): void
    getGraphics(predicate: (element: Base) => boolean, secondary: boolean): SVGElement
  }

  export interface ScrollDelta {
    dx: number
    dy: number
  }

  export interface Point {
    x: number
    y: number
  }

  export interface Dimension {
    width: number
    height: number
  }

  export type Bounds = Point & Dimension

  export interface Range {
    min: number
    max: number
  }

  export interface Alignment {
    left?: number
    right?: number
    top?: number
    bottom?: number
    center?: number
    middle?: number
  }

  export type Direction = 'n' | 's' | 'e' | 'w'

  export interface Canvas {
    getDefaultLayer(): SVGElement
    getLayer(name: string, index: number): SVGElement
    getContainer(): HTMLElement
    addMarker(element: string | Base, marker: string): void
    removeMarker(element: string | Base, marker: string): void
    hasMarker(element: string | Base, marker: string): void
    toggleMarker(element: string | Base, marker: string): void
    getRootElement(): Root
    setRootElement(root: object | Root, override: boolean): object | Root
    addShape(shape: object | Shape, parent?: Base, parentIndex?: number): Shape
    removeShape(shape: string | Shape): Shape
    addConnection(shape: object | Connection, parent?: Base, parentIndex?: number): Connection
    removeConnection(connection: string | Connection): Connection
    getGraphics(element: string | Base, secondary: boolean): SVGElement
    viewbox(box: Bounds): Bounds
    scroll(delta: ScrollDelta): void
    zoom(newScale: number | string, center: Point | string): number
    getSize(): Dimension
    getAbsoluteBBox(element: any): Bounds
    resized(): void
  }
}

declare module 'diagram-js/lib/core/ElementFactory' {
  import { Base, Shape, Root, Label, Connection } from 'diagram-js/lib/model'
  import { ElementFactory } from 'diagram-js/lib/core'

  export default class DefaultElementFactory implements ElementFactory {
    create(type: string): Base | Base[]
    create(type: 'shape'): Shape
    create(type: 'root'): Root
    create(type: 'label'): Label
    create(type: 'connection'): Connection

    create(type: string, attrs: object): Base | Base[]
    create(type: 'shape', attrs: object): Shape
    create(type: 'root', attrs: object): Root
    create(type: 'label', attrs: object): Label
    create(type: 'connection', attrs: object): Connection

    createShape(attrs: object): Shape
    createRoot(attrs: object): Root
    createLabel(attrs: object): Label
    createConnection(attrs: object): Connection
  }
}

declare module 'diagram-js/lib/core/ElementRegistry' {
  import { Base } from 'diagram-js/lib/model'
  import { ElementRegistry } from 'diagram-js/lib/core'

  export default class DefaultElementRegistry implements ElementRegistry {
    add(element: Base, gfx: SVGElement, secondaryGfx?: SVGElement): void
    remove(element: Base): void
    updateId(element: Base, newId: string): void
    get(filter: string | SVGElement): Base
    filter(predicate: (element: Base) => boolean): Base[]
    forEach(functor: (element: Base) => void): void
    getGraphics(predicate: (element: Base) => boolean, secondary: boolean): SVGElement
  }
}
