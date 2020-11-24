import * as _ from 'lodash'
import { RepresentationModel } from '../representation/model/RepresentationModel'
import { DescriptionModel } from '../description/model/DescriptionModel'
import NodeMapper from './NodeMapper'
import EdgeMapper from './EdgeMapper'

export default class RepresentationMapper {
  private static $inject = ['nodeMapper', 'edgeMapper']

  private _nodeMapper: NodeMapper
  private _edgeMapper: EdgeMapper

  constructor(
    nodeMapper: NodeMapper,
    edgeMapper: EdgeMapper
  ) {
    this._nodeMapper = nodeMapper
    this._edgeMapper = edgeMapper
  }

  mapRepresentation(element: any, description: DescriptionModel): RepresentationModel {
    return {
      nodes: this._nodeMapper.mapNodes(element, description),
      edges: this._edgeMapper.mapEdges(element, description)
    }
  }
}
