import { Card, Elevation } from "@blueprintjs/core"
import React, { createRef, memo } from "react"

const style = {
  margin: 8,
  marginTop: 0,
}

function Section(props: any) {
  const ref = createRef<any>()
  // const hovering = useHoverDirty(ref)
  const hovering = true
  return (
    <Card
      ref={ref}
      style={style}
      elevation={hovering ? Elevation.ONE : Elevation.ONE}
    >
      {props.children}
    </Card>
  )
}

export default memo(Section)
