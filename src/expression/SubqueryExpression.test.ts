import { Predicate } from '../predicate/Predicate'
import { Expression } from './Expression'
import { PropertyExpression } from './PropertyExpression'
import { SubqueryExpression } from './SubqueryExpression'
import { VariableExpression } from './VariableExpression'

describe('SubqueryExpression', () => {
  describe('evaluate', () => {
    describe('with item in collection', () => {
      test('evaluates to filtered array', () => {
        const expression = new SubqueryExpression(
          new PropertyExpression('items', null),
          Predicate.parse('$item.firstName = "Jane" AND $item.lastName = "Doe"'),
          new VariableExpression('item')
        )
        const result = expression.evaluate(
          {
            items: [
              { firstName: 'Jane', lastName: 'Doe' },
              { firstName: 'John', lastName: 'Doe' }
            ]
          },
          {}
        )
        expect(result).toEqual([{ firstName: 'Jane', lastName: 'Doe' }])
      })
    })
    describe('with no item in collection', () => {
      test('evaluates to empty array', () => {
        const expression = new SubqueryExpression(
          new PropertyExpression('items', null),
          Predicate.parse('$item.firstName = "Jane" AND $item.lastName = "Doe"'),
          new VariableExpression('item')
        )
        const result = expression.evaluate(
          {
            items: [
              { firstName: 'Jane', lastName: 'Dean' },
              { firstName: 'John', lastName: 'Doe' }
            ]
          },
          {}
        )
        expect(result).toEqual([])
      })
    })
    describe('with invalid collection', () => {
      test('evaluates to empty array', () => {
        const expression = new SubqueryExpression(
          new PropertyExpression('items', null),
          Predicate.parse('$item.firstName = "Jane" AND $item.lastName = "Doe"'),
          new VariableExpression('item')
        )
        const result = expression.evaluate(
          {
            items: { firstName: 'Jane', lastName: 'Doe' }
          },
          {}
        )
        expect(result).toEqual([])
      })
    })
  })
  describe('parse', () => {
    describe('canonical string', () => {
      test('should parse', () => {
        const expression = Expression.parse(
          'SUBQUERY(items, $item, $item.firstName = "Jane" AND $item.lastName = "Doe")'
        )
        expect(expression).toEqual(
          new SubqueryExpression(
            new PropertyExpression('items', null),
            Predicate.parse('$item.firstName = "Jane" AND $item.lastName = "Doe"'),
            new VariableExpression('item')
          )
        )
      })
    })
    describe('string with whitespace', () => {
      test('should parse', () => {
        const expression = Expression.parse(
          'SUBQUERY ( items , $item, $item.firstName = "Jane" AND $item.lastName = "Doe" ) '
        )
        expect(expression).toEqual(
          new SubqueryExpression(
            new PropertyExpression('items', null),
            Predicate.parse('$item.firstName = "Jane" AND $item.lastName = "Doe"'),
            new VariableExpression('item')
          )
        )
      })
    })
    describe('invalid string', () => {
      expect(() => {
        Expression.parse('SUBQUERY(items, item, $item.firstName = "Jane" AND $item.lastName = "Doe")')
      }).toThrow()
    })
  })
  describe('toString()', () => {
    test('should return string', () => {
      const expression = new SubqueryExpression(
        new PropertyExpression('items', null),
        Predicate.parse('$item.firstName = "Jane" AND $item.lastName = "Doe"'),
        new VariableExpression('item')
      )
      const result = expression.toString()
      expect(result).toEqual('SUBQUERY(items, $item, $item.firstName = "Jane" AND $item.lastName = "Doe")')
    })
    test('should be able to parse result', () => {
      const expression = new SubqueryExpression(
        new PropertyExpression('items', null),
        Predicate.parse('$item.firstName = "Jane" AND $item.lastName = "Doe"'),
        new VariableExpression('item')
      )
      const string = expression.toString()
      const result = Expression.parse(string)
      expect(result).toEqual(expression)
    })
  })
})
