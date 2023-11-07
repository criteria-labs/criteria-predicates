import { Predicate } from './Predicate'

export class DisjunctionPredicate extends Predicate {
  constructor(
    readonly lhs: Predicate,
    readonly rhs: Predicate
  ) {
    super()
  }

  evaluate(value: any, bindings: Record<string, any>): boolean {
    const lhsOutput = this.lhs.evaluate(value, bindings)
    const rhsOutput = this.rhs.evaluate(value, bindings)
    return lhsOutput || rhsOutput
  }

  toString() {
    return `${this.lhs} OR ${this.rhs}`
  }
}
