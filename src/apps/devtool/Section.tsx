import { Card, Elevation } from "@blueprintjs/core"
import React, { memo } from "react"

const style = {
  margin: 8,
  marginTop: 0,
}

function Section(props: any) {
  return (
    <Card style={style} elevation={Elevation.TWO}>
      {props.children}
    </Card>
  )
}

export default memo(Section)
