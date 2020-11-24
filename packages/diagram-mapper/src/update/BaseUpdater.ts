import * as _ from 'lodash'
import { Connection, Shape } from 'diagram-js/lib/model'
import { EventBus, Canvas, ElementFactory, ElementRegistry } from 'diagram-js/lib/core'
import Description from '../description/Description'
import { RepresentationModel } from '../representation/model/RepresentationModel'
import DomainModel from '../domain/DomainModel'
import { Bounds, Point } from '../representation/model/Primitives'
import { BaseElement, Edge, Node, Port } from '../representation/model/Node'
import Layouter from '../layout/Layouter'
import RepresentationMapper from '../mapper/RepresentationMapper'

export default abstract class BaseUpdater {
  // Services
  private _elementFactory: ElementFactory
  private _elementRegistry: ElementRegistry
  private _canvas: Canvas
  private _description: Description
  private _domainModel: DomainModel
  private _representationMapper: RepresentationMapper
  private _layouter?: Layouter

  // Runtime
  private _representationModel: RepresentationModel = { nodes: [], edges: [] }

  constructor(
    eventBus: EventBus,
    elementFactory: ElementFactory,
    elementRegistry: ElementRegistry,
    canvas: Canvas,
    description: Description,
    domainModel: DomainModel,
    RepresentationMapper: RepresentationMapper,
    layouter: Layouter
  ) {
    this._elementFactory = elementFactory
    this._elementRegistry = elementRegistry
    this._canvas = canvas
    this._description = description
    this._domainModel = domainModel
    this._representationMapper = RepresentationMapper
    this._layouter = layouter

    eventBus.on('domain-model.changed', ({ model }) => {
      this.updateRepresentation(model, true, true)
    })
  }

  getRepresentationModel() {
    return this._representationModel
  }

  /**
   *
   * @param model - The domain model.
   * @param updateCanvas - Must be 'true' if the canvas should be updated and 'false' otherwise.
   * @returns Newly created shapes and connections.
   */
  updateRepresentation(model: object, updateCanvas: boolean = true, layout: boolean = true) {
    const description = this._description.getDescription()
    if (_.isNil(description)) {
      throw Error('representation not configured')
    }

    // Compute representation difference
    let updatedRepresentationModel = this._representationMapper.mapRepresentation(model, description)

    return Promise.resolve(updatedRepresentationModel)
      .then(representationModel => {
        if (this._layouter && layout) {
          return this._layouter.layout(updatedRepresentationModel)
        } else {
          return representationModel
        }
      })
      .then(representationModel => {
        this.handleRepresentationUpdate(representationModel, updateCanvas)

        // Store updated domain model and representation
        this._representationModel = representationModel
        this._domainModel.model = model
      })
  }

  protected abstract handleRepresentationUpdate(
    updatedRepresentationModel: RepresentationModel,
    updateCanvas: boolean
  ): void

  protected addNode(node: Node, updateCanvas: boolean, parentShape?: Shape) {
    // Try to obtain coordinates of previously existing nodes with same key
    const coordinates = this.findPreviousCoordinatesIfAvailable(node)

    // Create actual node shapes, element factory may return either a single element
    // or an array, hence we have to make sure we have an array
    const rootNodeShapes = _.flatten([
      this._elementFactory.create('node', {
        ...node,
        bounds: {
          // Node bounds are computed relative to the parent node but
          // diagram-js awaits them in global canvas space
          ...this.mapBoundsIntoCanvasSpace(node.bounds, { x: parentShape?.x || 0, y: parentShape?.y || 0 }),
          ...(coordinates || {})
        }
      })
    ])

    if (updateCanvas) {
      rootNodeShapes.forEach((shape, index) => {
        if (index > 0) {
          // Assume first shape is primary shape,
          // hence use it as root shape
          this.addShapeToCanvas(shape, rootNodeShapes[0])
        } else {
          this.addShapeToCanvas(shape, parentShape)
        }
      })
    }

    // Create shapes for child nodes
    node.children.forEach(childNode => this.addNode(childNode, updateCanvas, rootNodeShapes[0]))
  }

  protected addPort(port: Port, updateCanvas: boolean, parentNode: Node) {
    const parentShape = this.findCorrespondingShape(parentNode)

    // Try to obtain coordinates of previously existing port with same key
    const coordinates = this.findPreviousCoordinatesIfAvailable(port)

    const portShape = this._elementFactory.create('port', {
      ...port,
      bounds: {
        // Port bounds are computed relative to the parent node but
        // diagram-js awaits them in global canvas space
        ...this.mapBoundsIntoCanvasSpace(port.bounds, { x: parentShape?.x || 0, y: parentShape?.y || 0 }),
        ...(coordinates || {})
      }
    })

    if (updateCanvas) {
      this.addShapeToCanvas(portShape, parentShape)
    }
  }

  protected addEdge(edge: Edge, updateCanvas: boolean) {
    const connection = this._elementFactory.create('edge', edge)

    if (updateCanvas) {
      this.addConnectionToCanvas(connection)
    }
  }

  protected mapBoundsIntoCanvasSpace(bounds: Bounds, parentPosition: Point): Bounds {
    return {
      ...bounds,
      x: bounds.x + parentPosition.x,
      y: bounds.y + parentPosition.y
    }
  }

  protected removeNode(node: Node) {
    this._canvas.removeShape(node.key)
  }

  protected findCorrespondingShape(element: BaseElement): Shape | undefined {
    return this._elementRegistry.filter(shape => shape.id === element.key)[0]
  }

  protected findPreviousCoordinatesIfAvailable(element: BaseElement): Point | undefined {
    const shape = this.findCorrespondingShape(element)
    if (!_.isNil(shape)) {
      return {
        x: shape.x,
        y: shape.y
      }
    }
  }

  protected addShapeToCanvas(shape: Shape, parentShape?: Shape) {
    // Be careful: Make sure shape is removed before added (again),
    // since it may already have been added if update is triggered by move
    this._canvas.removeShape(shape.id)
    this._canvas.addShape(shape, parentShape)
  }

  protected addConnectionToCanvas(connection: Connection) {
    // Be careful: Make sure connection is removed before added (again),
    // since it may already have been added if update is triggered by move
    this._canvas.removeConnection(connection.id)
    this._canvas.addConnection(connection)
  }
}
