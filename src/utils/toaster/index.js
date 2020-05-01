import { Position, Toaster } from "@blueprintjs/core"
import * as r from "ramda"

import config from "./config"

const toaster = Toaster.create({
  className: "recipe-toaster",
  position: Position.TOP,
})

const mapped = r.map(
  value => options =>
    toaster.show({
      ...options,
      ...value,
    }),
  config,
)

export default r.merge(toaster, mapped)
