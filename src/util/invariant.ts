import { PredicateError } from './PredicateError'

export function invariant(condition: any, message?: string): asserts condition {
  if (condition) {
    return
  }
  throw new PredicateError(message ?? 'Internal error')
}

export function assertNever(_: never, message?: string): never {
  throw new PredicateError(message ?? `Unexpected value`)
}
