import { Intent, Spinner } from "@blueprintjs/core"
import React, { ComponentProps, FC, memo } from "react"

type Props = ComponentProps<typeof Spinner>

const Loading: FC<Props> = props => {
  return <Spinner intent={Intent.PRIMARY} size={50} {...props} />
}

export default memo(Loading)
