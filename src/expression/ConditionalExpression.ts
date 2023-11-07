import { Predicate } from '../predicate/Predicate'
import { Expression } from './Expression'

export class ConditionalExpression extends Expression {
  constructor(
    readonly test: Predicate,
    readonly trueBranch: Expression,
    readonly falseBranch: Expression
  ) {
    super()
  }

  evaluate(value: any, bindings: Record<string, any>): any {
    const testOutput = this.test.evaluate(value, bindings)
    if (testOutput) {
      return this.trueBranch.evaluate(value, bindings)
    } else {
      return this.falseBranch.evaluate(value, bindings)
    }
  }

  toString() {
    return `TERNARY(${this.test}, ${this.trueBranch}, ${this.falseBranch})`
  }
}
