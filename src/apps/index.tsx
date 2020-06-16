import * as ra from "ramda-adjunct"
import React, { lazy, useState } from "react"
import { hot } from "react-hot-loader"
import { Redirect, Route, Switch } from "react-router-dom"
import { useEffectOnce } from "react-use"
import Suspense from "~/components/Suspense"
import storage from "~/utils/storage"

const Devtool = lazy(() => import("./Devtool"))
const YAOF = lazy(() => import("./YAOF"))
const Selector = lazy(() => import("./Selector"))
const Npm = lazy(() => import("./Npm"))
const RegExp = lazy(() => import("./RegExp"))

function App() {
  const [lastAppPath, setLastAppPath] = useState("")

  useEffectOnce(() => {
    storage
      .getItem<string>("LAST_APP_PATH")
      .then(lastAppPath => setLastAppPath(lastAppPath || "/devtool"))
  })

  if (ra.isFalsy(lastAppPath)) return null

  return (
    <Suspense>
      <Switch>
        <Route path="/devtool" component={Devtool} />
        <Route path="/yaof" component={YAOF} />
        <Route path="/npm" component={Npm} />
        <Route path="/regexp" component={RegExp} />
        <Redirect to={lastAppPath} />
      </Switch>
      <Route component={Selector} />
    </Suspense>
  )
}

export default hot(module)(App)
