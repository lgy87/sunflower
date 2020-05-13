import { useCallback } from "react"
import { useMap } from "react-use"
import { ClientValue } from "./types"

export type SelectedSources = Record<ClientValue, string>
export type Action = Fn<ClientValue, string, void>

export default function useSelectedSources() {
  const [selected, { set }] = useMap({} as SelectedSources)

  const set_ = useCallback<Action>((key, value) => set(key, value), [set])

  return [selected, set_] as [SelectedSources, Action]
}
