import { Port } from '../representation/model/Node'
import { Location } from '../representation/model/Primitives'
import { Shape } from 'diagram-js/lib/model'
import { CommandHandler } from 'diagram-js/lib/command'
import Modeling from '../modeling/Modeling'

class ResizeShapeHandler implements CommandHandler {
  private static $inject = ['modeling']

  private _modeling: Modeling

  constructor(modeling: Modeling) {
    this._modeling = modeling
  }

  postExecute(context: any) {
    const nodeShape = context.shape
    if (nodeShape.type === 'node' && nodeShape.businessObject) {
      nodeShape.businessObject.ports.forEach((port: Port) => {
        const portShape = this.findChildShape(nodeShape, port.key)
        let x = portShape.x
        let y = portShape.y

        switch (port.location) {
          case Location.North:
            y = nodeShape.y - portShape.height
            break
          case Location.South:
            y = nodeShape.y + nodeShape.height
            break
          case Location.West:
            x = nodeShape.x - portShape.width
            break
          case Location.East:
            x = nodeShape.x + nodeShape.width
            break
        }

        // @ts-ignore
        this._modeling.moveShape(portShape, {
          x: x - portShape.x,
          y: y - portShape.y
        })
      })
    }
  }

  private findChildShape(shape: Shape, childId: string) {
    return shape.children.find((child: Shape) => child.id === childId)
  }
}

export default class ResizeShapeHandlerProvider {
  private static $inject = ['modeling']

  constructor(modeling: Modeling) {
    modeling.registerHandler('shape.resize', ResizeShapeHandler)
  }
}
