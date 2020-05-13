import { useEffect } from "react"
import storage from "~/utils/storage"

export default function useStorage<T = any>(storageKey: string, value: T) {
  useEffect(() => {
    storage.setItem(storageKey, value)
  }, [storageKey, value])
}
