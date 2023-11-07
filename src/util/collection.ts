export type Collection<T> = Iterable<T> | ArrayLike<T>

export function isCollection(value: any): value is Collection<any> {
  return Array.isArray(value)
}
