import { Card, Elevation } from "@blueprintjs/core"
import React, { CSSProperties, FC, memo, ReactNode, useMemo } from "react"
import { Size } from "~/types"

type Props = {
  height?: Size
  children?: ReactNode
  style?: CSSProperties
}

const Section: FC<Props> = ({ height, style, children }) => {
  const style_ = useMemo(
    () => ({
      margin: "1px",
      marginBottom: "8px",
      height,
      ...style,
    }),
    [height, style],
  )

  return (
    <Card style={style_} elevation={Elevation.ONE}>
      {children}
    </Card>
  )
}

export default memo(Section)
