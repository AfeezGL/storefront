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
export function isLessThanOneMinute(date: Date): boolean {
  const oneMinuteInMilliseconds = 60 * 1000 // 60 seconds * 1000 milliseconds
  const now = new Date()
  const difference = now.getTime() - date.getTime()

  return difference < oneMinuteInMilliseconds
}
