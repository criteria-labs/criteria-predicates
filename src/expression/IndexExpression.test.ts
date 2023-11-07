import { TruePredicate } from '../predicate/TruePredicate'
import { ConditionalExpression } from './ConditionalExpression'
import { Expression } from './Expression'
import { IndexExpression } from './IndexExpression'
import { PropertyExpression } from './PropertyExpression'
import { ValueExpression } from './ValueExpression'
import { VariableExpression } from './VariableExpression'

describe('IndexExpression', () => {
  describe('with FIRST index', () => {
    describe('evaluate', () => {
      describe('with array base expression', () => {
        describe('empty array', () => {
          test('evaluates undefined', () => {
            const expression = new IndexExpression(new PropertyExpression('prop', null), 'FIRST')
            const result = expression.evaluate({ prop: [] }, {})
            expect(result).toBeUndefined()
          })
        })
        describe('array with elements', () => {
          test('evaluates to first item', () => {
            const expression = new IndexExpression(new PropertyExpression('prop', null), 'FIRST')
            const result = expression.evaluate({ prop: ['first', 'second'] }, {})
            expect(result).toEqual('first')
          })
        })
      })
      describe('with undefined base expression', () => {
        test('evaluates to undefined', () => {
          const expression = new IndexExpression(new PropertyExpression('prop', null), 'FIRST')
          const result = expression.evaluate({}, {})
          expect(result).toEqual(undefined)
        })
      })
      describe('with base expression not a collection', () => {
        describe('Array.from(base) returns empty array', () => {
          test('evaluates to undefined', () => {
            const expression = new IndexExpression(new PropertyExpression('prop', null), 'FIRST')
            const result = expression.evaluate({ prop: {} }, {})
            expect(result).toBeUndefined
          })
        })
        describe('Array.from(base) throws', () => {
          test('evaluates to undefined', () => {
            const expression = new IndexExpression(new PropertyExpression('prop', null), 'FIRST')
            const result = expression.evaluate({ prop: null }, {})
            expect(result).toBeUndefined()
          })
        })
      })
    })
    describe('parse', () => {
      describe('canonical string', () => {
        test('should parse', () => {
          const expression = Expression.parse('prop[FIRST]')
          expect(expression).toEqual(new IndexExpression(new PropertyExpression('prop', null), 'FIRST'))
        })
      })
      describe('string with whitespace', () => {
        test('should parse', () => {
          const expression = Expression.parse(' prop [ FIRST ] ')
          expect(expression).toEqual(new IndexExpression(new PropertyExpression('prop', null), 'FIRST'))
        })
      })
      describe('invalid string', () => {
        expect(() => {
          Expression.parse('prop[START]')
        }).toThrow()
      })
    })
    describe('toString()', () => {
      test('should return string', () => {
        const expression = new IndexExpression(new PropertyExpression('prop', null), 'FIRST')
        const result = expression.toString()
        expect(result).toEqual('prop[FIRST]')
      })
      test('should be able to parse result', () => {
        const expression = new IndexExpression(new PropertyExpression('prop', null), 'FIRST')
        const string = expression.toString()
        const result = Expression.parse(string)
        expect(result).toEqual(expression)
      })
    })
  })
  describe('with LAST index', () => {
    describe('evaluate', () => {
      describe('with array base expression', () => {
        describe('empty array', () => {
          test('evaluates undefined', () => {
            const expression = new IndexExpression(new PropertyExpression('prop', null), 'LAST')
            const result = expression.evaluate({ prop: [] }, {})
            expect(result).toBeUndefined()
          })
        })
        describe('array with elements', () => {
          test('evaluates to last item', () => {
            const expression = new IndexExpression(new PropertyExpression('prop', null), 'LAST')
            const result = expression.evaluate({ prop: ['first', 'second'] }, {})
            expect(result).toEqual('second')
          })
        })
      })
      describe('with undefined base expression', () => {
        test('evaluates to undefined', () => {
          const expression = new IndexExpression(new PropertyExpression('prop', null), 'LAST')
          const result = expression.evaluate({}, {})
          expect(result).toEqual(undefined)
        })
      })
      describe('with base expression not a collection', () => {
        describe('Array.from(base) returns empty array', () => {
          test('evaluates to undefined', () => {
            const expression = new IndexExpression(new PropertyExpression('prop', null), 'LAST')
            const result = expression.evaluate({ prop: {} }, {})
            expect(result).toBeUndefined()
          })
        })
        describe('Array.from(base) throws', () => {
          test('evaluates to undefined', () => {
            const expression = new IndexExpression(new PropertyExpression('prop', null), 'LAST')
            const result = expression.evaluate({ prop: null }, {})
            expect(result).toBeUndefined()
          })
        })
      })
    })
    describe('parse', () => {
      describe('canonical string', () => {
        test('should parse', () => {
          const expression = Expression.parse('prop[LAST]')
          expect(expression).toEqual(new IndexExpression(new PropertyExpression('prop', null), 'LAST'))
        })
      })
      describe('string with whitespace', () => {
        test('should parse', () => {
          const expression = Expression.parse(' prop [ LAST ] ')
          expect(expression).toEqual(new IndexExpression(new PropertyExpression('prop', null), 'LAST'))
        })
      })
      describe('invalid string', () => {
        expect(() => {
          Expression.parse('prop[END]')
        }).toThrow()
      })
    })
    describe('toString()', () => {
      test('should return string', () => {
        const expression = new IndexExpression(new PropertyExpression('prop', null), 'LAST')
        const result = expression.toString()
        expect(result).toEqual('prop[LAST]')
      })
      test('should be able to parse result', () => {
        const expression = new IndexExpression(new PropertyExpression('prop', null), 'LAST')
        const string = expression.toString()
        const result = Expression.parse(string)
        expect(result).toEqual(expression)
      })
    })
  })
  describe('with SIZE index', () => {
    describe('evaluate', () => {
      describe('with array base expression', () => {
        describe('empty array', () => {
          test('evaluates to zero', () => {
            const expression = new IndexExpression(new PropertyExpression('prop', null), 'SIZE')
            const result = expression.evaluate({ prop: [] }, {})
            expect(result).toEqual(0)
          })
        })
        describe('array with elements', () => {
          test('evaluates to array length', () => {
            const expression = new IndexExpression(new PropertyExpression('prop', null), 'SIZE')
            const result = expression.evaluate({ prop: ['value'] }, {})
            expect(result).toEqual(1)
          })
        })
      })
      describe('with undefined base expression', () => {
        test('evaluates to undefined', () => {
          const expression = new IndexExpression(new PropertyExpression('prop', null), 'SIZE')
          const result = expression.evaluate({}, {})
          expect(result).toEqual(undefined)
        })
      })
      describe('with base expression not a collection', () => {
        describe('Array.from(base) returns empty array', () => {
          test('evaluates to zero', () => {
            const expression = new IndexExpression(new PropertyExpression('prop', null), 'SIZE')
            const result = expression.evaluate({ prop: {} }, {})
            expect(result).toEqual(0)
          })
        })
        describe('Array.from(base) throws', () => {
          test('evaluates to undefined', () => {
            const expression = new IndexExpression(new PropertyExpression('prop', null), 'SIZE')
            const result = expression.evaluate({ prop: null }, {})
            expect(result).toBeUndefined()
          })
        })
      })
    })
    describe('parse', () => {
      describe('canonical string', () => {
        test('should parse', () => {
          const expression = Expression.parse('prop[SIZE]')
          expect(expression).toEqual(new IndexExpression(new PropertyExpression('prop', null), 'SIZE'))
        })
      })
      describe('string with whitespace', () => {
        test('should parse', () => {
          const expression = Expression.parse(' prop [ SIZE ] ')
          expect(expression).toEqual(new IndexExpression(new PropertyExpression('prop', null), 'SIZE'))
        })
      })
      describe('invalid string', () => {
        expect(() => {
          Expression.parse('prop[LENGTH]')
        }).toThrow()
      })
    })
    describe('toString()', () => {
      test('should return string', () => {
        const expression = new IndexExpression(new PropertyExpression('prop', null), 'SIZE')
        const result = expression.toString()
        expect(result).toEqual('prop[SIZE]')
      })
      test('should be able to parse result', () => {
        const expression = new IndexExpression(new PropertyExpression('prop', null), 'SIZE')
        const string = expression.toString()
        const result = Expression.parse(string)
        expect(result).toEqual(expression)
      })
    })
    describe('with complex base expression', () => {
      describe('evaluate', () => {
        describe('with undefined base expression', () => {
          test('evaluates to undefined', () => {
            const expression = new IndexExpression(
              new ConditionalExpression(
                new TruePredicate(),
                new VariableExpression('trueVar'),
                new VariableExpression('falseVar')
              ),
              'SIZE'
            )
            const result = expression.evaluate({}, {})
            expect(result).toEqual(undefined)
          })
        })
        describe('with value for base expression', () => {
          test('evaluates to property value', () => {
            const expression = new IndexExpression(
              new ConditionalExpression(
                new TruePredicate(),
                new VariableExpression('trueVar'),
                new VariableExpression('falseVar')
              ),
              'SIZE'
            )
            const result = expression.evaluate({}, { trueVar: ['value'] })
            expect(result).toEqual(1)
          })
        })
      })
      describe('parse', () => {
        describe('canonical string', () => {
          test('should parse', () => {
            const expression = Expression.parse('TERNARY(TRUE, $trueVar, $falseVar)[SIZE]')
            expect(expression).toEqual(
              new IndexExpression(
                new ConditionalExpression(
                  new TruePredicate(),
                  new VariableExpression('trueVar'),
                  new VariableExpression('falseVar')
                ),
                'SIZE'
              )
            )
          })
        })
        describe('string with whitespace', () => {
          test('should parse', () => {
            const expression = Expression.parse(' TERNARY ( TRUE ,  $trueVar ,  $falseVar ) [ SIZE ] ')
            expect(expression).toEqual(
              new IndexExpression(
                new ConditionalExpression(
                  new TruePredicate(),
                  new VariableExpression('trueVar'),
                  new VariableExpression('falseVar')
                ),
                'SIZE'
              )
            )
          })
        })
        describe('invalid string', () => {
          expect(() => {
            Expression.parse('TERNARY(TRUE, $trueVar, $falseVar)[LENGTH]')
          }).toThrow()
        })
      })
      describe('toString()', () => {
        test('should return string', () => {
          const expression = new IndexExpression(
            new ConditionalExpression(
              new TruePredicate(),
              new VariableExpression('trueVar'),
              new VariableExpression('falseVar')
            ),
            'SIZE'
          )
          const result = expression.toString()
          expect(result).toEqual('TERNARY(TRUE, $trueVar, $falseVar)[SIZE]')
        })
        test('should be able to parse result', () => {
          const expression = new IndexExpression(
            new ConditionalExpression(
              new TruePredicate(),
              new VariableExpression('trueVar'),
              new VariableExpression('falseVar')
            ),
            'SIZE'
          )
          const string = expression.toString()
          const result = Expression.parse(string)
          expect(result).toEqual(expression)
        })
      })
    })
  })
})
