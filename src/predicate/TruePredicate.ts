import { Predicate } from './Predicate'

export class TruePredicate extends Predicate {
  evaluate(value: any, bindings: Record<string, any>): boolean {
    return true
  }

  toString(): string {
    return 'TRUE'
  }
}
