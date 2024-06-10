import { Jsonish } from "integraflow-js"

export const removeNullValues = (obj: Record<string, any>) => {
  const result: { [key: string]: Jsonish } = {}
  for (const key in obj) {
    if (obj[key] !== null) {
      result[key] = obj[key]
    }
  }
  return result
}
