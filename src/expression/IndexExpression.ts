import { Expression } from './Expression'

export class IndexExpression extends Expression {
  constructor(
    readonly base: Expression,
    readonly index: number | 'FIRST' | 'LAST' | 'SIZE'
  ) {
    super()
  }

  evaluate(value: any, bindings: Record<string, any>): any {
    try {
      const baseOutput = this.base.evaluate(value, bindings)
      const array = Array.from(baseOutput)
      switch (this.index) {
        case 'FIRST':
          return array[0]
        case 'LAST':
          return array[array.length - 1]
        case 'SIZE':
          return array.length
        default:
          return array[this.index]
      }
    } catch {
      return undefined
    }
  }

  toString() {
    return `${this.base}[${this.index}]`
  }
}
