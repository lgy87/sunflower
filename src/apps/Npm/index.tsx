import React, { useCallback } from "react"
import { Box, Flex } from "reflexbox"
import Section from "~/components/Section"
import ipc from "~/utils/ipc"
import ActionBar, { Action as ActionBarAction } from "./ActionBar"
import ClientSwitcher from "./ClientSwitcher"
import Sources from "./Sources"
import "./style.css"
import style from "./style.module.css"
import type { ClientValue } from "./types"
import useClient from "./useClient"
import useSelectedSources from "./useSelectedSources"
import useSourceList from "./useSourceList"
import useUsingSource from "./useUsingSource"

const clients = ["npm", "yarn"] as Array<ClientValue>

export default function Npm() {
  const [client, setClient] = useClient("npm")
  const [sources, { remove }] = useSourceList()
  const [selectedSources, select] = useSelectedSources()
  const [using] = useUsingSource(client)

  // const [alertOpen, setAlertOpen] = useToggle(false)
  // const [newSource, { set: set2 }] = useMap({ name: "", src: "" })
  // const [newSourceIndex, setNewSourceIndex] = useState(-1)

  // const currentSelectedIndex = useMemo(
  //   () => selectedIndexes[activedClientIndex],
  //   [selectedIndexes],
  // )

  // const remove: SourcesAction = useCallback((client, index) => {
  //   ipc.npm.source.remove(client, index).then(() => {
  //     const old = get(client)
  //     set(client, r.remove(index, 1, old))
  //   })
  // }, [])

  const restore: ActionBarAction = useCallback(() => {
    ipc.npm.source.restore(client).then(() => ipc.npm.source.get(client))
    // .then((resp: Array<Source>) => set(client, resp))
  }, [client])

  // const moveUp: SourcesAction = useCallback(
  //   index => {
  //     ipc.npm.source
  //       .moveUp(client, index)
  //       .then(() => ipc.npm.source.get(client))
  //       // .then((resp: Array<Source>) => set(client, resp))
  //       .then(() => {
  //         // if (index === currentSelectedIndex) {
  //         //   updateAt(activedClientIndex, currentSelectedIndex - 1)
  //         // }
  //       })
  //   },
  //   [client],
  // )

  // const add1: SourcesAction = useCallback(
  //   index => {
  //     setNewSourceIndex(index)
  //     setAlertOpen(true)
  //   },
  //   [setAlertOpen],
  // )

  // const moveDown: SourcesAction = useCallback(
  //   index => {
  //     moveUp(index + 1)
  //   },
  //   [moveUp],
  // )

  // if (initializing(lastClientIndex)) return null

  return (
    <Section>
      <Flex>
        <Box className={style.clientContainer}>
          <ClientSwitcher
            clients={clients}
            current={client}
            onChange={setClient}
          />
        </Box>
        <Box>
          <ActionBar restore={restore} />
        </Box>
      </Flex>
      <Sources
        value={sources}
        client={client}
        usingClient={using}
        selectedSources={selectedSources}
        select={select}
        remove={remove}
        // moveUp={moveUp}
        // add={add}
        // moveDown={moveDown}
      />
      {/* <Alert
        isOpen={alertOpen}
        onConfirm={doAdd}
        canOutsideClickCancel
        onCancel={() => setAlertOpen(false)}
        cancelButtonText="先不添加了"
        confirmButtonText="添加"
        canEscapeKeyCancel
        transitionDuration={200}
        intent={Intent.PRIMARY}
        style={{ width: "100%" }}
        className={style.cl}
      >
        <FormGroup label="Name">
          <InputGroup
            fill
            data-field="ooo"
            // value={newSource.name}
            // onChange={(e: any) => set2("name", e.target.value)}
          />
        </FormGroup>
        <FormGroup label="URL">
          <InputGroup
            fill
            // value={newSource.src}
            // onChange={(e: any) => set2("src", e.target.value)}
          />
        </FormGroup>
      </Alert> */}
    </Section>
  )
}

// function initializing(lastClientIndex: number) {
//   return lastClientIndex === -1
// }
