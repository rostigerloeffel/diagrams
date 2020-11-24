import * as _ from 'lodash'
import { Query } from '../description/model/NodeDescription'

export default class DomainModel {
  private _model: any

  set model(model: any) {
    this._model = model
  }

  get model() {
    return this._model
  }

  query<Type>(query: Query<Type>, domainElement: any): Type {
    if (_.isFunction(query)) {
      return query(domainElement)
    } else {
      return query
    }
  }

  queryArray<Type>(query: Query<Type>, domainElement: any): Type[] {
    const elements = this.query(query, domainElement)
    if (_.isNil(elements)) {
      return []
    }

    if (_.isArray(elements)) {
      return elements
    } else {
      return [elements]
    }
  }
}
