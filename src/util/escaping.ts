export function escapeString(text: string) {
  return text.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\$/g, '\\$')
}

export function unescapeString(text: string) {
  return text.replace(/\\\$/g, '$').replace(/\\"/g, '"').replace(/\\\\/g, '\\')
}
