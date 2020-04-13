import { ipcRenderer } from "electron"
import React from "react"
import "../init"
import Devtool from "./devtool"

ipcRenderer.on("FROM_MAIN", (...args) => console.log(args))
ipcRenderer.send("FROM_RENDERER", "devtool", 1, 2, 9)

export default function App() {
  return <Devtool />
}
