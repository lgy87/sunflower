import { Checkbox as BPCheckbox } from "@blueprintjs/core"
import React, { ComponentProps, FC, memo } from "react"

type BPCheckboxProps = ComponentProps<typeof BPCheckbox>

type Props = Omit<BPCheckboxProps, "checked" | "value"> & {
  value: BPCheckboxProps["checked"]
}

const Checkbox: FC<Props> = ({ value, ...restProps }) => {
  return <BPCheckbox {...restProps} checked={value} />
}

export default memo(Checkbox)
