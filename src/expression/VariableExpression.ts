import { Expression } from './Expression'

export class VariableExpression extends Expression {
  constructor(readonly key: string) {
    super()
  }

  evaluate(value: any, bindings: Record<string, any>): any {
    return bindings[this.key]
  }

  toString() {
    return `$${this.key}`
  }
}
