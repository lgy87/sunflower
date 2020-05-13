import * as r from "ramda"
import * as ra from "ramda-adjunct"
import { useCallback, useRef, useState } from "react"
import { useEffectOnce } from "react-use"
import useStorage from "~/hooks/useStorage"
import { HooksType } from "~/types"
import storage from "~/utils/storage"
import toaster from "~/utils/toaster"
/*
 * 适用场景
 *
 * 本地 storage 记录着上次的使用信息，同时还需要从远程拉取最新状态的情景
 * 如果远程请求先返回，则放弃使用 storage 中的信息
 *    并且把远程请求返回值 再次更新到 storage 中，以保证 storage 中的数据一直是最新的
 *
 * 如果不指定 远程请求的 promise，则只从 storage 中读取信息
 */
export default function useLocalRemoteOnce<T, LT = T, RT = T>(
  storageKey: string,
  initialState: T,
  remotePromise?: Promise<RT>,
  localTransformer: Fn<LT, T> = r.identity as Fn<LT, T>,
  remoteTransformer: Fn<RT, T> = r.identity as Fn<RT, T>,
) {
  const localStorageAvailable = useRef(true)

  const [value, set] = useState<T>(initialState)

  useStorage(storageKey, value)

  const disableLocalStorage = useCallback(
    () => (localStorageAvailable.current = false),
    [],
  )

  useEffectOnce(() => {
    storage.getItem<LT>(storageKey).then(local => {
      if (ra.isFalsy(localStorageAvailable.current)) return
      if (r.equals<T>((local as any) as T, initialState)) return
      if (r.isNil(local)) return

      set(localTransformer(local) as T)
    })

    remotePromise &&
      remotePromise
        .then(r.tap(disableLocalStorage))
        .then(value => remoteTransformer(value) as T)
        .then(value => set(value))
        .catch(toaster.warn)
  })

  return [value, set] as HooksType<T>
}
