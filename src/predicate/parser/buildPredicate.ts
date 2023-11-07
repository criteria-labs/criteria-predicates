import { buildExpression } from '../../expression/parser/buildExpression'
import { assertNever, invariant } from '../../util/invariant'
import { ComparisonModifier, ComparisonOperator, ComparisonPredicate } from '../ComparisonPredicate'
import { ConjunctionPredicate } from '../ConjunctionPredicate'
import { DisjunctionPredicate } from '../DisjunctionPredicate'
import { FalsePredicate } from '../FalsePredicate'
import { NegationPredicate } from '../NegationPredicate'
import { Predicate } from '../Predicate'
import { TruePredicate } from '../TruePredicate'
import {
  ASTKinds,
  ComparisonPredicate as ComparisonPredicateAST,
  CompoundPredicate as CompoundPredicateAST,
  Predicate as PredicateAST
} from './parse'

export function buildPredicate(ast: PredicateAST): Predicate {
  if (typeof ast === 'string') {
    invariant(ast === 'TRUE' || ast === 'FALSE')
    switch (ast) {
      case 'TRUE':
        return new TruePredicate()
      case 'FALSE':
        return new FalsePredicate()
      default:
        assertNever(ast)
    }
  }
  switch (ast.kind) {
    case ASTKinds.Predicate_1:
      return buildCompoundPredicate(ast.compound)
    case ASTKinds.Predicate_2:
      return buildComparisonPredicate(ast.comparison)
    case ASTKinds.Predicate_3:
      return buildPredicate(ast.group)
    default:
      assertNever(ast)
  }
}

function buildCompoundPredicate(
  ast: CompoundPredicateAST
): ConjunctionPredicate | DisjunctionPredicate | NegationPredicate {
  switch (ast.kind) {
    case ASTKinds.CompoundPredicate_1: {
      const lhs = buildPredicate(ast.lhs)
      const rhs = buildPredicate(ast.rhs)
      return new ConjunctionPredicate(lhs, rhs)
    }
    case ASTKinds.CompoundPredicate_2: {
      const lhs = buildPredicate(ast.lhs)
      const rhs = buildPredicate(ast.rhs)
      return new DisjunctionPredicate(lhs, rhs)
    }
    case ASTKinds.CompoundPredicate_3: {
      const base = buildPredicate(ast.base)
      return new NegationPredicate(base)
    }
    default:
      invariant(false)
  }
}

function buildComparisonPredicate(ast: ComparisonPredicateAST): ComparisonPredicate {
  switch (ast.kind) {
    case ASTKinds.ComparisonPredicate_1:
      const lhs = buildExpression(ast.lhs)
      const rhs = buildExpression(ast.rhs)
      let operator: ComparisonOperator
      switch (ast.operator) {
        case '=':
          operator = 'equal'
          break
        case '!=':
          operator = 'not_equal'
          break
        case 'CONTAINS':
          operator = 'contains'
          break
        case 'IN':
          operator = 'in'
          break
        case '>':
          operator = 'greater_than'
          break
        case '>=':
          operator = 'greater_than_or_equal'
          break
        case '<':
          operator = 'less_than'
          break
        case '<=':
          operator = 'less_than_or_equal'
          break
        default:
          invariant(false, `invalid operator '${ast.operator}'`)
      }
      return new ComparisonPredicate(lhs, rhs, operator)
    case ASTKinds.ComparisonPredicate_2:
      const comparison = buildComparisonPredicate(ast.comparison)
      let modifier: ComparisonModifier
      switch (ast.modifier) {
        case 'ANY':
          modifier = 'any'
          break
        case 'ALL':
          modifier = 'all'
          break
        default:
          invariant(false, `invalid modifier '${ast.modifier}'`)
      }
      return new ComparisonPredicate(comparison.lhs, comparison.rhs, comparison.operator, modifier)
    default:
      assertNever(ast)
  }
}
