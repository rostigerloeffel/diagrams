import * as _ from 'lodash'
import { FieldAppearance, NodeAppearance, PortAppearance } from '../representation/model/Appearance'
import { Point, Bounds, Padding, Dimension } from '../representation/model/Primitives'

export const CANVAS_COLOR = 'e8ded2'
export const FOREGROUND_COLOR = '#056676'
export const BACKGROUND_COLOR = '#a3d2ca'

export interface Configuration {
  node: {
    appearance: NodeAppearance
  },

  field: {
    appearance: FieldAppearance
  },

  port: {
    appearance: PortAppearance
  }

  // TODO: Refactor config
  nodeBounds: Bounds
  minNodeSize: Dimension
  nodePadding: Dimension
  fieldHeight: number
  fieldPadding: Padding
  fieldLabelSeparator: string
  nodeOffset: Point
  fillColor?: string
  foregroundColor: string
  cornerRounding: Point
  strokeWidth: number
  backgroundScale: number
  portSize: Dimension
  portSeparation: Dimension
  autoResizeOffset: Padding
  autoResizePadding: Padding
}

export const defaultConfig = {
  node: {
    appearance: {
      border: {
        color: FOREGROUND_COLOR,
        opacity: 1,
        pattern: '',
        width: 2,
        rounding: {
          x: 10,
          y: 10
        }
      },
      fill: {
        color: BACKGROUND_COLOR,
        opacity: 1
      },
      image: null,
      class: null
    }
  },

  field: {
    appearance: {
      separator: {
        color: FOREGROUND_COLOR,
        opacity: 1,
        pattern: '2 1 3 1',
        width: 1
      },
      fill: {
        color: BACKGROUND_COLOR,
        opacity: 1
      },
      font: {
        color: FOREGROUND_COLOR,
        opacity: 1
      },
      image: null,
      alignment: 'center',
      padding: 5,
      class: null
    }
  },

  port: {
    appearance: {
      border: {
        color: FOREGROUND_COLOR,
        opacity: 1,
        pattern: '',
        width: 2,
        rounding: {
          x: 0,
          y: 0
        }
      },
      fill: {
        color: FOREGROUND_COLOR,
        opacity: 1
      },
      image: null,
      class: null
    }
  },

  nodeBounds: {
    x: 100,
    y: 100,
    width: 100,
    height: 50
  },
  minNodeSize: {
    width: 10,
    height: 10
  },
  nodePadding: {
    width: 20,
    height: 20
  },
  fieldHeight: 10,
  fieldPadding: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  fieldLabelSeparator: ': ',
  nodeOffset: {
    x: 20,
    y: 20
  },
  fillColor: '#FFFFFF',
  foregroundColor: '#3E4653',
  cornerRounding: {
    x: 15,
    y: 15
  },
  strokeWidth: 1,
  backgroundScale: 1,
  portSize: {
    width: 10,
    height: 10
  },
  portSeparation: {
    width: 5,
    height: 5
  },
  autoResizeOffset: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10
  },
  autoResizePadding: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10
  }
}

export function createConfig(customConfig: Partial<Configuration>): Configuration {
  return _.assign({}, defaultConfig, customConfig)
}
