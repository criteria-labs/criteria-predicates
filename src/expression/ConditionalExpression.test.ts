import { Expression } from './Expression'
import { ConditionalExpression } from './ConditionalExpression'
import { ValueExpression } from './ValueExpression'
import { VariableExpression } from './VariableExpression'
import { TruePredicate } from '../predicate/TruePredicate'
import { FalsePredicate } from '../predicate/FalsePredicate'

describe('ConditionalExpression', () => {
  describe('evaluate', () => {
    describe('with true condition', () => {
      test('evaluates to true expression', () => {
        const expression = new ConditionalExpression(
          new TruePredicate(),
          new VariableExpression('trueVar'),
          new VariableExpression('falseVar')
        )
        const result = expression.evaluate({}, { trueVar: 'trueValueExpression', falseVar: 'falseValueExpression' })
        expect(result).toEqual('trueValueExpression')
      })
    })
    describe('with false condition', () => {
      test('evaluates to false expression', () => {
        const expression = new ConditionalExpression(
          new FalsePredicate(),
          new VariableExpression('trueVar'),
          new VariableExpression('falseVar')
        )
        const result = expression.evaluate({}, { trueVar: 'trueValueExpression', falseVar: 'falseValueExpression' })
        expect(result).toEqual('falseValueExpression')
      })
    })
  })
  describe('parse', () => {
    describe('canonical string', () => {
      test('should parse', () => {
        const expression = Expression.parse('TERNARY(TRUE, $trueVar, $falseVar)')
        expect(expression).toEqual(
          new ConditionalExpression(
            new TruePredicate(),
            new VariableExpression('trueVar'),
            new VariableExpression('falseVar')
          )
        )
      })
    })
    describe('string with whitespace', () => {
      test('should parse', () => {
        const expression = Expression.parse(' TERNARY ( TRUE , $trueVar , $falseVar ) ')
        expect(expression).toEqual(
          new ConditionalExpression(
            new TruePredicate(),
            new VariableExpression('trueVar'),
            new VariableExpression('falseVar')
          )
        )
      })
    })
    describe('invalid string', () => {
      expect(() => {
        Expression.parse('TERNARY(TRUE, $trueVar, $falseVar')
      }).toThrow()
    })
  })
  describe('toString()', () => {
    test('should return string', () => {
      const expression = new ConditionalExpression(
        new TruePredicate(),
        new VariableExpression('trueVar'),
        new VariableExpression('falseVar')
      )
      const result = expression.toString()
      expect(result).toEqual('TERNARY(TRUE, $trueVar, $falseVar)')
    })
    test('should be able to parse result', () => {
      const expression = new ConditionalExpression(
        new TruePredicate(),
        new VariableExpression('trueVar'),
        new VariableExpression('falseVar')
      )
      const string = expression.toString()
      const result = Expression.parse(string)
      expect(result).toEqual(expression)
    })
  })
})
