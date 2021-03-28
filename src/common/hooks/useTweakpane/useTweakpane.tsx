import { useRef, useState, useLayoutEffect } from "react"
import { R_Tweakpane, TweakpaneBuilder } from "./helpers"

interface Tweaks {
  [key: string]: any
}

export const useTweakpane = (builder: TweakpaneBuilder) => {
  const [tweaks, setTweaks] = useState<Tweaks>({})
  const tweakpaneRef = useRef<R_Tweakpane>(new R_Tweakpane(setTweaks))

  useLayoutEffect(() => {
    /* Instantiated here bc window is ready */
    console.log("instantiation...")
    tweakpaneRef.current.initTweakpane(builder)
  }, [])

  return tweaks
}
