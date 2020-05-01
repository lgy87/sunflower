import { Colors, HTMLTable } from "@blueprintjs/core"
import React, { FC, useState } from "react"
import { useEffectOnce, useList } from "react-use"
import ipc from "~/utils/ipc"

type Source = {
  name: string
  src: string
}

type IndexUpdateHandler = (index: number) => void
type TableRowProps = Source & {
  selected: boolean
  index: number
  onClick: (index: number) => void
}

export default function Npm() {
  const [sources, setSources] = useList<Source>([])
  const [activeIndex, setActive] = useState([-1])

  useEffectOnce(() => {
    ipc.npm.source.defaults().then(setSources)
  })

  return (
    <HTMLTable bordered interactive css={style}>
      <tbody>
        <TableRows
          items={sources}
          activeIndex={activeIndex}
          selectedIndex={selectedIndexes[activeClientIndex]}
          updateSelectedIndexes={updateSelectedIndexes}
        />
      </tbody>
    </HTMLTable>
  )
}

type TableRowsProps = Array<Source> & {}
const TableRows = props => {
  return props.items.map((row, index) => (
    <TableRow
      updateSelectedIndexes={props.updateSelectedIndexes}
      selected={props.selectedIndex === index}
      active={index === props.activeIndex}
      index={index}
      key={index}
      {...row}
    />
  ))
}

type TableRowProps = Source & {
  selected: boolean
  index: number
  onClick: (index: number) => void
}
const TableRow: FC<TableRowProps> = ({
  index,
  name,
  src,
  onClick,
  selected,
}) => {
  return (
    <tr onClick={() => onClick(index)} style={selected ? selectedStyle : {}}>
      <td style={starStyle}>{selected && "*"} </td>
      <td>{name}</td>
      <td>{src}</td>
    </tr>
  )
}

const style = {
  border: "1px solid " + Colors.LIGHT_GRAY2,
  borderTop: 0,
  marginTop: 10,
}

const switchStyle = {
  marginRight: 10,
}

const starStyle = {
  color: Colors.RED2 + "!important",
}

const selectedStyle = {
  backgroundColor: Colors.LIGHT_GRAY4,
}
