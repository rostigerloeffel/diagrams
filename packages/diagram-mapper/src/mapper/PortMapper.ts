import * as _ from 'lodash'
import { Configuration } from '../config/Configuration'
import { BaseNodeDescription } from '../description/model/NodeDescription'
import { PortAppearanceHint, PortDescription } from '../description/model/NodeDescription'
import DomainModel from '../domain/DomainModel'
import { Bounds, Dimension, Location } from '../representation/model/Primitives'
import { Port } from '../representation/model/Node'
import { PortAppearance } from '../representation/model/Appearance'

// Data structure to keep track of the port mapping state while mapping
interface PortMappingState {
  // The ports, mapped so far successfully
  ports: Port[]
  // Ports counts on each side to support layouting
  north: number
  south: number
  west: number
  east: number
}

export default class PortMapper {
  private static $inject = ['representationConfig', 'domainModel']

  private _config: Configuration
  private _domainModel: DomainModel

  constructor(representationConfig: Configuration, domainModel: DomainModel) {
    this._config = representationConfig
    this._domainModel = domainModel
  }

  mapPorts(nodeKey: string, nodeDescription: BaseNodeDescription, nodeElement: any, nodeSize: Dimension): Port[] {
    const initialMappingState: PortMappingState = {
      ports: [],
      north: 0,
      south: 0,
      west: 0,
      east: 0
    }

    return (nodeDescription.ports || []).reduce(
      (mappingState: PortMappingState, portDescription: PortDescription) =>
        this.createPorts(nodeKey, portDescription, nodeElement, nodeSize, mappingState) as PortMappingState,
      initialMappingState
    ).ports
  }

  protected createPorts(
    nodeKey: string,
    portDescription: PortDescription,
    nodeElement: any,
    nodeSize: Dimension,
    mappingState: PortMappingState
  ) {
    const location = _.defaultTo(portDescription.location, Location.West)
    const localKey = this._domainModel.query(portDescription.key || _.uniqueId(), nodeElement)
    const key = _([nodeKey, localKey]).compact().join('.')

    const ports = this._domainModel.queryArray(portDescription.element, nodeElement).map(element => ({
      key,
      element,

      // Be careful: bounds are implicitly given by parent, location and already existing ports on the same side,
      // nevertheless they are needed by element factory to create shapes for ports
      bounds: this.createBounds(
        this._domainModel.query(location, nodeElement),
        nodeSize,
        mappingState
      ),

      appearance: this.createAppearance(
        // Use configured appearance as hint
        this._domainModel.query(portDescription.appearance, nodeElement)
      ),

      location
    }))

    return {
      ports: [...mappingState.ports, ...ports],
      north: mappingState.north + (location === Location.North ? ports.length : 0),
      south: mappingState.south + (location === Location.South ? ports.length : 0),
      west: mappingState.west + (location === Location.West ? ports.length : 0),
      east: mappingState.east + (location === Location.East ? ports.length : 0)
    }
  }

  protected createBounds(location: Location, nodeSize: Dimension, mappingState: PortMappingState): Bounds {
    let x = 0
    let y = 0

    if (location === Location.North) {
      x = this.computePortX(mappingState.north)
      y = -this._config.portSize.height
    } else if (location === Location.South) {
      x = this.computePortX(mappingState.south)
      y = nodeSize.height
    } else if (location === Location.West) {
      x = -this._config.portSize.width
      y = this.computePortY(mappingState.west)
    } else if (location === Location.East) {
      x = nodeSize.width
      y = this.computePortY(mappingState.east)
    }

    return {
      x,
      y,
      width: this._config.portSize.width,
      height: this._config.portSize.height
    }
  }

  protected computePortX(otherPorts: number) {
    return otherPorts * (this._config.portSeparation.width + this._config.portSize.width) + this._config.portSize.width
  }

  protected computePortY(otherPorts: number) {
    return (
      otherPorts * (this._config.portSeparation.height + this._config.portSize.height) + this._config.portSize.height
    )
  }

  protected createAppearance(hint?: PortAppearanceHint): PortAppearance {
    return _.defaultsDeep({}, hint, this._config.port.appearance)
  }
}
