import { Point } from './Primitives'

export interface Separator {
  color?: string
  opacity?: number
  pattern?: string
  width?: number
}

export interface Border extends Separator {
  rounding?: Point
}
export interface Fill {
  color?: string
  opacity?: number
}

export interface Image {
  url: string
  scale?: number
}

export interface Font {
  color?: string
  opacity?: number
}

/**
 * Node appearance properties.
 */
export interface NodeAppearance {
  border: Border | false
  fill: Fill | false
  image?: Image
  className?: string
}

/**
 * Field appearance properties.
 */
export interface FieldAppearance {
  separator: Separator | false
  fill: Fill | false,
  font: Font,
  image?: Image
  alignment: 'left' | 'center' | 'right'
  padding: number
  className?: string
}

/**
 * Port appearance properties.
 */
export interface PortAppearance {
  border: Border | false
  fill: Fill | false
  image?: Image
  className?: string
}
