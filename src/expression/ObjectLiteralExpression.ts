import { Expression } from './Expression'

export class ObjectLiteralExpression extends Expression {
  constructor(readonly properties: [string, Expression][]) {
    super()
  }

  evaluate(value: any, bindings: Record<string, any>): any {
    const output: any = {}
    for (const [propertyKey, propertyValue] of this.properties) {
      output[propertyKey] = propertyValue.evaluate(value, bindings)
    }
    return output
  }

  toString() {
    return `{${this.properties.map(([propertyKey, propertyValue]) => `${propertyKey}: ${propertyValue}`).join(', ')}}`
  }
}
