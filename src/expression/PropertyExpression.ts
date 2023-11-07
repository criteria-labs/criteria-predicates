import { Expression } from './Expression'

export class PropertyExpression extends Expression {
  constructor(
    readonly propertyName: string,
    readonly base: Expression | null
  ) {
    super()
  }

  evaluate(value: any, bindings: Record<string, any>): any {
    try {
      const base = this.base ? this.base.evaluate(value, bindings) : value
      if (Array.isArray(base)) {
        return Array.from(base).map((element) => element[this.propertyName])
      } else {
        return base[this.propertyName]
      }
    } catch {
      return undefined
    }
  }

  toString() {
    return this.base ? `${this.base}.${this.propertyName}` : this.propertyName
  }
}
