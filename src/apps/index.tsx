import * as ra from "ramda-adjunct"
import React, { lazy, useState } from "react"
import { hot } from "react-hot-loader"
import { Route, Routes } from "react-router-dom"
import Suspense from "~/components/Suspense"

const Devtool = lazy(() => import("./Devtool"))
const YAOF = lazy(() => import("./YAOF"))
const Selector = lazy(() => import("./Selector"))
const Npm = lazy(() => import("./Npm"))
const RegExp = lazy(() => import("./RegExp"))

function App() {
  const [lastAppPath /*setLastAppPath*/] = useState("")

  // useEffectOnce(() => {
  //   storage
  //     .getItem<string>("LAST_APP_PATH")
  //     .then(lastAppPath => setLastAppPath(lastAppPath || "/devtool"))
  // })

  if (ra.isFalsy(lastAppPath)) return null

  return (
    <Suspense>
      <Routes>
        <Route path="/devtool" element={<Devtool />} />
        <Route path="/yaof" element={<YAOF />} />
        <Route path="/npm" element={<Npm />} />
        <Route path="/regexp" element={<RegExp />} />
        {/* <Redirect to={lastAppPath} /> */}
      </Routes>
      <Route element={<Selector />} />
    </Suspense>
  )
}

export default hot(module)(App)
