import { Predicate } from './Predicate'

export class FalsePredicate extends Predicate {
  evaluate(value: any, bindings: Record<string, any>): boolean {
    return false
  }

  toString(): string {
    return 'FALSE'
  }
}
