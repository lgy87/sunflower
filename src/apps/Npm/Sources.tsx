import { Button, ButtonGroup } from "@blueprintjs/core"
import cx from "classnames"
import React, { FC, memo, useCallback } from "react"
import Popconfirm from "~/components/Popconfirm"
import style from "./style.module.css"

export type Source = {
  name: string
  src: string
}
export type Action = Fn<number, void>

type Props = {
  items: Array<Source>
  selectedIndex: number
  select: Action
  remove: Action
  moveUp: Action
  moveDown: Action
  add: Action
}

const Sources: FC<Props> = ({
  items = [],
  selectedIndex,
  select,
  remove,
  moveUp,
  moveDown,
  add,
}) => {
  const isFirst = useCallback((index: number) => index === 0, [])
  const isLast = useCallback((index: number) => index === items.length - 1, [
    items.length,
  ])

  const getLiClassName = useCallback(
    index => cx(style.item, selectedIndex === index && style.selected),
    [selectedIndex],
  )

  return (
    <ul className={style.sources}>
      {items.map((source, index) => (
        <li
          key={source.src}
          className={getLiClassName(index)}
          onClick={() => select(index)}
        >
          <span className={style.indicator}></span>
          <span className={style.name}>{source.name}</span>
          <span className={style.src}>{source.src}</span>
          <ButtonGroup>
            <Button
              icon="arrow-up"
              disabled={isFirst(index)}
              onClick={() => moveUp(index)}
            />
            <Button
              icon="arrow-down"
              disabled={isLast(index)}
              onClick={() => moveDown(index)}
            />
            <Button icon="plus" onClick={() => add(index)} />
            <Popconfirm
              title="确认删除？"
              cancelButtonText="先不删了"
              confirmButtonText="删除!"
              onConfirm={() => remove(index)}
            >
              <Button icon="trash" />
            </Popconfirm>
            <Button icon="edit" />
          </ButtonGroup>
        </li>
      ))}
    </ul>
  )
}

export default memo(Sources)
