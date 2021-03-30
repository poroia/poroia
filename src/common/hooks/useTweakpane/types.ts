/*
// TWEAKS
*/

import { InputParams } from "tweakpane/dist/types/api/types"

/**
 * The User-inputted Schema
 *
 * NOTE: Want to utilize excess property checking on InputController
 *       using ValidateShape, but unable to so far.
 *       ``` // tried using this as
 *       (InputController & ValidateShape<k, InputController, "ERROR_EXCESS_PROPERTY">)
 *       | InputControllerValue
 *       ```
 */
export type Schema<T> = {
  [k in keyof T]: InputController | InputControllerValue
}
// tried using this as value
//  (InputController & ValidateShape<k, InputController, "ERROR_EXCESS_PROPERTY">)
//  | InputControllerValue

/**
 * Remaps type to type of "value" property if type an object
 */
export type MapToValueKey<T> = {
  [k in keyof T]: T[k] extends { value: infer V } ? V : T[k]
}

/**
 * Input Controller
 */
// export interface InputController extends Omit<NumberConstraints, "value"> {
//   /* universal properties */
//   value: InputControllerValue

//   name?: string
//   onEventType?: OnEventType
//   input?: "color" | "color.rgba" | "string"

//   /* specific properties */
//   options?: { [key: string]: number | string } // for value: number; object list
//   format?: (value: number) => number // for value: number; reformat
// }
export type InputController = {
  value: InputControllerValue
  name?: string
  onEventType?: OnEventType
} & InputParams

export type ColorHexString = string
export type CSSRGBString = string // not supported yet
export type RgbObject = { r: number; g: number; b: number }
export type RgbaObject = { r: number; g: number; b: number; a: number }
export type Point2D = {
  x: number | NumberConstraints
  y: number | (NumberConstraints & { inverted?: boolean })
}
export type Point3D = Point2D & { z: number | NumberConstraints }
export type Point4D = Point3D & { w: number | NumberConstraints }

export type OnEventType = "change" | "finishChange"

export type InputControllerValue =
  | number
  | string
  | boolean
  | ColorHexString
  | CSSRGBString
  | RgbObject
  | RgbaObject
  | Point2D
  | Point3D
  | Point4D

type NumberConstraints = {
  value: number
  min?: number
  max?: number
  step?: number
}

/**
 * Folder Controller
 */
export interface FolderController {}

/*
// HELPERS
*/

/**
 * Force excess property checking
 */
type ValidateShape<T, Shape, Error> = T extends Shape
  ? Exclude<keyof T, keyof Shape> extends never
    ? T
    : Error
  : Shape

/**
 * Beautifies types
 * ```
 * type A = { a: 'a' } & { b: 'b' } // { a: 'a' } & { b: 'b' }
 * type B = Id<{ a: 'a' } & { b: 'b' }> // { a: 'a'; b: 'b' }
 * ```
 */
type Id<T> = T extends infer TT ? { [k in keyof TT]: TT[k] } : never
