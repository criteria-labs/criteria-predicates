import { Expression } from './Expression'
import { ObjectLiteralExpression } from './ObjectLiteralExpression'
import { ValueExpression } from './ValueExpression'
import { VariableExpression } from './VariableExpression'

describe('ObjectLiteralExpression', () => {
  describe('with simple object', () => {
    describe('evaluate', () => {
      test('evaluates to object', () => {
        const expression = new ObjectLiteralExpression([['key', new ValueExpression('value')]])
        const result = expression.evaluate({}, {})
        expect(result).toEqual({ key: 'value' })
      })
    })
    describe('parse', () => {
      describe('canonical string', () => {
        test('should parse as constant value', () => {
          const expression = Expression.parse('{key: "value"}')
          expect(expression).toEqual(new ObjectLiteralExpression([['key', new ValueExpression('value')]]))
        })
      })
      describe('string with whitespace', () => {
        test('should parse as constant value', () => {
          const expression = Expression.parse(' { key : "value" } ')
          expect(expression).toEqual(new ObjectLiteralExpression([['key', new ValueExpression('value')]]))
        })
      })
      describe('invalid string', () => {
        expect(() => {
          Expression.parse('{ key "value" }')
        }).toThrow()
      })
    })
    describe('toString()', () => {
      test('should return string', () => {
        const expression = new ObjectLiteralExpression([['key', new VariableExpression('value')]])
        const result = expression.toString()
        expect(result).toEqual('{key: $value}')
      })
      test('should be able to parse result', () => {
        const expression = new ObjectLiteralExpression([['key', new VariableExpression('value')]])
        const string = expression.toString()
        const result = Expression.parse(string)
        expect(result).toEqual(new ObjectLiteralExpression([['key', new VariableExpression('value')]]))
      })
    })
  })
  describe('with template variable', () => {
    describe('evaluate', () => {
      test('evaluates to string', () => {
        const expression = new ObjectLiteralExpression([['key', new VariableExpression('var')]])
        const result = expression.evaluate({}, { var: 'boundValueExpression' })
        expect(result).toEqual({ key: 'boundValueExpression' })
      })
    })
    describe('parse', () => {
      describe('canonical string', () => {
        test('should parse', () => {
          const expression = Expression.parse('{ key: $var }')
          expect(expression).toEqual(new ObjectLiteralExpression([['key', new VariableExpression('var')]]))
        })
      })
      describe('string with whitespace', () => {
        test('should parse', () => {
          const expression = Expression.parse(' { key : $var } ')
          expect(expression).toEqual(new ObjectLiteralExpression([['key', new VariableExpression('var')]]))
        })
      })
      describe('invalid string', () => {
        expect(() => {
          Expression.parse(' { key $var } ')
        }).toThrow()
        expect(() => {
          Expression.parse('"var = ${$var"')
        }).toThrow()
      })
    })
    describe('toString()', () => {
      test('should return string', () => {
        const expression = new ObjectLiteralExpression([['key', new VariableExpression('var')]])
        const result = expression.toString()
        expect(result).toEqual('{key: $var}')
      })
      test('should be able to parse result', () => {
        const expression = new ObjectLiteralExpression([['key', new VariableExpression('var')]])
        const string = expression.toString()
        const result = Expression.parse(string)
        expect(result).toEqual(expression)
      })
    })
  })
})
