import React, { lazy, Suspense } from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import Loading from "~/components/Loading"
import style from "./style.module.css"

const Devtool = lazy(() => import("./devtool"))
const YAOF = lazy(() => import("./YAOF"))

const loading = <Loading className={style.loading} />

export default function App() {
  return (
    <Suspense fallback={loading}>
      <Switch>
        <Route path="/devtool" component={Devtool} />
        <Route path="/yaof" component={YAOF} />
        <Redirect to="/devtool" />
      </Switch>
    </Suspense>
  )
}
