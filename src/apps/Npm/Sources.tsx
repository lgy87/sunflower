import { Button, ButtonGroup } from "@blueprintjs/core"
import React, { FC, memo, useCallback } from "react"
import style from "./style.module.css"

type Source = {
  name: string
  src: string
}
type Props = {
  items: Array<Source>
}
const Sources: FC<Props> = ({ items }) => {
  const isFirst = useCallback((index: number) => index === 0, [])
  const isLast = useCallback((index: number) => index === items.length - 1, [
    items.length,
  ])

  return (
    <ul className={style.sources}>
      {items.map((source, index) => (
        <li key={source.src} className={style.item}>
          <span className={style.indicator}></span>
          <span className={style.name}>{source.name}</span>
          <span className={style.src}>{source.src}</span>
          <ButtonGroup>
            <Button icon="arrow-up" disabled={isFirst(index)} />
            <Button icon="arrow-down" disabled={isLast(index)} />
            <Button icon="plus" />
            <Button icon="trash" />
            <Button icon="edit" />
          </ButtonGroup>
        </li>
      ))}
    </ul>
  )
}

export default memo(Sources)
