import { Button, InputGroup, Intent, TextArea } from "@blueprintjs/core"
import React, { FC, memo, useState } from "react"

const Selector: FC<void> = props => {
  const [re, setRe] = useState("(?<=300)400")
  const [text] = useState("232400 300400 300400 232400".replace(/ /g, "\n"))

  const x = () => {
    const temp = new RegExp(re, "g")
    console.log(temp)
    console.log(temp.exec(text))
  }

  return (
    <>
      <InputGroup value={re} onChange={(e: any) => setRe(e.target.value)} />
      <Button onClick={x}>Match</Button>
      <br />
      <TextArea
        rows={8}
        growVertically={true}
        large={true}
        intent={Intent.PRIMARY}
        value={text}
      />
    </>
  )
}

export default memo(Selector)
