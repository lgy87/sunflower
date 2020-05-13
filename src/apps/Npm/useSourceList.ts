import * as r from "ramda"
import { useCallback, useEffect } from "react"
import { useMap } from "react-use"
import useLocalRemoteState from "~/hooks/useLocalRemoteState"
import useStorage from "~/hooks/useStorage"
import ipc from "~/utils/ipc"
import { ClientValue, SourceItem, SourceList, Sources } from "./types"

type Add = Fn<ClientValue, number, SourceItem, void>
type Remove = Fn<ClientValue, number, void>
type Actions = {
  add: Add
  remove: Remove
}

const KEY = "LAST_SOURCES"
const initialState = {
  npm: [],
  yarn: [],
}

const get = ipc.npm.source.get
const getAll = ipc.npm.source.all

export default function useSourceList(): [Sources, Actions] {
  const [init] = useLocalRemoteState<Sources>(KEY, initialState, getAll())
  const [value, { set, setAll }] = useMap(init)

  useStorage(KEY, value)

  useEffect(() => {
    setAll(init)
  }, [init, setAll])

  const add = useCallback<Add>(
    (client, index, value) => {
      ipc.npm.source
        .add(client, index, value)
        .then(
          r.pipe(
            r.prop<ClientValue, SourceList>(client),
            r.insert<SourceItem>(index, value),
            value => set(client, value),
          ),
        )
    },
    [set],
  )

  const remove = useCallback<Remove>(
    (client, index) => {
      ipc.npm.source
        .remove(client, index)
        .then(() => get(client))
        .then((value: any) => set(client, value))
    },
    [set],
  )

  return [value, { add, remove }]
}
