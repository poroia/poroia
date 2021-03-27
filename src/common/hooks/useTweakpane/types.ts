import {
  ButtonParams,
  FolderParams,
  InputParams,
  MonitorParams,
  SeparatorParams,
} from "tweakpane/dist/types/api/types"

export type TweakpaneBuilderParams = (
  | R_InputParams
  | R_MonitorParams
  | ButtonParams
  | FolderParams
  | SeparatorParams
) & { type: TweakpaneBuilderTypes; value?: any; label?: string }

export enum TweakpaneBuilderTypes {
  INPUT,
  MONITOR,
  BUTTON,
  FOLDER,
  SEPARATOR,
}

export type R_InputParams = InputParams & { value: any; label: string }

export type R_MonitorParams = MonitorParams & { value: any; label: string }
