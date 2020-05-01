import React, { lazy } from "react"
import { useDispatch } from "react-redux"
import { useEffectOnce } from "react-use"
import Suspense from "~/components/Suspense"
import ipc from "~/utils/ipc"
import { fetchSettings } from "./actions"

const Cache = lazy(() => import("./Cache"))
const Candidate = lazy(() => import("./Candidate"))
const Modules = lazy(() => import("./Modules"))

export default function Devtool() {
  const dispatch = useDispatch()

  useEffectOnce(() => {
    dispatch(fetchSettings.request(ipc.devtool.cache.get()))
  })

  return (
    <Suspense>
      <Cache />
      <Candidate />
      <Modules />
    </Suspense>
  )
}
