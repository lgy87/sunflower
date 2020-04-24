import React from "react"
import { useDispatch } from "react-redux"
import { useEffectOnce } from "react-use"
import ipc from "~/utils/ipc"
import { fetchSettings } from "./actions"
import Cache from "./Cache"
import Candidate from "./Candidate"
export default function Devtool() {
  const dispatch = useDispatch()

  useEffectOnce(() => {
    dispatch(fetchSettings.request(ipc.devtool.cache.get()))
  })

  return (
    <>
      <Cache />
      <Candidate />
    </>
  )
}
