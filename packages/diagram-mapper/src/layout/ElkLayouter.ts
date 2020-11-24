import * as _ from 'lodash'
import ELKConstructor, { ELK, ElkEdge, ElkExtendedEdge, ElkNode, ElkPort } from 'elkjs/lib/elk.bundled.js'
import { Edge, Node, Port } from '../representation/model/Node'
import { RepresentationModel } from '../representation/model/RepresentationModel'
import Layouter from './Layouter'
import { Location } from '../representation/model/Primitives'
import { Configuration } from '../config/Configuration'

export default class ElkLayouter implements Layouter {
  private static $inject = ['representationConfig']

  private _config: Configuration
  private _elk: ELK

  constructor(representationConfig: Configuration) {
    this._config = representationConfig
    this._elk = new ELKConstructor()
  }

  layout(representation: RepresentationModel): Promise<RepresentationModel> {
    return this._elk
      .layout({
        layoutOptions: {
          algorithm: 'layered'
        },
        id: _.uniqueId('elk_id_'),
        children: representation.nodes.map(node => this.mapToElkNode(node)),
        edges: representation.edges.map(edge => this.mapToElkEdge(edge))
      })
      .then(layoutedElkRoot => ({
        ...representation,

        nodes: representation.nodes.map(node =>
          this.adjustRepresentationNode(
            node,
            layoutedElkRoot.children?.find(elkNode => elkNode.id === node.key)
          )
        ),
        edges: representation.edges.map(edge =>
          this.adjustRepresentationEdge(
            edge,
            layoutedElkRoot.edges?.find(elkEdge => elkEdge.id === edge.key)
          )
        )
      }))
  }

  layoutNode(node: Node): Promise<Node> {
    // prettier-ignore
    return this._elk
      .layout(this.mapToElkNode(node))
      .then(layoutedElkRoot => this.adjustRepresentationNode(node, layoutedElkRoot))
  }

  protected mapToElkNode(node: Node): ElkNode {
    return {
      id: node.key,
      ...node.bounds,
      children: node.children.map(node => this.mapToElkNode(node)),
      ports: node.ports.map(port => this.mapToElkPort(port)),

      layoutOptions: {
        portConstraints: 'FIXED_SIDE',
        'elk.padding': `[
          top=${this._config.nodePadding.height},
          left=${this._config.nodePadding.width},
          bottom=${this._config.nodePadding.height},
          right=${this._config.nodePadding.width}
        ]`
      }
    }
  }

  protected mapToElkPort(port: Port): ElkPort {
    return {
      id: port.key,
      ...port.bounds,
      layoutOptions: {
        'port.side': this.mapToElkLocation(port.location)
      }
    }
  }

  protected mapToElkEdge(edge: Edge): ElkExtendedEdge {
    return {
      id: edge.key,
      sources: [edge.source],
      targets: [edge.target],
      sections: []
    }
  }

  protected mapToElkLocation(location: Location): string {
    switch (location) {
      case Location.North:
        return 'NORTH'
      case Location.South:
        return 'SOUTH'
      case Location.West:
        return 'WEST'
      case Location.East:
        return 'EAST'
    }
  }

  protected adjustRepresentationNode(node: Node, elkNode?: ElkNode): Node {
    return {
      ...node,

      // Use layouted bounds
      bounds: {
        ...node.bounds,
        x: elkNode?.x || node.bounds.x,
        y: elkNode?.y || node.bounds.y,
        width: elkNode?.width || node.bounds.width,
        height: elkNode?.height || node.bounds.height
      },

      ports: node.ports.map(port =>
        this.adjustRepresentationPort(
          port,
          elkNode?.ports?.find(elkPort => elkPort.id === port.key)
        )
      ),

      children: node.children.map(childNode =>
        this.adjustRepresentationNode(
          childNode,
          elkNode?.children?.find(childElkNode => childElkNode.id === childNode.key)
        )
      )
    }
  }

  protected adjustRepresentationPort(port: Port, elkPort?: ElkPort): Port {
    return {
      ...port,

      // Use layouted bounds
      bounds: {
        ...port.bounds,
        x: elkPort?.x || port.bounds.x,
        y: elkPort?.y || port.bounds.y,
        width: elkPort?.width || port.bounds.width,
        height: elkPort?.height || port.bounds.height
      }
    }
  }

  protected adjustRepresentationEdge(edge: Edge, elkEdge?: ElkEdge): Edge {
    // TODO: Investigate extended edge
    const extendedEdge = elkEdge as ElkExtendedEdge
    return {
      ...edge,

      // Use layouted waypoints
      waypoints:
        _(extendedEdge?.sections)
          .flatMap(section => [section.startPoint, ...(section.bendPoints || []), section.endPoint])
          .value() || []
    }
  }
}
