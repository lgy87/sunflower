import { Popover } from "@blueprintjs/core"
import React, { ComponentProps, FC, memo, ReactNode, useMemo } from "react"
import Content from "./Content"

type ContentProps = ComponentProps<typeof Content> & {
  children: ReactNode
}

const Component: FC<ContentProps> = ({ children, ...restProps }) => {
  const content = useMemo(() => <Content {...restProps} />, [restProps])

  return (
    <Popover autoFocus minimal canEscapeKeyClose content={content}>
      {children}
    </Popover>
  )
}

export default memo(Component)
