import { Expression } from './Expression'
import { VariableExpression } from './VariableExpression'

describe('VariableExpression', () => {
  describe('evaluate', () => {
    describe('with empty bindings', () => {
      test('evaluates to undefined', () => {
        const expression = new VariableExpression('var')
        const result = expression.evaluate({}, {})
        expect(result).toEqual(undefined)
      })
    })
    describe('with bindings for variable', () => {
      test('evaluates to bound value', () => {
        const expression = new VariableExpression('var')
        const result = expression.evaluate({}, { var: 'boundValueExpression' })
        expect(result).toEqual('boundValueExpression')
      })
    })
  })
  describe('parse', () => {
    describe('canonical string', () => {
      test('should parse', () => {
        const expression = Expression.parse('$var')
        expect(expression).toEqual(new VariableExpression('var'))
      })
    })
    describe('string with whitespace', () => {
      test('should parse', () => {
        const expression = Expression.parse(' $var ')
        expect(expression).toEqual(new VariableExpression('var'))
      })
    })
    describe('invalid string', () => {
      expect(() => {
        Expression.parse('$var!')
      }).toThrow()
    })
  })
  describe('toString()', () => {
    test('should return string', () => {
      const expression = new VariableExpression('var')
      const result = expression.toString()
      expect(result).toEqual('$var')
    })
    test('should be able to parse result', () => {
      const expression = new VariableExpression('var')
      const string = expression.toString()
      const result = Expression.parse(string)
      expect(result).toEqual(expression)
    })
  })
})
