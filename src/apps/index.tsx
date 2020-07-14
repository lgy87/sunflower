// import * as ra from "ramda-adjunct"
import React, { lazy } from "react"
import { hot } from "react-hot-loader/root"
import { Navigate, Route, Routes } from "react-router-dom"
// import { useEffectOnce } from "react-use"
import Suspense from "~/components/Suspense"
// import storage from "~/utils/storage"

const Devtool = lazy(() => import("./Devtool"))
const YAOF = lazy(() => import("./YAOF"))
const Selector = lazy(() => import("./Selector"))
const Npm = lazy(() => import("./Npm"))
const RegExp = lazy(() => import("./RegExp"))

const defaultAppPath = "/devtool"
console.log(defaultAppPath)

function App() {
  // const [lastAppPath, setLastAppPath] = useState("")
  // useEffectOnce(() => {
  //   storage.getItem<string>("LAST_APP_PATH").then(lastAppPath => {
  //     setLastAppPath(lastAppPath || defaultAppPath)
  //   })
  // })

  // if (ra.isFalsy(lastAppPath)) return null

  return (
    <Suspense>
      <Routes>
        <Route path="/devtool" element={<Devtool />} />
        <Route path="/yaof" element={<YAOF />} />
        <Route path="/npm" element={<Npm />} />
        <Route path="/regexp" element={<RegExp />} />
        <Navigate to={"/devtool"} replace />
      </Routes>
      <Route element={<Selector />} />
    </Suspense>
  )
}

export default hot(App)
