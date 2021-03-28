import * as dat from "dat.gui"

//
// Tweaks
//  - compute type of final return value
//
export interface Tweaks extends Record<string, any> {}

export type UseDatGuiData<T> = {
  [k in keyof T]: T[k] extends { value: infer TT } ? TT : never
}

/**
 * Base Controller
 */
interface BaseController {
  name?: string
  onEventType?: "change" | "finishChange"
}

/**
 * Default Controller
 */
export type DefaultController =
  | StringBooleanController
  | NumberController
  | ColorController

/**
 * String Boolean Controller
 */
export interface StringBooleanController extends BaseController {
  type: "string | boolean"
  value: string | boolean
}
/**
 * Number Controller
 */
export interface NumberController extends BaseController {
  type: "number"
  value: number
  min?: number
  max?: number
  step?: number
}
/**
 * Color Controller
 */
export interface ColorController extends BaseController {
  type: "color"
  value: ColorHexString | RgbArray | RgbaArray | HsvObject
}
type ColorHexString = string
type RgbArray = [number, number, number]
type RgbaArray = [number, number, number, number]
type HsvObject = { h: number; s: number; v: number }

/**
 * Folder Controller
 */
export interface FolderController {}
