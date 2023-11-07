import { Expression } from './Expression'
import { TemplateStringExpression } from './TemplateStringExpression'
import { ValueExpression } from './ValueExpression'
import { VariableExpression } from './VariableExpression'

describe('TemplateStringExpression', () => {
  describe('with simple string', () => {
    describe('evaluate', () => {
      test('evaluates to string', () => {
        const expression = new TemplateStringExpression(['template'])
        const result = expression.evaluate({}, {})
        expect(result).toEqual('template')
      })
    })
    describe('parse', () => {
      describe('canonical string', () => {
        test('should parse as constant value', () => {
          const expression = Expression.parse('"template"')
          expect(expression).toEqual(new ValueExpression('template'))
        })
      })
      describe('string with whitespace', () => {
        test('should parse as constant value', () => {
          const expression = Expression.parse(' "template" ')
          expect(expression).toEqual(new ValueExpression('template'))
        })
      })
      describe('invalid string', () => {
        expect(() => {
          Expression.parse('"template')
        }).toThrow()
      })
    })
    describe('toString()', () => {
      test('should return string', () => {
        const expression = new TemplateStringExpression(['template'])
        const result = expression.toString()
        expect(result).toEqual('"template"')
      })
      test('should be able to parse result', () => {
        const expression = new TemplateStringExpression(['template'])
        const string = expression.toString()
        const result = Expression.parse(string)
        expect(result).toEqual(new ValueExpression('template'))
      })
    })
  })
  describe('with string with escaped characters', () => {
    describe('evaluate', () => {
      test('evaluates to string', () => {
        const expression = new TemplateStringExpression(['template "quoted"'])
        const result = expression.evaluate({}, {})
        expect(result).toEqual('template "quoted"')
      })
    })
    describe('parse', () => {
      describe('canonical string', () => {
        test('should parse as constant value', () => {
          const expression = Expression.parse('"template \\"quoted\\""')
          expect(expression).toEqual(new ValueExpression('template "quoted"'))
        })
      })
      describe('string with whitespace', () => {
        test('should parse as constant value', () => {
          const expression = Expression.parse(' "template \\"quoted\\"" ')
          expect(expression).toEqual(new ValueExpression('template "quoted"'))
        })
      })
      describe('invalid string', () => {
        expect(() => {
          Expression.parse('"template "quoted""')
        }).toThrow()
      })
    })
    describe('toString()', () => {
      test('should return string', () => {
        const expression = new TemplateStringExpression(['template "quoted"'])
        const result = expression.toString()
        expect(result).toEqual('"template \\"quoted\\""')
      })
      test('should be able to parse result', () => {
        const expression = new TemplateStringExpression(['template "quoted"'])
        const string = expression.toString()
        const result = Expression.parse(string)
        expect(result).toEqual(new ValueExpression('template "quoted"'))
      })
    })
  })
  describe('with template variable', () => {
    describe('evaluate', () => {
      test('evaluates to string', () => {
        const expression = new TemplateStringExpression(['var = ', new VariableExpression('var')])
        const result = expression.evaluate({}, { var: 'boundValueExpression' })
        expect(result).toEqual('var = boundValueExpression')
      })
    })
    describe('parse', () => {
      describe('canonical string', () => {
        test('should parse', () => {
          const expression = Expression.parse('"var = ${$var}"')
          expect(expression).toEqual(new TemplateStringExpression(['var = ', new VariableExpression('var')]))
        })
      })
      describe('string with whitespace', () => {
        test('should parse', () => {
          const expression = Expression.parse(' "var = ${$var}" ')
          expect(expression).toEqual(new TemplateStringExpression(['var = ', new VariableExpression('var')]))
        })
      })
      describe('invalid string', () => {
        expect(() => {
          Expression.parse('"var = ${$var}')
        }).toThrow()
        expect(() => {
          Expression.parse('"var = ${$var"')
        }).toThrow()
      })
    })
    describe('toString()', () => {
      test('should return string', () => {
        const expression = new TemplateStringExpression(['var = ', new VariableExpression('var')])
        const result = expression.toString()
        expect(result).toEqual('"var = ${$var}"')
      })
      test('should be able to parse result', () => {
        const expression = new TemplateStringExpression(['var = ', new VariableExpression('var')])
        const string = expression.toString()
        const result = Expression.parse(string)
        expect(result).toEqual(expression)
      })
    })
  })
})
