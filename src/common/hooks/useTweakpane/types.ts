import { MutableRefObject } from "react"
import { InputParams } from "tweakpane/dist/types/api/types"
import { TweakpaneConfig } from "tweakpane/dist/types/pane/tweakpane-config"

/*
 | TWEAKS
 */

/**
 * The User-inputted Schema
 * TODO: utilize excess property checking on InputController
 *  - attempt: (InputController &
 *        ValidateShape<k, InputController, "ERROR_EXCESS_PROPERTY">) |
 *        InputControllerValue
 */
export type Schema<T> = {
  // eslint-disable-next-line no-unused-vars
  [k in keyof T]: InputController | InputControllerValue
}

/**
 * Remaps type to type of "value" property if type an object
 */
export type MapToValueKey<T> = {
  [k in keyof T]: T[k] extends { value: infer V } ? V : T[k]
}

/**
 * Input Controller
 */
export type InputController = {
  value: InputControllerValue
  onEventType?: OnEventType
} & InputParams

export type ColorHexString = string
export type CSSRGBString = string
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
 *
 * TODO add support for folders
 */
// export interface FolderController {}

/**
 * Config for Tweakpane
 *  - container has been altered to additionally support refs as
 *
 */
export type UseTweakpaneConfig = Omit<TweakpaneConfig, "container"> & {
  container?: HTMLElement | MutableRefObject<HTMLElement>
}

/*
 | HELPERS
 */

/**
 * Force excess property checking
 *
 * TODO see User inputted schema
 */
// type ValidateShape<T, Shape, Error> = T extends Shape
//   ? Exclude<keyof T, keyof Shape> extends never
//     ? T
//     : Error
//   : Shape
