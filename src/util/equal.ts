export function equal<T>(lhs: T, rhs: T): boolean {
  // use loose equality as predicate format syntax does not distinguish between null and undefined
  return lhs == rhs
}
