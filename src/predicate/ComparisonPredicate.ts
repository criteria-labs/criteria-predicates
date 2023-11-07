import { Expression } from '../expression/Expression'
import { isCollection } from '../util/collection'
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
    const comparator = (lhsValueExpression: any, rhsValueExpression: any) => {
      switch (this.operator) {
        case 'equal':
          return equal(lhsValueExpression, rhsValueExpression)
        case 'not_equal':
          return !equal(lhsValueExpression, rhsValueExpression)
        case 'contains':
          if (!isCollection(lhsValueExpression)) {
            return false
          }
          for (const lhsValueExpressionElement of Array.from(lhsValueExpression)) {
            return equal(lhsValueExpressionElement, rhsValueExpression)
          }
          return false
        case 'in':
          if (!isCollection(rhsValueExpression)) {
            return false
          }
          for (const rhsValueExpressionElement of Array.from(rhsValueExpression)) {
            return equal(lhsValueExpression, rhsValueExpressionElement)
          }
          return false
        case 'greater_than':
          return lhsValueExpression > rhsValueExpression
        case 'greater_than_or_equal':
          return lhsValueExpression >= rhsValueExpression
        case 'less_than':
          return lhsValueExpression < rhsValueExpression
        case 'less_than_or_equal':
          return lhsValueExpression <= rhsValueExpression
        default:
          assertNever(this.operator)
      }
    }

    const lhsOutput = this.lhs.evaluate(value, bindings)
    const rhsOutput = this.rhs.evaluate(value, bindings)

    switch (this.modifier) {
      case 'direct':
        return comparator(lhsOutput, rhsOutput)
      case 'any':
        if (!isCollection(lhsOutput)) {
          return false
        }
        for (const lhsOutputElement of Array.from(lhsOutput)) {
          if (comparator(lhsOutputElement, rhsOutput)) {
            return true
          }
        }
        return false
      case 'all':
        if (!isCollection(lhsOutput)) {
          return false
        }
        for (const lhsOutputElement of Array.from(lhsOutput)) {
          if (comparator(lhsOutputElement, rhsOutput)) {
            return false
          }
        }
        return true
      default:
        assertNever(this.modifier, `Invalid modifier '${this.modifier}'`)
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
