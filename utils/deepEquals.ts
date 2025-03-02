export function deepEquals(a: any, b: any): boolean {
  if (a === b) return true

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false
    return a.every((el: any, idx: number) => {
      return deepEquals(el, b[idx])
    })
  }

  if (
    typeof a === "object" &&
    typeof b === "object" &&
    a !== null &&
    b !== null
  ) {
    if (Array.isArray(a) || Array.isArray(b)) return false

    const keysA = Object.keys(a)
    const keysB = Object.keys(b)

    if (
      keysA.length !== keysB.length ||
      !keysA.every((key) => keysB.includes(key))
    )
      return false

    for (const key in a) {
      if (!deepEquals(a[key], b[key])) return false
    }

    return true
  }

  return false
}
