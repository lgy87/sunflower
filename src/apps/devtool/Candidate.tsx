import { Button, ButtonGroup, Menu, MenuItem } from "@blueprintjs/core"
import * as r from "ramda"
import * as ra from "ramda-adjunct"
import React, { memo, useCallback, useEffect, useMemo } from "react"
import { useList } from "react-use"
import Section from "~/components/Section"
import ipc from "~/utils/ipc"
import toaster from "~/utils/toaster"
import style from "./style.module.css"

type Dir = string
type Dirs = Array<Dir>

type PickedDirectories = {
  canceled: boolean
  filePaths: Dirs
}

type Action = (index: number) => void

function Candidate(props: any) {
  const [candidate, { set, push, removeAt, insertAt, updateAt }] = useList(
    [] as Dirs,
  )
  const enough = useMemo(() => candidate.length === 3, [candidate.length])

  console.log(push)

  const fetchCandidate = useCallback(ipc.devtool.candidate.get, [])

  const pickDir = useCallback(async () => {
    try {
      const { canceled, filePaths } = (await ipc.dialogs.dir.get()) || {}
      if (ra.isTrue(canceled)) return

      if (contains(filePaths, candidate)) {
        toaster.primary({ message: "选择的路径已存在!" })
        return
      }

      await ipc.devtool.candidate.append(filePaths)
      push(...filePaths)
    } catch (e) {
      console.error(e.message)
      toaster.error({ message: "选择路径失败!" })
    }
  }, [candidate, push])

  useEffect(() => {
    fetchCandidate().then((dirs: Dirs) => {
      set(dirs)
    })
  }, [fetchCandidate, set])

  const moveUp: Action = useCallback(
    async index => {
      await ipc.devtool.candidate.moveUp(index)
      const target = candidate[index]
      removeAt(index)
      insertAt(index - 1, target)
    },
    [candidate, insertAt, removeAt],
  )

  const moveDown: Action = useCallback(
    async index => {
      await ipc.devtool.candidate.moveDown(index)
      moveUp(index + 1)
    },
    [moveUp],
  )

  const remove: Action = useCallback(
    async index => {
      await ipc.devtool.candidate.remove(index)
      removeAt(index)
    },
    [removeAt],
  )

  const edit: Action = useCallback(
    async index => {
      try {
        const target = candidate[index]
        const { canceled, filePaths } =
          (await ipc.dialogs.dir.get(target)) || {}
        if (ra.isTrue(canceled)) return

        if (contains(filePaths, candidate)) {
          toaster.primary({ message: "选择的路径已存在!" })
          return
        }

        const [newPath] = filePaths
        await ipc.devtool.candidate.edit(index, newPath)
        updateAt(index, newPath)
      } catch (e) {
        console.error(e.message)
        toaster.error({ message: "选择路径失败!" })
      }
    },
    [candidate, updateAt],
  )

  return (
    <Section>
      <span className={style.subtitle}>默认读取路径</span>
      <Menu className={style.menu}>
        {candidate.map((dir, index) => (
          <MenuItem
            className={style.menuItem}
            key={index}
            text={dir}
            textClassName={style.menuItemText}
            labelElement={
              <Actions
                count={candidate.length}
                index={index}
                moveUp={moveUp}
                moveDown={moveDown}
                edit={edit}
                remove={remove}
              />
            }
          />
        ))}
      </Menu>
      <Button
        icon={enough ? false : "add"}
        fill
        onClick={pickDir}
        disabled={enough}
      >
        {enough ? "最多只能添加3个路径哦" : "添加"}
      </Button>
    </Section>
  )
}

export default memo(Candidate)

type ActionsProps = {
  index: number
  count: number
  moveUp: Action
  moveDown: Action
  remove: Action
  edit: Action
}
function Actions({
  index,
  count,
  moveUp,
  moveDown,
  remove,
  edit,
}: ActionsProps) {
  const first = useMemo(() => index === 0, [index])
  const last = useMemo(() => index === count - 1, [count, index])

  return (
    <ButtonGroup>
      <Button icon="arrow-up" disabled={first} onClick={() => moveUp(index)} />
      <Button
        icon="arrow-down"
        disabled={last}
        onClick={() => moveDown!(index)}
      />
      <Button icon="trash" onClick={() => remove!(index)} />
      <Button icon="edit" onClick={() => edit!(index)} />
    </ButtonGroup>
  )
}

function contains(target: Dirs, all: Dirs): boolean {
  return r.intersection(target, all).length === target.length
}
