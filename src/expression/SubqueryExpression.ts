import { Predicate } from '../predicate/Predicate'
import { Expression } from './Expression'
import { VariableExpression } from './VariableExpression'

export class SubqueryExpression extends Expression {
  constructor(
    readonly collection: Expression,
    readonly filter: Predicate,
    readonly variable: VariableExpression
  ) {
    super()
  }

  evaluate(value: any, bindings: Record<string, any>): any[] | undefined {
    try {
      const collectionOutput = this.collection.evaluate(value, bindings)
      return Array.from(collectionOutput).filter((element) =>
        this.filter.evaluate(element, {
          ...bindings,
          [this.variable.key]: element
        })
      )
    } catch {
      return undefined
    }
  }

  toString() {
    return `SUBQUERY(${this.collection}, ${this.variable}, ${this.filter})`
  }
}
