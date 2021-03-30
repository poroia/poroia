import { useRef, useState } from "react"
import Tweakpane from "tweakpane"
import { TweakpaneConfig } from "tweakpane/dist/types/pane/tweakpane-config"
import { Schema, MapToValueKey } from "./types"
import { buildGui } from "./helpers"
import { useIsomorphicLayoutEffect } from "../"

export const useTweakpane = <T extends Schema<T>>(
  schema: T,
  config?: TweakpaneConfig
) => {
  const [data, set] = useState<MapToValueKey<T>>()
  const guiRef = useRef<Tweakpane>()

  useIsomorphicLayoutEffect(() => {
    guiRef.current = new Tweakpane(config)
    set(buildGui(guiRef.current, schema, set))

    return () => {
      guiRef.current.dispose()
    }
  }, [])

  return data
}
