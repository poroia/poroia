import { useRef, useState } from "react"
import Tweakpane from "tweakpane"
import { TweakpaneConfig } from "tweakpane/dist/types/pane/tweakpane-config"
import { Schema, MapToValueKey, UseTweakpaneConfig } from "./types"
import { buildGui } from "./helpers"
import { useIsomorphicLayoutEffect } from "../"

export const useTweakpane = <T extends Schema<T>>(
  schema: T,
  config?: UseTweakpaneConfig
) => {
  const [data, set] = useState<MapToValueKey<T>>()
  const guiRef = useRef<Tweakpane>()

  useIsomorphicLayoutEffect(() => {
    const tpConfig = getTpConfig(config)
    guiRef.current = new Tweakpane(tpConfig)
    console.log(config)
    set(buildGui(guiRef.current, schema, set))

    return () => {
      guiRef.current.dispose()
    }
  }, [])

  return [data, guiRef.current] as [MapToValueKey<T>, Tweakpane]
}

const getTpConfig = (config: UseTweakpaneConfig) => {
  let c = config.container
  if (c && "current" in c) {
    config.container = c.current
  }
  return config as TweakpaneConfig
}
