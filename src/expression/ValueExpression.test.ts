import { Expression } from './Expression'
import { ValueExpression } from './ValueExpression'

describe('ValueExpression', () => {
  describe('with null value', () => {
    describe('evaluate', () => {
      test('evaluates to null', () => {
        const expression = new ValueExpression(null)
        const result = expression.evaluate({}, {})
        expect(result).toEqual(null)
      })
    })
    describe('parse', () => {
      describe('canonical string', () => {
        test('should parse', () => {
          const expression = Expression.parse('NULL')
          expect(expression).toEqual(new ValueExpression(null))
        })
      })
      describe('string with whitespace', () => {
        test('should parse', () => {
          const expression = Expression.parse(' NULL ')
          expect(expression).toEqual(new ValueExpression(null))
        })
      })
      describe('invalid string', () => {
        expect(() => {
          Expression.parse('NIL')
        }).toThrow()
      })
    })
    describe('toString()', () => {
      test('should return string', () => {
        const expression = new ValueExpression(null)
        const result = expression.toString()
        expect(result).toEqual('NULL')
      })
      test('should be able to parse result', () => {
        const expression = new ValueExpression(null)
        const string = expression.toString()
        const result = Expression.parse(string)
        expect(result).toEqual(expression)
      })
    })
  })
  describe('with true value', () => {
    describe('evaluate', () => {
      test('evaluates to true', () => {
        const expression = new ValueExpression(true)
        const result = expression.evaluate({}, {})
        expect(result).toEqual(true)
      })
    })
    describe('parse', () => {
      describe('canonical string', () => {
        test('should parse', () => {
          const expression = Expression.parse('TRUE')
          expect(expression).toEqual(new ValueExpression(true))
        })
      })
      describe('string with whitespace', () => {
        test('should parse', () => {
          const expression = Expression.parse(' TRUE ')
          expect(expression).toEqual(new ValueExpression(true))
        })
      })
      describe('invalid string', () => {
        expect(() => {
          Expression.parse('YES')
        }).toThrow()
      })
    })
    describe('toString()', () => {
      test('should return string', () => {
        const expression = new ValueExpression(true)
        const result = expression.toString()
        expect(result).toEqual('TRUE')
      })
      test('should be able to parse result', () => {
        const expression = new ValueExpression(true)
        const string = expression.toString()
        const result = Expression.parse(string)
        expect(result).toEqual(expression)
      })
    })
  })
  describe('with false value', () => {
    describe('evaluate', () => {
      test('evaluates to false', () => {
        const expression = new ValueExpression(false)
        const result = expression.evaluate({}, {})
        expect(result).toEqual(false)
      })
    })
    describe('parse', () => {
      describe('canonical string', () => {
        test('should parse', () => {
          const expression = Expression.parse('FALSE')
          expect(expression).toEqual(new ValueExpression(false))
        })
      })
      describe('string with whitespace', () => {
        test('should parse', () => {
          const expression = Expression.parse(' FALSE ')
          expect(expression).toEqual(new ValueExpression(false))
        })
      })
      describe('invalid string', () => {
        expect(() => {
          Expression.parse('NO')
        }).toThrow()
      })
    })
    describe('toString()', () => {
      test('should return string', () => {
        const expression = new ValueExpression(false)
        const result = expression.toString()
        expect(result).toEqual('FALSE')
      })
      test('should be able to parse result', () => {
        const expression = new ValueExpression(false)
        const string = expression.toString()
        const result = Expression.parse(string)
        expect(result).toEqual(expression)
      })
    })
  })
  describe('with string value', () => {
    describe('evaluate', () => {
      test('evaluates to string', () => {
        const expression = new ValueExpression('value')
        const result = expression.evaluate({}, {})
        expect(result).toEqual('value')
      })
    })
    describe('parse', () => {
      describe('canonical string', () => {
        test('should parse', () => {
          const expression = Expression.parse('"value"')
          expect(expression).toEqual(new ValueExpression('value'))
        })
      })
      describe('string with whitespace', () => {
        test('should parse', () => {
          const expression = Expression.parse(' "value" ')
          expect(expression).toEqual(new ValueExpression('value'))
        })
      })
      describe('invalid string', () => {
        expect(() => {
          Expression.parse('"value')
        }).toThrow()
      })
    })
    describe('toString()', () => {
      test('should return string', () => {
        const expression = new ValueExpression('value')
        const result = expression.toString()
        expect(result).toEqual('"value"')
      })
      test('should be able to parse result', () => {
        const expression = new ValueExpression('value')
        const string = expression.toString()
        const result = Expression.parse(string)
        expect(result).toEqual(expression)
      })
    })
  })
  describe('with string value with escaped characters', () => {
    describe('evaluate', () => {
      test('evaluates to string', () => {
        const expression = new ValueExpression('value "quoted"')
        const result = expression.evaluate({}, {})
        expect(result).toEqual('value "quoted"')
      })
    })
    describe('parse', () => {
      describe('canonical string', () => {
        test('should parse', () => {
          const expression = Expression.parse('"value \\"quoted\\""')
          expect(expression).toEqual(new ValueExpression('value "quoted"'))
        })
      })
      describe('string with whitespace', () => {
        test('should parse', () => {
          const expression = Expression.parse(' "value \\"quoted\\"" ')
          expect(expression).toEqual(new ValueExpression('value "quoted"'))
        })
      })
      describe('invalid string', () => {
        expect(() => {
          Expression.parse('NO')
        }).toThrow()
      })
    })
    describe('toString()', () => {
      test('should return string', () => {
        const expression = new ValueExpression('value "quoted"')
        const result = expression.toString()
        expect(result).toEqual('"value \\"quoted\\""')
      })
      test('should be able to parse result', () => {
        const expression = new ValueExpression('value "quoted"')
        const string = expression.toString()
        const result = Expression.parse(string)
        expect(result).toEqual(expression)
      })
    })
  })
  describe('with number value', () => {
    describe('evaluate', () => {
      test('evaluates to number', () => {
        const expression = new ValueExpression(1)
        const result = expression.evaluate({}, {})
        expect(result).toEqual(1)
      })
    })
    describe('parse', () => {
      describe('canonical string', () => {
        test('should parse', () => {
          const expression = Expression.parse('1')
          expect(expression).toEqual(new ValueExpression(1))
        })
      })
      describe('string with whitespace', () => {
        test('should parse', () => {
          const expression = Expression.parse(' 1 ')
          expect(expression).toEqual(new ValueExpression(1))
        })
      })
      describe('invalid string', () => {
        expect(() => {
          Expression.parse('1.')
        }).toThrow()
      })
    })
    describe('toString()', () => {
      test('should return string', () => {
        const expression = new ValueExpression(1)
        const result = expression.toString()
        expect(result).toEqual('1')
      })
      test('should be able to parse result', () => {
        const expression = new ValueExpression(1)
        const string = expression.toString()
        const result = Expression.parse(string)
        expect(result).toEqual(expression)
      })
    })
  })
})
