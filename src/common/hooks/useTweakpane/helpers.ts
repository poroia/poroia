import { Dispatch, SetStateAction } from "react"
import {
  Schema,
  MapToValueKey,
  InputController,
  InputControllerValue,
  OnEventType,
} from "./types"
import { tgKey } from "../../utils/tg"
import Tweakpane from "tweakpane"
import { InputParams } from "tweakpane/dist/types/api/types"

export const buildGui = <T extends Schema<T>>(
  pane: Tweakpane,
  schema: T,
  set: Dispatch<SetStateAction<MapToValueKey<T>>>
): MapToValueKey<T> => {
  // ! Wait until finishChange is supported in new version and remove this
  type NonFinishChange<T extends OnEventType> = T extends "finishChange"
    ? never
    : T

  Object.entries(schema).forEach(
    ([key, input]: [string, InputController | InputControllerValue]) => {
      let optParams: InputParams
      let _onEventType: NonFinishChange<OnEventType> = "change"

      if (tgKey<InputController>(input, "value")) {
        const { value, onEventType, ...props } = input

        schema[key] = value // remap object
        optParams = props
        // _onEventType = onEventType
      }

      pane
        .addInput(schema, key, optParams)
        .on(_onEventType, (value) => update(key, value.value, set))
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
