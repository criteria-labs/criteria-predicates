import { escapeString } from '../util/escaping'
import { Expression } from './Expression'

export class ValueExpression extends Expression {
  constructor(readonly value: any) {
    super()
  }

  evaluate(value: any, bindings: Record<string, any>): any {
    return this.value
  }

  toString() {
    if (this.value === null) {
      return 'NULL'
    }
    switch (typeof this.value) {
      case 'boolean':
        return this.value ? 'TRUE' : 'FALSE'
      case 'number':
        return `${this.value}`
      case 'string':
        return `"${escapeString(this.value)}"`
      default:
        return `${this.value}`
    }
  }
}
