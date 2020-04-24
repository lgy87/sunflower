import { FocusStyleManager } from "@blueprintjs/core"
import "@blueprintjs/core/lib/css/blueprint.css"
import React from "react"
import { setConfig } from "react-hot-loader"
import "~/styles/index.css"
import mode from "~/utils/mode"

FocusStyleManager.onlyShowFocusOnTabs()

if (mode.isNotProd) {
  const whyDidYouRender = require("@welldone-software/why-did-you-render")
  const ReactRedux = require("react-redux")

  whyDidYouRender(React, {
    logOnDifferentValues: true,
    collapseGroups: true,
    trackAllPureComponents: true,
    trackExtraHooks: [[ReactRedux, "useSelector"]],
  })
}

setConfig({
  ignoreSFC: true,
  pureRender: true,
})
