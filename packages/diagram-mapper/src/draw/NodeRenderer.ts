import * as _ from 'lodash'
import { Shape } from 'diagram-js/lib/model'
import { Canvas } from 'diagram-js/lib/core'
import { attr, create, append } from 'tiny-svg'
import { query } from 'min-dom'
import FieldRenderer from './FieldRenderer'
import { NodeAppearance } from '../representation/model/Appearance'

export default class NodeRenderer {
  private static $inject = ['fieldRenderer', 'canvas']

  private _fieldRenderer: FieldRenderer
  private _canvas: Canvas

  constructor(fieldRenderer: FieldRenderer, canvas: Canvas) {
    this._fieldRenderer = fieldRenderer
    this._canvas = canvas
  }

  drawNode(visuals: any, shape: Shape) {
    this.createClipPath(shape, this._canvas)

    this.drawNodeFrame(visuals, shape)
    this.drawNodeBackground(visuals, shape)
    this._fieldRenderer.drawReadOnlyFields(visuals, shape)
    return visuals
  }

  protected drawNodeFrame(visuals: any, shape: Shape) {
    const frameNode = attr(create('rect'), {
      ...this.getSizeAttributes(shape),
      ...this.getStrokeAttributes(shape),
      ...this.getFillAttributes(shape),
      ...this.getclassNameAttributes(shape)
    })

    append(visuals, frameNode)
    return visuals
  }

  protected drawNodeBackground(visuals: any, shape: Shape) {
    const appearance = this.getAppearance(shape)

    if (!appearance.image) {
      return visuals
    }

    const width = shape.width * (appearance.image.scale || 1)
    const height = shape.height * (appearance.image.scale || 1)

    const imageNode = attr(create('image'), {
      x: (shape.width - width) / 2.0,
      y: (shape.height - height) / 2.0,
      width,
      height,
      href: appearance.image.url
    })

    append(visuals, imageNode)
    return visuals
  }

  private getAppearance(shape: Shape): NodeAppearance {
    return shape.businessObject.appearance
  }

  protected getSizeAttributes(shape: Shape) {
    return {
      width: shape.width,
      height: shape.height
    }
  }

  protected getStrokeAttributes(shape: Shape) {
    const border = this.getAppearance(shape).border
    if (border) {
      return {
        rx: border.rounding?.x,
        ry: border.rounding?.y,
        stroke: border.color,
        strokeWidth: border.width,
        strokeDasharray: border.pattern,
        opacity: border.opacity
      }
    } else {
      return {}
    }
  }

  protected getFillAttributes(shape: Shape) {
    const fill = this.getAppearance(shape).fill
    if (fill) {
      return {
        fill: fill.color,
        fillOpacity: fill.opacity
      }
    } else {
      return {}
    }
  }

  protected getclassNameAttributes(shape: Shape) {
    const className = this.getAppearance(shape).className
    if (className) {
      return {
        class: className
      }
    } else {
      return {}
    }
  }

  private createClipPath(shape: Shape, canvas: Canvas) {
    // @ts-ignore
    const svgRoot = canvas._svg

    let defs = query('defs', svgRoot)
    if (!defs) {
      defs = create('defs')
      append(svgRoot, defs)
    }

    const clipPath = create('clipPath', {
      id: shape.id
    }) as SVGElement

    this.drawNodeFrame(clipPath, shape)
    append(defs, clipPath)
  }

}
