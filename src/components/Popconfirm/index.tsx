import { Popover } from "@blueprintjs/core"
import React, { ComponentProps, FC, memo, ReactNode } from "react"
import Content from "./Content"

type ContentProps = ComponentProps<typeof Content> & {
  children: ReactNode
}

const Component: FC<ContentProps> = ({ children, ...rest }) => {
  return (
    <Popover minimal content={<Content {...rest} />}>
      {children}
    </Popover>
  )
}

export default memo(Component)
