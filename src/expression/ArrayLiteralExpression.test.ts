import { Expression } from './Expression'
import { ArrayLiteralExpression } from './ArrayLiteralExpression'
import { ValueExpression } from './ValueExpression'

describe('ArrayLiteralExpression', () => {
  describe('with no elements', () => {
    describe('evaluate()', () => {
      test('evaluates to empty array', () => {
        const expression = new ArrayLiteralExpression([])
        const result = expression.evaluate({}, {})
        expect(result).toEqual([])
      })
    })
    describe('toString()', () => {
      test('should return string', () => {
        const expression = new ArrayLiteralExpression([])
        const result = expression.toString()
        expect(result).toEqual('[]')
      })
      test('should be able to parse result', () => {
        const expression = new ArrayLiteralExpression([])
        const string = expression.toString()
        const result = Expression.parse(string)
        expect(result).toEqual(expression)
      })
    })
  })
  describe('with one element', () => {
    describe('evaluate()', () => {
      test('evaluates to array', () => {
        const expression = new ArrayLiteralExpression([new ValueExpression(true)])
        const result = expression.evaluate({}, {})
        expect(result).toEqual([true])
      })
    })
    describe('toString()', () => {
      test('should return string', () => {
        const expression = new ArrayLiteralExpression([new ValueExpression(true)])
        const result = expression.toString()
        expect(result).toEqual('[TRUE]')
      })
      test('should be able to parse result', () => {
        const expression = new ArrayLiteralExpression([new ValueExpression(true)])
        const string = expression.toString()
        const result = Expression.parse(string)
        expect(result).toEqual(expression)
      })
    })
  })
  describe('with multiple elements', () => {
    describe('evaluate()', () => {
      test('evaluates to array', () => {
        const expression = new ArrayLiteralExpression([new ValueExpression(true), new ValueExpression(false)])
        const result = expression.evaluate({}, {})
        expect(result).toEqual([true, false])
      })
    })
    describe('toString()', () => {
      test('should return string', () => {
        const expression = new ArrayLiteralExpression([new ValueExpression(true), new ValueExpression(false)])
        const result = expression.toString()
        expect(result).toEqual('[TRUE, FALSE]')
      })
      test('should be able to parse result', () => {
        const expression = new ArrayLiteralExpression([new ValueExpression(true), new ValueExpression(false)])
        const string = expression.toString()
        const result = Expression.parse(string)
        expect(result).toEqual(expression)
      })
    })
  })
  describe('parse()', () => {
    describe('canonical strings', () => {
      test('should parse empty array', () => {
        const expression = Expression.parse('[]')
        expect(expression).toEqual(new ArrayLiteralExpression([]))
      })
      test('should parse an array of one element', () => {
        const expression = Expression.parse('[TRUE]')
        expect(expression).toEqual(new ArrayLiteralExpression([new ValueExpression(true)]))
      })
      test('should parse an array of multiple elements', () => {
        const expression = Expression.parse('[TRUE,FALSE]')
        expect(expression).toEqual(new ArrayLiteralExpression([new ValueExpression(true), new ValueExpression(false)]))
      })
    })
    describe('string with whitespace', () => {
      test('should parse empty array', () => {
        const expression = Expression.parse(' [ ] ')
        expect(expression).toEqual(new ArrayLiteralExpression([]))
      })
      test('should parse array with one element', () => {
        const expression = Expression.parse(' [ TRUE ] ')
        expect(expression).toEqual(new ArrayLiteralExpression([new ValueExpression(true)]))
      })
      test('should parse array with multiple elements', () => {
        const expression = Expression.parse(' [ TRUE, FALSE ] ')
        expect(expression).toEqual(new ArrayLiteralExpression([new ValueExpression(true), new ValueExpression(false)]))
      })
    })
    describe('invalid string', () => {
      test('should throw ', () => {
        expect(() => {
          Expression.parse('[')
        }).toThrow()
        expect(() => {
          Expression.parse('[$$var]')
        }).toThrow()
        expect(() => {
          Expression.parse('[TRUE FALSE]')
        }).toThrow()
      })
    })
  })
})
