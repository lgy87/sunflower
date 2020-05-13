import useLocalRemoteState from "~/hooks/useLocalRemoteState"
import { HooksType } from "~/types"
import { ClientValue } from "./types"

const KEY = "LAST_CLIENT"

export default function useClient(defaultClient: ClientValue) {
  const [client, setClient] = useLocalRemoteState<ClientValue>(
    KEY,
    defaultClient,
  )

  return [client, setClient] as HooksType<ClientValue>
}
