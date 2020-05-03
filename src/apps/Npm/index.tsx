import { Button, ButtonGroup, HTMLTable } from "@blueprintjs/core"
import cx from "classnames"
import React, { FC, useCallback, useMemo, useState } from "react"
import { useEffectOnce, useList } from "react-use"
import { Box, Flex } from "reflexbox"
import Popconfirm from "~/components/Popconfirm"
import Section from "~/components/Section"
import ipc from "~/utils/ipc"
import Clients from "./Clients"
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

const clients = ["npm", "yarn"] as Array<ClientValues>
export default function Npm() {
  const [sources, { set }] = useList<Source>([])
  const [activedClient, setActivedClient] = useState<ClientValues>("npm")
  const [activedIndex, setActivedIndex] = useState(-1)

  useEffectOnce(() => {
    ipc.npm.source.defaults().then((x: any) => {
      console.log(x)
      set(x)
    })
  })

  const handleActivedIndexChange: IndexUpdateHandler = useCallback(index => {
    setActivedIndex(index)
  }, [])
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

      <HTMLTable className={style.table} data-id="npm">
        <TableRows
          items={sources}
          activedIndex={activedIndex}
          onActivedIndexChange={handleActivedIndexChange}
        />
      </HTMLTable>
    </Section>
  )
}
const ActionBar = (props: any) => {
  return (
    <ButtonGroup>
      <Button icon="refresh" text="Restore" />
      <Button icon="plus" text="Add" onClick={props.addSource} />
      <Button icon="edit" text="Edit" />
      <Popconfirm
        title="确认删除？"
        cancelButtonText="先不删了"
        confirmButtonText="删除!"
        onConfirm={props.removeSource}
      >
        <Button icon="trash" text="Remove" />
      </Popconfirm>
      <Button
        icon="selection"
        text="Select"
        onClick={props.updateActiveSourceIndex}
      />
    </ButtonGroup>
  )
}
const TableRows: FC<TableRowsProps> = ({
  items,
  activedIndex,
  onActivedIndexChange,
}) => {
  return (
    <tbody>
      {items.map((row, index) => (
        <TableRow
          key={index}
          index={index}
          count={items.length}
          onClick={onActivedIndexChange}
          selected={activedIndex === index}
          {...row}
        />
      ))}
    </tbody>
  )
}

const TableRow: FC<TableRowProps> = ({
  index,
  count,
  name,
  src,
  onClick,
  selected,
}) => {
  const className = useMemo(() => cx({ [style.selected]: selected }), [
    selected,
  ])

  const first = useMemo(() => index === 0, [index])
  const last = useMemo(() => index === count - 1, [count, index])

  return (
    <tr onDoubleClick={() => onClick(index)} className={className}>
      <td className={style.name}>{name}</td>
      <td className={style.src}>{src}</td>
      <td className={style.actions}>
        <ButtonGroup>
          <Button
            icon="arrow-up"
            disabled={first}
            onClick={() => moveUp(index)}
          />
          <Button
            icon="arrow-down"
            disabled={last}
            onClick={() => moveDown!(index)}
          />
          <Button icon="trash" onClick={() => remove!(index)} />
          <Button icon="edit" onClick={() => edit!(index)} />
        </ButtonGroup>
      </td>
    </tr>
  )
}
