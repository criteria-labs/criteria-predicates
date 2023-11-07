import { invariant } from '../util/invariant'
import { parse } from './parser/parse'

export abstract class Expression {
  abstract evaluate(value: any, bindings: Record<string, any>): any
  abstract toString(): string

  static parse(string: string) {
    const parseResult = parse(string)
    invariant(parseResult.ast, `Unable to parse the format string '${string}'`)

    return buildExpression(parseResult.ast.expression)
  }
}

import { buildExpression } from './parser/buildExpression'
