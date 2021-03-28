import { Dispatch, SetStateAction } from "react"
import * as dat from "dat.gui"
import { ColorController, DefaultController, Tweaks } from "./types"

export class DatGuiBuilder {
  tweaks: Tweaks
  update: Dispatch<SetStateAction<Tweaks>>
  gui: dat.GUI

  constructor(
    update?: Dispatch<SetStateAction<Tweaks>>,
    config?: dat.GUIParams
  ) {
    this.tweaks = {}
    this.update = update
    this.gui = new dat.GUI(config)
  }

  add(propName: string, params: DefaultController): this {
    let c: dat.GUIController

    // Add param.value to tweaks and gui, appropriately
    this.tweaks[propName] = params.value
    switch (params.type) {
      case "color": {
        c = this.gui.addColor(this.tweaks, propName)
      }
      default: {
        c = this.gui.add(this.tweaks, propName)
      }
    }

    // Add unique attributes to controller
    c = c.name(params.name)
    if (params.type === "number") {
      const { min, max, step } = params
      c = c.min(min).max(max).step(step)
    }

    // Add OnEventType to controller
    if (params.onEventType === "finishChange") {
      c = c.onFinishChange((value) => {
        this.update((state) => ({ ...state, [propName]: value }))
      })
    } else {
      c = c.onChange((value) => {
        this.update((state) => ({ ...state, [propName]: value }))
      })
    }

    return this
  }

  addFolder(): this {
    return this
  }
}

export const useDatGui = <T extends Record<string, any>>(schema: T) => {
  return schema as UseDatGuiValues<T>
}

type UseDatGuiValues<T> = {
  [k in keyof T]: T[k] extends { value: infer TT } ? TT : T[k]
}

let tweaks = new DatGuiBuilder().add("test", { value: true, type: "string | boolean" }).tweaks
useDatGui(tweaks)
