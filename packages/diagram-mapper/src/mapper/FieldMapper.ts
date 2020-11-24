import * as _ from 'lodash'
import { Configuration } from '../config/Configuration'
import { BaseNodeDescription } from '../description/model/NodeDescription'
import { FieldAppearanceHint, FieldDescription } from '../description/model/NodeDescription'
import DomainModel from '../domain/DomainModel'
import { Bounds } from '../representation/model/Primitives'
import { Field, } from '../representation/model/Node'
import { FieldAppearance } from '../representation/model/Appearance'

export default class FieldMapper {
  private static $inject = ['representationConfig', 'domainModel']

  private _config: Configuration
  private _domainModel: DomainModel

  constructor(representationConfig: Configuration, domainModel: DomainModel) {
    this._config = representationConfig
    this._domainModel = domainModel
  }

  mapFields(nodeKey: string, nodeDescription: BaseNodeDescription, nodeElement: any): Field[] {
    return (nodeDescription.fields || []).reduce(
      (fields, fieldDescription) => [
        ...fields,
        ...this.createFields(nodeKey, fieldDescription, nodeElement, fields.length)
      ],
      [] as Field[]
    )
  }

  protected createFields(
    nodeKey: string,
    fieldDescription: FieldDescription,
    nodeElement: any,
    baseIndex: number
  ): Field[] {
    return this._domainModel.queryArray(fieldDescription.element, nodeElement).map((element, index) => ({
      key: nodeKey + '.' + this._domainModel.query(fieldDescription.key || _.uniqueId(), nodeElement),
      element,

      label: this._domainModel.query(fieldDescription.label, nodeElement),
      image: this._domainModel.query(fieldDescription.image, nodeElement),

      // Be careful: bounds are implicitly given by parent and field index,
      // nevertheless they are needed by element factory to create shapes for editable fields
      bounds: this.createBounds(baseIndex + index),

      appearance: this.createAppearance(
        // Use configured appearance as hint
        this._domainModel.query(fieldDescription.appearance, nodeElement)
      )
    }))
  }

  protected createBounds(index: number): Bounds {
    return {
      x: 0,
      y: this._config.fieldHeight * index,
      width: 500, // TODO
      height: this._config.fieldHeight
    }
  }

  protected createAppearance(hint?: FieldAppearanceHint, templateHint?: FieldAppearanceHint): FieldAppearance {
    return _.defaultsDeep({}, hint, templateHint, this._config.field.appearance)
  }
}
