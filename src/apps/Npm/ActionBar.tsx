import { Button, ButtonGroup, Intent } from "@blueprintjs/core"
import React, { FC, memo } from "react"
import Popconfirm from "~/components/Popconfirm"

export type Action = Fn<void>

type Props = {
  restore: Action
}

const ActionBar: FC<Props> = ({ restore }) => {
  return (
    <ButtonGroup>
      <Popconfirm
        title="确认恢复？"
        cancelButtonText="先不恢复"
        confirmButtonText="恢复!"
        onConfirm={restore}
        confirmButtonIntent={Intent.SUCCESS}
      >
        <Button icon="refresh" text="Restore" />
      </Popconfirm>
      <Button icon="arrow-up" text="Move Up" onClick={() => {}} />
      <Button icon="arrow-down" text="Move Down" onClick={() => {}} />
      <Button icon="plus" text="Add" onClick={() => {}} />
      <Button
        icon="selection"
        text="Use"
        // onClick={props.updateActiveSourceIndex}
      />
    </ButtonGroup>
  )
}

export default memo(ActionBar)
