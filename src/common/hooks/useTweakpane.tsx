import React, { useRef, useEffect } from "react"
import Tweakpane from "tweakpane"

interface TweakpaneInputProps {}

const useTweakpane = (inputProps: TweakpaneInputProps) => {
  const tweaksRef = useRef(new Tweakpane())
  const tweaks = tweaksRef.current

  useEffect(() => {
    // tweaksRe
    // tweaks.addInput()
  }, [])
}

export default useTweakpane
