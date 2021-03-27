import { Dispatch, SetStateAction } from "react"
import Tweakpane from "tweakpane"
import {
  ButtonParams,
  FolderParams,
  SeparatorParams,
} from "tweakpane/dist/types/api/types"
import { TweakpaneConfig } from "tweakpane/dist/types/pane/tweakpane-config"
import {
  TweakpaneBuilderTypes,
  TweakpaneBuilderParams,
  R_InputParams,
  R_MonitorParams,
} from "./types"

interface Tweaks {
  [key: string]: any
}

export class TweakpaneBuilder {
  builder: TweakpaneBuilderParams[] = []

  input(params: R_InputParams) {
    this.builder.push({ type: TweakpaneBuilderTypes.INPUT, ...params })
    return this
  }

  monitor(params: R_MonitorParams) {
    this.builder.push({ type: TweakpaneBuilderTypes.MONITOR, ...params })
    return this
  }

  button(params: ButtonParams) {
    this.builder.push({ type: TweakpaneBuilderTypes.BUTTON, ...params })
    return this
  }

  folder(params: FolderParams) {
    this.builder.push({ type: TweakpaneBuilderTypes.FOLDER, ...params })
    return this
  }

  separator(params?: SeparatorParams) {
    this.builder.push({ type: TweakpaneBuilderTypes.SEPARATOR, ...params })
    return this
  }
}

export class R_Tweakpane {
  private tweakpane: Tweakpane

  private tweaks: Tweaks
  private setTweaks: Dispatch<SetStateAction<Tweaks>>

  constructor(setTweaks: Dispatch<SetStateAction<Tweaks>>) {
    this.tweaks = {}
    this.setTweaks = setTweaks
  }

  initTweakpane(tb: TweakpaneBuilder) {
    this.tweakpane = new Tweakpane()

    tb.builder.forEach((item) => {
      const { type, ...params } = item
      switch (item.type) {
        case TweakpaneBuilderTypes.INPUT: {
          const { label, value, ...rest } = params
          this.tweaks[label] = value
          this.setTweaks((state) => ({ ...state, [label]: value }))
          this.tweakpane
            .addInput(this.tweaks, label, rest)
            .on("change", (e) => {
              this.setTweaks((state) => ({ ...state, [label]: e.value ?? e }))
            })
          break
        }

        case TweakpaneBuilderTypes.MONITOR: {
          const { label, value, ...rest } = params
          // this.tweaks.key = value
          this.tweakpane
            .addMonitor(this.tweaks, label, rest)
            .on("update", (e) => {
              console.log(e)
            })
          break
        }

        case TweakpaneBuilderTypes.BUTTON: {
          this.tweakpane.addButton(params)
          break
        }

        case TweakpaneBuilderTypes.FOLDER: {
          this.tweakpane.addFolder(params)
          break
        }

        case TweakpaneBuilderTypes.SEPARATOR: {
          this.tweakpane.addSeparator(params)
          break
        }
      }
    })
  }
}
