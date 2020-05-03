import { Tag } from "@blueprintjs/core"
import React, { FC, memo, useEffect, useState } from "react"
import Section from "~/components/Section"
import ipc from "~/utils/ipc"
import style from "./style.module.css"

const Modules: FC<{}> = props => {
  const [modules, setModules] = useState([])

  useEffect(() => {
    ipc.devtool.modules
      .getSubModules("/usr/local/lib/node_modules")
      .then(setModules)
      .catch(console.error)
  }, [])

  console.log(setModules)
  return (
    <Section>
      <h1>modules</h1>
      {modules.map(m => (
        <Tag
          key={m}
          className={style.tag}
          round
          large
          interactive
          intent="primary"
          minimal
          onRemove={() => {}}
        >
          {m}
        </Tag>
      ))}
    </Section>
  )
}

export default memo(Modules)
