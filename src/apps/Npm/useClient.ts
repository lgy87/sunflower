import { useEffect, useState } from "react"
import { useEffectOnce } from "react-use"
import storage from "~/utils/storage"
import { ClientValue } from "./types"

const KEY = "LAST_CLIENT"

export default function useClient<T = ClientValue>(defaultClient: T) {
  const [client, setClient] = useState<T>(defaultClient)

  useEffect(() => {
    storage.setItem(KEY, client)
  }, [client])

  useEffectOnce(() => {
    storage.getItem<T>(KEY).then(lastClient => {
      setClient(lastClient || defaultClient)
    })
  })

  return [client, setClient]
}
