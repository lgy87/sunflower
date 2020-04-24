import { Button, ButtonGroup, Menu, MenuItem } from "@blueprintjs/core"
import React, { memo, useMemo } from "react"
import Section from "./Section"

type PickedDirectories = {
  canceled: boolean
  filePaths: Array<string>
}

function Candidate(props: any) {
  const dirs = ["c://abc/", "d://a/b/c/d/e/f/g/", "aaaaa", "ok"]

  return (
    <Section>
      <Menu>
        {dirs.map((dir, index) => (
          <MenuItem
            key={index}
            text={dir}
            labelElement={<Actions count={dirs.length} index={index} />}
          />
        ))}
      </Menu>
    </Section>
  )
}

export default memo(Candidate)

type Action = (index: number) => void
type ActionsProps = {
  index: number
  count: number
  onMoveUp: Action
}
function Actions({ index, count, onMoveUp }: ActionsProps) {
  const first = useMemo(() => index === 0, [index])
  const last = useMemo(() => index === count - 1, [count, index])

  return (
    <ButtonGroup>
      <Button icon="arrow-up" disabled={first} onClick={onMoveUp} />
      <Button icon="arrow-down" disabled={last} />
      <Button icon="trash" />
      <Button icon="edit" />
    </ButtonGroup>
  )
}
