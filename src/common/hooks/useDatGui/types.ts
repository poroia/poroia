import * as dat from "dat.gui"

/*
// TWEAKS
*/

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
export interface InputController {
  /* universal properties */
  value: InputControllerValue

  name?: string
  onEventType?: "change" | "finishChange"

  /* specific properties */
  min?: number // for value: number
  max?: number // for value: number
  step?: number // for value: number
}
export type ColorHexString = string
export type RgbArray = [number, number, number]
export type RgbaArray = [number, number, number, number]
export type HsvObject = { h: number; s: number; v: number }
export type InputControllerValue =
  | number
  | string
  | boolean
  | (() => void)
  | ColorHexString
  | RgbArray
  | RgbaArray
  | HsvObject

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
export type ValidateShape<T, Shape, Error> = T extends Shape
  ? Exclude<keyof T, keyof Shape> extends never
    ? T
    : Error
  : Shape
