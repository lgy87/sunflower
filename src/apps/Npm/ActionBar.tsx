import { Button, ButtonGroup } from "@blueprintjs/core"
import React, { memo } from "react"
import Popconfirm from "~/components/Popconfirm"

const ActionBar = (props: any) => {
  return (
    <ButtonGroup>
      <Button icon="refresh" text="Restore" />
      <Button icon="plus" text="Add" onClick={props.addSource} />
      {/* <Button icon="edit" text="Edit" /> */}
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

export default memo(ActionBar)
