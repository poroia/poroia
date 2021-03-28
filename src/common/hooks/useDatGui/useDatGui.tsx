import { useRef, useState } from "react"
import useIsomorphicLayoutEffect from "../useIsomorphicLayoutEffect"
import { UseDatGuiData } from "./types"
import * as dat from "dat.gui"

interface Tweaks extends Record<string, any> {}

let ROOTPANE: dat.GUI | undefined

export const useDatGui = <T extends Tweaks>(
  schema: T,
  config?: dat.GUIParams
) => {
  const [data, set] = useState<UseDatGuiData<T>>()

  useIsomorphicLayoutEffect(() => {
    ROOTPANE = ROOTPANE ?? new dat.GUI(config)

    buildGui<T>(ROOTPANE, schema)

    return () => {
      ROOTPANE.destroy()
    }
  }, [])

  return data as 
}

const buildGui = <T extends Tweaks>(pane: dat.GUI, schema: T): UseDatGuiData<T> => {
  // pane.addColor()
  // console.log(schema)
  return schema
}
