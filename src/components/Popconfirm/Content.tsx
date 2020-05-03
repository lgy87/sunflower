import { Button, ButtonGroup, Classes, H5, Intent } from "@blueprintjs/core"
import cx from "classnames"
import * as ra from "ramda-adjunct"
import React, { FC, memo } from "react"
import style from "./style.module.css"

type CallbackHandler = () => void
type Props = {
  title: string
  cancelButtonText: string
  confirmButtonText: string
  onCancel?: CallbackHandler
  onConfirm: CallbackHandler
}

const Component: FC<Props> = ({
  title,
  cancelButtonText,
  confirmButtonText,
  onCancel,
  onConfirm,
}) => {
  const className = cx(style.button, Classes.POPOVER_DISMISS)
  return (
    <div className={style.content}>
      <H5>{title}</H5>
      <ButtonGroup>
        <Button className={className} onClick={onCancel || ra.noop}>
          {cancelButtonText}
        </Button>
        <Button
          className={Classes.POPOVER_DISMISS}
          intent={Intent.DANGER}
          onClick={onConfirm || ra.noop}
        >
          {confirmButtonText}
        </Button>
      </ButtonGroup>
    </div>
  )
}

export default memo(Component)
