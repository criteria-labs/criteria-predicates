import { escapeString } from '../util/escaping'
import { Expression } from './Expression'

export class TemplateStringExpression extends Expression {
  constructor(readonly segments: (string | Expression)[]) {
    super()
  }

  evaluate(value: any, bindings: Record<string, any>): string {
    return this.segments
      .map((segment) => {
        return typeof segment === 'string' ? segment : `${segment.evaluate(value, bindings)}`
      })
      .join('')
  }

  toString() {
    return `"${this.segments
      .map((segment) => {
        return typeof segment === 'string' ? escapeString(segment) : `\${${segment}}`
      })
      .join('')}"`
  }
}
