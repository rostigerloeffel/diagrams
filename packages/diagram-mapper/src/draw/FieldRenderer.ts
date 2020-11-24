import * as _ from 'lodash'
import { attr, create, append } from 'tiny-svg'
import { Shape } from 'diagram-js/lib/model'
import Text from 'diagram-js/lib/util/Text'
import { Configuration } from '../config/Configuration'
import { Field } from '../representation/model/Node'
import { Dimension, Bounds } from '../representation/model/Primitives'
import { FieldAppearance, Font, Separator } from '../representation/model/Appearance'

export default class FieldRenderer {
  private _config: Configuration
  private _text: any = new Text({})

  constructor(representationConfig: Configuration) {
    this._config = representationConfig
  }

  drawReadOnlyFields(visuals: any, shape: Shape) {
    const fields = shape.businessObject.fields

    const allFieldsGroup = create('g', {
      x: shape.x,
      y: shape.y,
      width: shape.width,
      height: shape.height,

      // Clip the node shape
      strokeWidth: 0,
      clipPath: `url(#${shape.id})`
    }) as SVGElement

    const fieldHeight = shape.height / fields.length
    fields.forEach((field: Field, index: number) => {
      const appearance = field.appearance

      const size = {
        width: shape.width,
        height: fieldHeight
      }

      const position = {
        x: 0,
        y: fieldHeight * index
      }

      // Group, spanning the whole field
      const fieldGroup = create('g', {
        transform: `translate(${position.x}, ${position.y})`
      }) as SVGElement

      // Render field to fill background
      const fieldRect = create('rect', {
        ...size,

        ...this.getFillAttributes(appearance)
      }) as SVGElement
      append(fieldGroup, fieldRect)

      // Group to collect content items (image, label, value)
      const contentGroup = create('g', {
        //transformOrigin: 'center',
        // Center content group within field group
      }) as SVGElement

      let textDisplacement = 0
      if (field.image) {
        // Icons are as width as height, hence displace text by icon height
        textDisplacement += fieldHeight
        this.drawFieldIcon(contentGroup, fieldHeight, field.image)
      }

      let text = field.element
      // Prepend label if available
      if (field.label) {
        text = field.label + this._config.fieldLabelSeparator + text
      }

      const textBounds = {
        // Make sure, text is displaced to leave space for icons etc.
        x: textDisplacement,
        y: 0,
        height: size.height,
        width: size.width - textDisplacement
      }
      const textWidth = this.drawTextField(contentGroup, textBounds, text, appearance.font)

      const contentWidth = textDisplacement + textWidth
      attr(contentGroup, {
        ...this.getContentTransformAttributes(size.width, contentWidth, appearance)
      })
      append(fieldGroup, contentGroup)

      // Render line to separate fields
      if (appearance.separator && index + 1 < fields.length) {
        this.drawFieldSeparator(appearance.separator, fieldGroup, size)
      }

      append(allFieldsGroup, fieldGroup)
    })

    append(visuals, allFieldsGroup)
  }

  private drawFieldIcon(visuals: any, height: number, iconUrl: string) {
    const iconHeight = height * 0.8

    const iconGroup = create('g', {
      transform: `translate(0, ${(height - iconHeight) / 2.0})`
    }) as SVGElement

    const image = attr(create('image'), {
      height: iconHeight,
      href: iconUrl
    })

    append(iconGroup, image)
    append(visuals, iconGroup)
  }

  private drawTextField(visuals: any, bounds: Bounds, text: string, appearance: Font) {
    const layoutedText = this._text.layoutText(text, {
      fitBox: true,
      box: bounds,
      padding: this._config.fieldPadding,
      style: {
        fill: appearance.color,
        opacity: appearance.opacity
      }
    })

    // Center text
    const { width, height } = layoutedText.dimensions
    const verticalPadding = (bounds.height - height) / 2.0

    const textGroup = create('g', {
      transform: `translate(${bounds.x}, ${verticalPadding})`
    }) as SVGElement

    append(textGroup, layoutedText.element)
    append(visuals, textGroup)

    return width
  }

  private drawFieldSeparator(separator: Separator, visuals: any, size: Dimension) {
    const line = create('line', {
      x1: 0,
      y1: size.height,
      x2: size.width,
      y2: size.height,

      stroke: separator.color,
      strokeDasharray: separator.pattern,
      strokeWidth: separator.width,
      strokeOpacity: separator.opacity
    }) as SVGElement
    append(visuals, line)
  }

  drawField(visuals: any, shape: Shape) {
    const text = shape.businessObject.text
    const layoutedText = this._text.layoutText(text, { fitBox: true })
    const textGroup = create('g') as SVGElement

    append(textGroup, layoutedText.element)
    append(visuals, textGroup)

    return visuals
  }

  protected getFillAttributes(fieldAppearance: FieldAppearance) {
    const fill = fieldAppearance.fill
    if (fill) {
      return {
        fill: fill.color,
        fillOpacity: fill.opacity
      }
    } else {
      return {}
    }
  }

  protected getContentTransformAttributes(fieldWidth: number, contentWidth: number, appearance: FieldAppearance) {
    switch (appearance.alignment) {
      case 'left':
        return {
          transform: `translate(${appearance.padding}, 0)`
        }
      case 'center':
        return {
          transform: `translate(${(fieldWidth - contentWidth) / 2.0}, 0)`
        }
      case 'right':
        return {
          transform: `translate(${(fieldWidth - contentWidth) - appearance.padding}, 0)`
        }
    }
  }
}
