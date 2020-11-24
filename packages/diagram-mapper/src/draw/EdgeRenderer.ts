import * as _ from 'lodash'
import { attr, create, append } from 'tiny-svg'
import { Connection } from 'diagram-js/lib/model'
import { Canvas } from 'diagram-js/lib/core'
import { createLine } from 'diagram-js/lib/util/RenderUtil'

export default class EdgeRenderer {
  private static $inject = ['canvas']

  private _canvas: Canvas

  constructor(canvas: Canvas) {
    this._canvas = canvas
  }

  drawEdge(visuals: any, connection: Connection) {
    const line = createLine(connection.waypoints, {
      fill: 'none',
      strokeWidth: 1,
      stroke: 'black',
      //markerEnd: 'url(#edge-end)',
      //...style
    })
    append(visuals, line)
    return visuals
  }
}
