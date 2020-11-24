import { RepresentationModel } from '../representation/model/RepresentationModel'
import { Node } from '../representation/model/Node'

export default interface Layouter {
  layout(representation: RepresentationModel): Promise<RepresentationModel>
  layoutNode(node: Node): Promise<Node>
}
