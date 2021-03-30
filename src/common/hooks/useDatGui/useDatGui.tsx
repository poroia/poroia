import { useRef, useState } from "react"
import { Schema, MapToValueKey } from "./types"
import { buildGui } from "./helpers"
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect"

export const useDatGui = <T extends Schema<T>>(
  schema: T,
  config?: dat.GUIParams
) => {
  const [data, set] = useState<MapToValueKey<T>>()
  const guiRef = useRef<dat.GUI>()

  useIsomorphicLayoutEffect(() => {
    import("dat.gui").then((dat) => {
      guiRef.current = new dat.GUI(config)
      set(buildGui(guiRef.current, schema, set))
    })

    return () => {
      guiRef.current.destroy()
    }
  }, [])

  return data
}
