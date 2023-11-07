import { TruePredicate } from '../predicate/TruePredicate'
import { ConditionalExpression } from './ConditionalExpression'
import { Expression } from './Expression'
import { PropertyExpression } from './PropertyExpression'
import { ValueExpression } from './ValueExpression'
import { VariableExpression } from './VariableExpression'

describe('PropertyExpression', () => {
  describe('with simple key', () => {
    describe('evaluate', () => {
      describe('with empty object', () => {
        test('evaluates to undefined', () => {
          const expression = new PropertyExpression('prop', null)
          const result = expression.evaluate({}, {})
          expect(result).toEqual(undefined)
        })
      })
      describe('with property for key', () => {
        test('evaluates to property value', () => {
          const expression = new PropertyExpression('prop', null)
          const result = expression.evaluate({ prop: 'propValueExpression' }, {})
          expect(result).toEqual('propValueExpression')
        })
      })
      describe('with to-many relation', () => {
        test('evaluates to mapped collection', () => {
          const expression = new PropertyExpression('prop', null)
          const result = expression.evaluate([{ prop: 'propValueExpression' }, { prop: 'otherValueExpression' }], {})
          expect(result).toEqual(['propValueExpression', 'otherValueExpression'])
        })
      })
    })
    describe('parse', () => {
      describe('canonical string', () => {
        test('should parse', () => {
          const expression = Expression.parse('prop')
          expect(expression).toEqual(new PropertyExpression('prop', null))
        })
      })
      describe('string with whitespace', () => {
        test('should parse', () => {
          const expression = Expression.parse(' prop ')
          expect(expression).toEqual(new PropertyExpression('prop', null))
        })
      })
      describe('invalid string', () => {
        expect(() => {
          Expression.parse('.prop')
        }).toThrow()
      })
    })
    describe('toString()', () => {
      test('should return string', () => {
        const expression = new PropertyExpression('prop', null)
        const result = expression.toString()
        expect(result).toEqual('prop')
      })
      test('should be able to parse result', () => {
        const expression = new PropertyExpression('prop', null)
        const string = expression.toString()
        const result = Expression.parse(string)
        expect(result).toEqual(expression)
      })
    })
  })
  describe('with key path', () => {
    describe('evaluate', () => {
      describe('with empty object', () => {
        test('evaluates to undefined', () => {
          const expression = new PropertyExpression('nested', new PropertyExpression('prop', null))
          const result = expression.evaluate({}, {})
          expect(result).toEqual(undefined)
        })
      })
      describe('with value for parent property but not nested property', () => {
        test('evaluates to undefined', () => {
          const expression = new PropertyExpression('nested', new PropertyExpression('prop', null))
          const result = expression.evaluate({ prop: {} }, {})
          expect(result).toEqual(undefined)
        })
      })
      describe('with value for nested property', () => {
        test('evaluates to property value', () => {
          const expression = new PropertyExpression('nested', new PropertyExpression('prop', null))
          const result = expression.evaluate({ prop: { nested: 'propValueExpression' } }, {})
          expect(result).toEqual('propValueExpression')
        })
      })
      describe('with to-many relation', () => {
        test('evaluates to mapped collection', () => {
          const expression = new PropertyExpression('prop', new PropertyExpression('collection', null))
          const result = expression.evaluate(
            {
              collection: [{ prop: 'propValueExpression' }, { prop: 'otherValueExpression' }]
            },
            {}
          )
          expect(result).toEqual(['propValueExpression', 'otherValueExpression'])
        })
      })
    })
    describe('parse', () => {
      describe('canonical string', () => {
        test('should parse', () => {
          const expression = Expression.parse('prop.nested')
          expect(expression).toEqual(new PropertyExpression('nested', new PropertyExpression('prop', null)))
        })
      })
      describe('string with whitespace', () => {
        test('should parse', () => {
          const expression = Expression.parse(' prop.nested ')
          expect(expression).toEqual(new PropertyExpression('nested', new PropertyExpression('prop', null)))
        })
      })
      describe('invalid string', () => {
        expect(() => {
          Expression.parse('.prop.nested')
        }).toThrow()
      })
    })
    describe('toString()', () => {
      test('should return string', () => {
        const expression = new PropertyExpression('nested', new PropertyExpression('prop', null))
        const result = expression.toString()
        expect(result).toEqual('prop.nested')
      })
      test('should be able to parse result', () => {
        const expression = new PropertyExpression('nested', new PropertyExpression('prop', null))
        const string = expression.toString()
        const result = Expression.parse(string)
        expect(result).toEqual(expression)
      })
    })
  })
  describe('with complex base expression', () => {
    describe('evaluate', () => {
      describe('with empty object and bindings', () => {
        test('evaluates to undefined', () => {
          const expression = new PropertyExpression(
            'nested',
            new ConditionalExpression(
              new TruePredicate(),
              new VariableExpression('trueVar'),
              new VariableExpression('falseVar')
            )
          )
          const result = expression.evaluate({}, {})
          expect(result).toEqual(undefined)
        })
      })
      describe('with value for base expression but not nested property', () => {
        test('evaluates to undefined', () => {
          const expression = new PropertyExpression(
            'nested',
            new ConditionalExpression(
              new TruePredicate(),
              new VariableExpression('trueVar'),
              new VariableExpression('falseVar')
            )
          )
          const result = expression.evaluate({}, { trueVar: {} })
          expect(result).toEqual(undefined)
        })
      })
      describe('with value for nested property', () => {
        test('evaluates to property value', () => {
          const expression = new PropertyExpression(
            'nested',
            new ConditionalExpression(
              new TruePredicate(),
              new VariableExpression('trueVar'),
              new VariableExpression('falseVar')
            )
          )
          const result = expression.evaluate({}, { trueVar: { nested: 'propValueExpression' } })
          expect(result).toEqual('propValueExpression')
        })
      })
    })
    describe('parse', () => {
      describe('canonical string', () => {
        test('should parse', () => {
          const expression = Expression.parse('TERNARY(TRUE, $trueVar, $falseVar).nested')
          expect(expression).toEqual(
            new PropertyExpression(
              'nested',
              new ConditionalExpression(
                new TruePredicate(),
                new VariableExpression('trueVar'),
                new VariableExpression('falseVar')
              )
            )
          )
        })
      })
      describe('string with whitespace', () => {
        test('should parse', () => {
          const expression = Expression.parse(' TERNARY ( TRUE ,  $trueVar ,  $falseVar ) . nested  ')
          expect(expression).toEqual(
            new PropertyExpression(
              'nested',
              new ConditionalExpression(
                new TruePredicate(),
                new VariableExpression('trueVar'),
                new VariableExpression('falseVar')
              )
            )
          )
        })
      })
      describe('invalid string', () => {
        expect(() => {
          Expression.parse('TERNARY(TRUE, $trueVar, $falseVar) nested')
        }).toThrow()
      })
    })
    describe('toString()', () => {
      test('should return string', () => {
        const expression = new PropertyExpression(
          'nested',
          new ConditionalExpression(
            new TruePredicate(),
            new VariableExpression('trueVar'),
            new VariableExpression('falseVar')
          )
        )
        const result = expression.toString()
        expect(result).toEqual('TERNARY(TRUE, $trueVar, $falseVar).nested')
      })
      test('should be able to parse result', () => {
        const expression = new PropertyExpression(
          'nested',
          new ConditionalExpression(
            new TruePredicate(),
            new VariableExpression('trueVar'),
            new VariableExpression('falseVar')
          )
        )
        const string = expression.toString()
        const result = Expression.parse(string)
        expect(result).toEqual(expression)
      })
    })
  })
})
