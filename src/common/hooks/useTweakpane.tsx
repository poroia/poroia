import React, { useRef, useEffect } from "react"
import Tweakpane from "tweakpane"
import {
  ButtonParams,
  FolderParams,
  InputParams,
  MonitorParams,
  SeparatorParams,
} from "tweakpane/dist/types/api/types"

interface TweakpaneInputProps {
  buttons: ButtonParams
  folders: FolderParams
  inputs: InputParams
  monitors: MonitorParams
  separator: SeparatorParams
}

const useTweakpane = (inputProps: TweakpaneInputProps) => {
  const tweaksRef = useRef(new Tweakpane())
  const tweaks = tweaksRef.current

  useEffect(() => {
    // tweaksRe
    // tweaks.addInput()
  }, [])
}

export default useTweakpane
