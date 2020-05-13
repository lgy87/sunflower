import { Button, ButtonGroup } from "@blueprintjs/core"
import cx from "classnames"
import * as ra from "ramda-adjunct"
import React, { FC, memo, useCallback, useMemo } from "react"
import Popconfirm from "~/components/Popconfirm"
import style from "./style.module.css"
import { ClientValue, Sources as SourcesType } from "./types"
import { Action, SelectedSources } from "./useSelectedSources"

type Props = {
  value: SourcesType
  client: ClientValue
  selectedSources: SelectedSources
  usingClient: string
  select: Action
  remove: Fn<ClientValue, number, void>
  // moveUp: Action
  // moveDown: Action
  // add: Action
}

const Sources: FC<Props> = ({
  value,
  client,
  selectedSources,
  usingClient,
  select,
  remove,
  // moveUp,
  // moveDown,
  // add,
}) => {
  const items = useMemo(() => value[client], [client, value]) || []

  const isFirst = useCallback((index: number) => index === 0, [])
  const isLast = useCallback((index: number) => index === items.length - 1, [
    items.length,
  ])

  const getLiClassName = useCallback(
    (name: string) => {
      return cx(style.item, {
        [style.selected]: selectedSources[client] === name,
        [style.using]: usingClient === name,
      })
    },
    [client, selectedSources, usingClient],
  )

  if (ra.lengthEq(0, items)) return null

  return (
    <ul className={style.sources}>
      {items.map((source, index) => (
        <li
          key={source.name}
          className={getLiClassName(source.name)}
          onClick={() => select(client, source.name)}
        >
          <span className={style.indicator}></span>
          <span className={style.name}>{source.name}</span>
          <span className={style.src}>{source.src}</span>
          <ButtonGroup>
            <Button
              icon="arrow-up"
              disabled={isFirst(index)}
              // onClick={() => moveUp(index)}
            />
            <Button
              icon="arrow-down"
              disabled={isLast(index)}
              // onClick={() => moveDown(index)}
            />
            <Button icon="plus" onClick={() => {}} />
            <Popconfirm
              title="确认删除？"
              cancelButtonText="先不删了"
              confirmButtonText="删除!"
              onConfirm={() => remove(client, index)}
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
