import React, { useState } from "react"
import { useEffectOnce, useList } from "react-use"
import { Box, Flex } from "reflexbox"
import Section from "~/components/Section"
import ipc from "~/utils/ipc"
import ActionBar from "./ActionBar"
import Clients, { ClientValue } from "./Clients"
import Sources from "./Sources"
import "./style.css"
import style from "./style.module.css"

type Source = {
  name: string
  src: string
}
type Sources = Array<Source>
type Index = number

type IndexUpdateHandler = (index: number) => void
type TableRowsProps = {
  items: Sources
  activedIndex: Index
  onActivedIndexChange: IndexUpdateHandler
}
type TableRowProps = Source & {
  selected: boolean
  index: number
  count: number
  onClick: IndexUpdateHandler
}

const clients = ["npm", "yarn"] as Array<ClientValue>
export default function Npm() {
  const [sources, { set }] = useList<Source>([])
  const [activedClient, setActivedClient] = useState<ClientValue>("npm")
  // const [activedIndex, setActivedIndex] = useState(-1)

  useEffectOnce(() => {
    ipc.npm.source.defaults().then((x: any) => {
      console.log(x)
      set(x)
    })
  })

  // const handleActivedIndexChange: IndexUpdateHandler = useCallback(index => {
  //   setActivedIndex(index)
  // }, [])
  console.log(Flex, Box)
  return (
    <Section>
      <Flex>
        <Box className={style.clientContainer}>
          <Clients
            clients={clients}
            activedClient={activedClient}
            onChange={setActivedClient}
          />
        </Box>
        <Box>
          <ActionBar />
        </Box>
      </Flex>
      <Sources items={sources} />
    </Section>
  )
}
