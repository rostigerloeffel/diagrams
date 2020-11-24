import * as _ from 'lodash'
import { ModelMapper } from '../../representation/model/Primitives'
import { Query } from './NodeDescription'

export interface ToolAppearance {
  className?: string
  description?: string
}

export interface ToolDescription {
  key: string
  type: string

  appearance?: ToolAppearance
}

export interface DomainModelToolDescription extends ToolDescription {
  action: ModelMapper<any>,
}

export interface NodeModelToolDescription extends ToolDescription {
  template: string
  element: Query<any>,
  moveableTo: string[]
}


