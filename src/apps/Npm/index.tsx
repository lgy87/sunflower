import { Alert, FormGroup, InputGroup } from "@blueprintjs/core"
import * as r from "ramda"
import * as ra from "ramda-adjunct"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useEffectOnce, useList, useMap, useToggle } from "react-use"
import { Box, Flex } from "reflexbox"
import Section from "~/components/Section"
import ipc from "~/utils/ipc"
import storage from "~/utils/storage"
import toaster from "~/utils/toaster"
import ActionBar, { Action as ActionBarAction } from "./ActionBar"
import Clients, { ClientValue } from "./Clients"
import Sources, { Action as SourcesAction, Source } from "./Sources"
import "./style.css"
import style from "./style.module.css"

type AllSources = Record<ClientValue, Array<Source>>

const clients = ["npm", "yarn"] as Array<ClientValue>

const KEY = "LAST_CLIENT_INDEX"

export default function Npm() {
  const [sources, { setAll, set, get }] = useMap({} as AllSources)
  const [activedClientIndex, setActivedClientIndex] = useState(0)
  const [lastClientIndex, setLastClientIndex] = useState(-1)
  const [selectedIndexes, { updateAt }] = useList([-1, -1])
  const [alertOpen, setAlertOpen] = useToggle(true)
  const [newSource, { set: set2 }] = useMap({ name: "", src: "" } as Source)
  const [newSourceIndex, setNewSourceIndex] = useState(-1)

  console.log(setAlertOpen, set2)
  const client = useMemo(() => clients[activedClientIndex], [
    activedClientIndex,
  ])
  const currentSelectedIndex = useMemo(
    () => selectedIndexes[activedClientIndex],
    [activedClientIndex, selectedIndexes],
  )

  useEffectOnce(() => {
    ipc.npm.source.all().then(setAll).catch(toaster.warn)
  })

  useEffectOnce(() => {
    storage.getItem<number>(KEY).then(lastClientIndex => {
      const index = lastClientIndex || 0

      setLastClientIndex(index)
      setActivedClientIndex(index)
    })
  })

  const select: SourcesAction = useCallback(
    index => {
      updateAt(activedClientIndex, index)
    },
    [activedClientIndex, updateAt],
  )

  const remove: SourcesAction = useCallback(
    index => {
      ipc.npm.source.remove(client, index).then(() => {
        const old = get(client)

        set(client, r.remove(index, 1, old))
      })
    },
    [client, get, set],
  )

  const restore: ActionBarAction = useCallback(() => {
    ipc.npm.source
      .restore(client)
      .then(() => ipc.npm.source.get(client))
      .then((resp: Array<Source>) => set(client, resp))
  }, [client, set])

  const moveUp: SourcesAction = useCallback(
    index => {
      ipc.npm.source
        .moveUp(client, index)
        .then(() => ipc.npm.source.get(client))
        .then((resp: Array<Source>) => set(client, resp))
        .then(() => {
          if (index === currentSelectedIndex) {
            updateAt(activedClientIndex, currentSelectedIndex - 1)
          }
        })
    },
    [activedClientIndex, client, currentSelectedIndex, set, updateAt],
  )

  const add: SourcesAction = useCallback(
    index => {
      setNewSourceIndex(index)
      setAlertOpen(true)
    },
    [setAlertOpen],
  )

  const doAdd = useCallback(() => {
    if (ra.isFalsy(newSource.name)) {
      toaster.warning({ message: "sfdsfsd" })
      return
    }
    ipc.npm.source
      .add(client, newSourceIndex, newSource)
      .then(() => setAlertOpen(false))
      .then(() => ipc.npm.source.get(client))
      .then((resp: Array<Source>) => set(client, resp))
  }, [client, newSource, newSourceIndex, set, setAlertOpen])

  const moveDown: SourcesAction = useCallback(
    index => {
      moveUp(index + 1)
    },
    [moveUp],
  )

  useEffect(() => {
    storage.setItem(KEY, activedClientIndex)
  }, [activedClientIndex])

  if (initializing(lastClientIndex)) return null

  return (
    <Section>
      <Flex>
        <Box className={style.clientContainer}>
          <Clients
            clients={clients}
            current={activedClientIndex}
            onChange={setActivedClientIndex}
          />
        </Box>
        <Box>
          <ActionBar restore={restore} />
        </Box>
      </Flex>
      <Sources
        items={sources[clients[activedClientIndex]]}
        selectedIndex={currentSelectedIndex}
        select={select}
        remove={remove}
        moveUp={moveUp}
        add={add}
        moveDown={moveDown}
      />
      <Alert
        isOpen={alertOpen}
        onConfirm={doAdd}
        onCancel={() => setAlertOpen(false)}
      >
        <FormGroup label="Name">
          <InputGroup
            value={newSource.name}
            onChange={(e: any) => set2("name", e.target.value)}
          />
        </FormGroup>
        <FormGroup label="URL">
          <InputGroup
            value={newSource.src}
            onChange={(e: any) => set2("src", e.target.value)}
          />
        </FormGroup>
      </Alert>
    </Section>
  )
}

function initializing(lastClientIndex: number) {
  return lastClientIndex === -1
}
