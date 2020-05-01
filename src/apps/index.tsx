import React, { lazy } from "react"
import { hot } from "react-hot-loader"
import { Redirect, Route, Switch } from "react-router-dom"
import Suspense from "~/components/Suspense"

const Devtool = lazy(() => import("./Devtool"))
const YAOF = lazy(() => import("./YAOF"))
const Selector = lazy(() => import("./Selector"))
const Npm = lazy(() => import("./Npm"))

function App() {
  return (
    <Suspense>
      <Switch>
        <Route path="/devtool" component={Devtool} />
        <Route path="/yaof" component={YAOF} />
        <Route path="/npm" component={Npm} />
        <Redirect to="/devtool" />
      </Switch>
      <Route component={Selector} />
    </Suspense>
  )
}

export default hot(module)(App)
