import * as r from "ramda"
import * as ra from "ramda-adjunct"
import React, { useCallback, useState } from "react"
import { useEffectOnce, useMap } from "react-use"
import { Box, Flex } from "reflexbox"
import Section from "~/components/Section"
import ipc from "~/utils/ipc"
import storage from "~/utils/storage"
import ActionBar from "./ActionBar"
import Clients, { ClientValue } from "./Clients"
import Sources, { Action, Source } from "./Sources"
import "./style.css"
import style from "./style.module.css"

type Index = number

type IndexUpdateHandler = (index: Index) => void
type TableRowsProps = {
  items: Array<Source>
  activedIndex: Index
  onActivedIndexChange: IndexUpdateHandler
}
type TableRowProps = Source & {
  selected: boolean
  index: Index
  count: number
  onClick: IndexUpdateHandler
}
type AllSources = Record<ClientValue, Array<Source>>

const clients = ["npm", "yarn"] as Array<ClientValue>

export default function Npm() {
  const [sources, { setAll, set, get }] = useMap({} as AllSources)
  const [activedClientIndex, setActivedClientIndex] = useState(0)
  // const [activedIndex, setActivedIndex] = useState(-1)
  const [lastClientIndex, setLastClientIndex] = useState(-1)

  useEffectOnce(() => {
    ipc.npm.source.all().then((resp: AllSources) => {
      setAll(resp)
    })
  })

  useEffectOnce(() => {
    const KEY = "LAST_ACTIVED_CLIENT_INDEX"

    storage.getItem<ClientValue>(KEY).then(lastActivedClient => {
      if (ra.isFalsy(lastActivedClient)) {
        return storage.setItem(KEY, clients[0])
      }

      // if (lastActivedClient !== activedClient)
      //   setActivedClient(lastActivedClient)
      setLastClientIndex(lastActivedClient)
    })
  })

  // const handleActivedIndexChange: IndexUpdateHandler = useCallback(index => {
  //   setActivedIndex(index)
  // }, [])

  const handleClientChange = useCallback((client: ClientValue) => {}, [])

  const remove: Action = useCallback(
    index => {
      ipc.npm.source.remove(activedClientIndex, index).then(() => {
        const old = get(activedClientIndex)

        set(activedClientIndex, r.remove(index, 1, old))
      })
    },
    [activedClientIndex, get, set],
  )

  if (ra.isFalsy(lastClientIndex)) return null

  return (
    <Section>
      <Flex>
        <Box className={style.clientContainer}>
          <Clients
            clients={clients}
            current={activedClientIndex}
            onChange={setActivedClient}
          />
        </Box>
        <Box>
          <ActionBar />
        </Box>
      </Flex>
      <Sources items={sources[clients[activedClientIndex]]} remove={remove} />
    </Section>
  )
}
