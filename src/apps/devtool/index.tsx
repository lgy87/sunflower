import { Card, Elevation, FileInput } from "@blueprintjs/core"
import React from "react"
import { useToggle } from "react-use"
import Checkbox from "~/components/Checkbox"

// eslint-disable-next-line react/display-name
export default function Devtool() {
  return (
    <>
      <h1>oooo</h1>
      <Section>o1k</Section>
      <Cache />
    </>
  )
}

function Section(props: any) {
  return (
    <Card style={{ margin: "10px" }} elevation={Elevation.TWO}>
      {props.children}
    </Card>
  )
}

function Cache(props: any) {
  const [useCache, toggle] = useToggle(false)

  return (
    <Section>
      <Checkbox onChange={toggle} value={useCache}>
        是否使用缓存目录
      </Checkbox>
      <FileInput
        fill
        disabled={!useCache}
        buttonText="选择目录"
        text="Choose file..."
        onInputChange={() => {}}
      />
    </Section>
  )
}
