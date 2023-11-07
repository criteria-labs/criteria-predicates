import { invariant } from '../util/invariant'
import { parse } from './parser/parse'

export abstract class Predicate {
  abstract evaluate(value: any, bindings: Record<string, any>): boolean
  abstract toString(): string

  static parse(string: string) {
    const parseResult = parse(string)
    invariant(parseResult.ast, `Unable to parse the format string '${string}'`)

    return buildPredicate(parseResult.ast.predicate)
  }
}

import { buildPredicate } from './parser/buildPredicate'
