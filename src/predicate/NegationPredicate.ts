import { Predicate } from './Predicate'

export class NegationPredicate extends Predicate {
  constructor(readonly base: Predicate) {
    super()
  }

  evaluate(value: any, bindings: Record<string, any>): boolean {
    const baseOutput = this.base.evaluate(value, bindings)
    return !baseOutput
  }

  toString() {
    return `NOT ${this.base}`
  }
}
