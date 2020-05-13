import { useCallback, useEffect } from "react"
import useLocalRemoteState from "~/hooks/useLocalRemoteState"
import ipc from "~/utils/ipc"
import storage from "~/utils/storage"
import { ClientValue } from "./types"

export type Action = Fn<string, void>

const KEY = "LAST_USING_SOURCE"

export default function useUsingSource(client: ClientValue) {
  const [using, set] = useLocalRemoteState(
    `${KEY}-${client}`,
    "",
    ipc.npm.source.using(client),
  )

  const set_ = useCallback<Action>((value: string) => set(value), [set])

  useEffect(() => {
    storage.getItem<string>("LAST_USING_SOURCE-" + client).then(set_)
  }, [client, set_])

  return [using, set_] as [string, Action]
}
