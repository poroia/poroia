/* global dat */
import { Dispatch, SetStateAction } from "react"
import {
  Schema,
  MapToValueKey,
  InputController,
  InputControllerValue,
} from "./types"
import { tgKey } from "../../utils/tg"

export const buildGui = <T extends Schema<T>>(
  pane: dat.GUI,
  schema: T,
  set: Dispatch<SetStateAction<MapToValueKey<T>>>
): MapToValueKey<T> => {
  // helper to appropriately add to pane
  const addHelper = (key: string, input: InputControllerValue) => {
    switch (typeof input) {
      case "number":
      case "boolean":
      case "function":
        return pane.add(schema, key)

      case "object":
        return pane.addColor(schema, key)

      case "string":
        if (isHexColor(input)) {
          return pane.addColor(schema, key)
        } else {
          return pane.add(schema, key)
        }
    }
  }

  Object.entries(schema).forEach(
    ([key, input]: [string, InputController | InputControllerValue]) => {
      let c: dat.GUIController

      if (tgKey<InputController>(input, "value")) {
        const { value, onEventType, ...props } = input

        schema[key] = value // remap object
        c = addHelper(key, value)
        c = addPropsHelper(c, props)

        if (onEventType === "finishChange") {
          c.onFinishChange((value) => update(key, value, set))
        } else {
          c.onChange((value) => update(key, value, set))
        }
      } else {
        addHelper(key, input).onChange((value) => update(key, value, set))
      }
    }
  )

  return schema as MapToValueKey<T>
}

// helper to update state based on key, value
const update = <T>(
  key: string,
  value: unknown,
  set: Dispatch<SetStateAction<T>>
) => {
  set((state) => ({ ...state, [key]: value }))
}

// helper to add properties to controller
// ex: `c = name !== undefined ? c.name(name) : c`
const addPropsHelper = (
  c: dat.GUIController,
  obj: {
    name?: string
    min?: number
    max?: number
    step?: number
  }
) => {
  Object.entries(obj).forEach(([key, value]) => {
    c = value !== undefined ? c[key](value) : c
  })
  return c
}

// https://github.com/regexhq/hex-color-regex/
const isHexColor = (hex: string) => {
  const regex = /^#([a-f0-9]{3,4}|[a-f0-9]{4}(?:[a-f0-9]{2}){1,2})\b$/i
  return regex.test(hex)
}
