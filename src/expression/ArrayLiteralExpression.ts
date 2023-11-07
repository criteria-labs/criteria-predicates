import { Expression } from './Expression'

export class ArrayLiteralExpression extends Expression {
  constructor(readonly elements: Expression[]) {
    super()
  }

  evaluate(value: any, bindings: Record<string, any>): any[] {
    return this.elements.map((element) => element.evaluate(value, bindings))
  }

  toString() {
    return `[${this.elements.map((element) => `${element}`).join(', ')}]`
  }
}
