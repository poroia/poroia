/**
 * A type guard based on an existing property
 * @param object to be checked
 * @param key existing property
 * @returns object is T
 */
export const tgKey = <T>(object: unknown, key: string): object is T => {
  return (object as T)[key] !== undefined
}
