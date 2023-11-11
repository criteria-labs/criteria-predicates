import { Expression } from '../expression/Expression'
import { equal } from '../util/equal'
import { assertNever } from '../util/invariant'
import { Predicate } from './Predicate'

export type ComparisonOperator =
  | 'equal'
  | 'not_equal'
  | 'contains'
  | 'in'
  | 'greater_than'
  | 'greater_than_or_equal'
  | 'less_than'
  | 'less_than_or_equal'

export type ComparisonModifier = 'direct' | 'any' | 'all'

export class ComparisonPredicate extends Predicate {
  constructor(
    readonly lhs: Expression,
    readonly rhs: Expression,
    readonly operator: ComparisonOperator,
    readonly modifier: ComparisonModifier = 'direct'
  ) {
    super()
  }

  evaluate(value: any, bindings: Record<string, any>): boolean {
    const comparator = (lhs: any, rhs: any) => {
      switch (this.operator) {
        case 'equal':
          return equal(lhs, rhs)
        case 'not_equal':
          return !equal(lhs, rhs)
        case 'contains':
          for (const lhsElement of Array.from(lhs)) {
            if (equal(lhsElement, rhs)) {
              return true
            }
          }
          return false
        case 'in':
          for (const rhsElement of Array.from(rhs)) {
            if (equal(lhs, rhsElement)) {
              return true
            }
          }
          return false
        case 'greater_than':
          return lhs > rhs
        case 'greater_than_or_equal':
          return lhs >= rhs
        case 'less_than':
          return lhs < rhs
        case 'less_than_or_equal':
          return lhs <= rhs
        default:
          assertNever(this.operator)
      }
    }

    try {
      const lhsOutput = this.lhs.evaluate(value, bindings)
      const rhsOutput = this.rhs.evaluate(value, bindings)

      switch (this.modifier) {
        case 'direct':
          return comparator(lhsOutput, rhsOutput)
        case 'any':
          for (const lhsOutputElement of Array.from(lhsOutput)) {
            if (comparator(lhsOutputElement, rhsOutput)) {
              return true
            }
          }
          return false
        case 'all':
          for (const lhsOutputElement of Array.from(lhsOutput)) {
            if (!comparator(lhsOutputElement, rhsOutput)) {
              return false
            }
          }
          return true
        default:
          assertNever(this.modifier, `Invalid modifier '${this.modifier}'`)
      }
    } catch {
      return false
    }
  }

  toString() {
    let operatorString: string
    switch (this.operator) {
      case 'equal':
        operatorString = '='
        break
      case 'not_equal':
        operatorString = '!='
        break
      case 'contains':
        operatorString = 'CONTAINS'
        break
      case 'in':
        operatorString = 'IN'
        break
      case 'greater_than':
        operatorString = '>'
        break
      case 'greater_than_or_equal':
        operatorString = '>='
        break
      case 'less_than':
        operatorString = '<'
        break
      case 'less_than_or_equal':
        operatorString = '<='
        break
      default:
        assertNever(this.operator)
    }

    let modifierString: string
    switch (this.modifier) {
      case 'direct':
        modifierString = ''
        break
      case 'any':
        modifierString = 'ANY '
        break
      case 'all':
        modifierString = 'ALL '
        break
      default:
        assertNever(this.modifier)
    }
    return `${modifierString}${this.lhs} ${operatorString} ${this.rhs}`
  }
}
