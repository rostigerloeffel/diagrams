declare module 'diagram-js/lib/features/modeling' {
  import { Module } from 'didi'
  import { HandlerConstructor } from 'diagram-js/lib/command'

  const module: Module
  export default module

  export interface HandlerRegistration {
    [handlerId: string]: HandlerConstructor
  }

  export interface Modeling {
    getHandlers(): HandlerRegistration
  }
}

declare module 'diagram-js/lib/features/modeling/Modeling' {
  import { EventBus, ElementFactory, Point, Dimension, Bounds, Range, Alignment, Direction } from 'diagram-js/lib/core'
  import { CommandStack } from 'diagram-js/lib/command'
  import { Base, Shape, Root, Connection } from 'diagram-js/lib/model'
  import { HandlerRegistration, Modeling } from 'diagram-js/lib/features/modeling'

  interface Group {
    range: Range
    [other: string]: any
  }

  export default class BaseModeling implements Modeling {
    constructor(eventBus: EventBus, elementFactory: ElementFactory, commandStack: CommandStack)

    getHandlers(): HandlerRegistration

    moveShape(shape: Shape, delta: Point, newParent: Base, newParentIndex: number, hints: object): void
    moveShape(shape: Shape, delta: Point, newParent: Base, hints: object): void

    updateAttachment(shape: Base, newHost: Base): void

    moveElements(elements: Base[], delta: Point, target: Base, hints: object): void

    moveConnection(connection: Connection, delta: Point, newParent: Base, newParentIndex: number, hints: object): void
    moveConnection(connection: Connection, delta: Point, newParent: Base, hints: object): void

    layoutConnection(connection: Connection, hints: object): void

    createConnection(
      source: Base,
      target: Base,
      parentIndex: number,
      connection: object | Connection,
      parent: Base,
      hints: object
    ): void
    createConnection(source: Base, target: Base, connection: object | Connection, parent: Base, hints: object): void

    createShape(shape: Shape, position: Point | Bounds, target: Shape | Root, parentIndex: number, hints: object): void
    createShape(shape: Shape, position: Point | Bounds, target: Shape | Root, hints: object): void
    createShape(shape: Shape, position: Point | Bounds, target: Shape | Root): void

    createElements(
      elements: Base | Base[],
      position: Point | Bounds,
      parent: Base,
      parentIndex: number,
      hints: object
    ): void
    createElements(elements: Base | Base[], position: Point | Bounds, parent: Base, hints: object): void
    createElements(elements: Base | Base[], position: Point | Bounds, parent: Base): void

    createLabel(labelTarget: Base, position: Point, label: string, parent: Base): void

    appendShape(source: Shape, shape: Shape | object, position: Point, target: Shape, hints: object): void
    appendShape(source: Shape, shape: Shape | object, position: Point, target: Shape): void

    removeElements(elements: Base[]): void

    distributeElements(groups: Group[], axis: number, dimension: Dimension): void

    removeShape(shape: Shape, hints: object): void
    removeShape(shape: Shape): void
    removeConnection(connection: Connection, hints: object): void
    removeConnection(connection: Connection): void

    replaceShape(oldShape: Shape, newShape: Shape, hints: object): void
    replaceShape(oldShape: Shape, newShape: Shape): void

    alignElements(elements: Base[], alignment: Alignment): void

    resizeShape(shape: Shape, newBounds: Bounds, minBounds: Bounds, hints: object): void
    resizeShape(shape: Shape, newBounds: Bounds, minBounds: Bounds): void
    resizeShape(shape: Shape, newBounds: Bounds): void

    createSpace(movingShapes: Shape[], resizingShapes: Shape[], delta: Point, direction: Direction, start: number): void

    updateWaypoints(connection: Connection, newWaypoints: Point[], hints: object): void
    updateWaypoints(connection: Connection, newWaypoints: Point[]): void

    reconnect(connection: Connection, source: Base, target: Base, dockingOrPoints: Point | Point[], hints: object): void
    reconnect(connection: Connection, source: Base, target: Base, dockingOrPoints: Point | Point[]): void

    reconnectStart(connection: Connection, newSource: Base, dockingOrPoints: Point | Point[], hints: object): void
    reconnectStart(connection: Connection, newSource: Base, dockingOrPoints: Point | Point[]): void

    reconnectEnd(connection: Connection, newTarget: Base, dockingOrPoints: Point | Point[], hints: object): void
    reconnectEnd(connection: Connection, newTarget: Base, dockingOrPoints: Point | Point[]): void

    connect(source: Base, target: Base, attrs: object, hints: object): void
    connect(source: Base, target: Base, attrs: object): void

    toggleCollapse(shape: Base, hints: object): void
    toggleCollapse(shape: Base): void
  }
}
