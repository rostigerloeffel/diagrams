import { NodeDescriptionTemplate, NodeDescription, EdgeDescription } from './NodeDescription'
import { ToolDescription } from './ToolDescription'

export interface DescriptionModel {
  nodeTemplates?: NodeDescriptionTemplate[]
  nodes?: NodeDescription[]
  edges?: EdgeDescription[]
  tools?: ToolDescription[]
  palette?: (ToolDescription | string)[]
  context?: (ToolDescription | string)[]
}
