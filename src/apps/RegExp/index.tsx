import {
  Button,
  Classes,
  InputGroup,
  Menu,
  MenuItem,
  Popover,
  Position,
} from "@blueprintjs/core"
import cx from "classnames"
import React, { FC, memo, useState } from "react"
import SplitPane from "react-split-pane"
import Section from "~/components/Section"
import "./style.css"

const RegExp_: FC<{}> = props => {
  const [regexp, setRegexp] = useState("")
  const [src, setSrc] = useState("")
  console.log(setSrc)

  return (
    <Section style={style}>
      <SplitPane primary="first" size="50%" minSize="50%">
        <div style={{ padding: 8 }}>
          <InputGroup
            // disabled={disabled}
            // large={large}
            placeholder="insert your regular expression here"
            rightElement={permissionsMenu}
            // small={small}
            value={regexp}
            onChange={(e: any) => {
              setRegexp(e.target.value)
              const re = new RegExp(e.target.value, "g")
              console.log(src.matchAll(re))
            }}
          />
          <div
            contentEditable
            suppressContentEditableWarning
            style={{ marginTop: 8, height: "calc(100vh - 88px)" }}
            className={cx(Classes.INPUT)}
            onInput={e => setSrc((e.target as any).textContent)}
          >
            {src}
          </div>
        </div>
        <SplitPane split="horizontal">
          <div>safsd</div>
          <div>safsd</div>
        </SplitPane>
      </SplitPane>
    </Section>
  )
}

const permissionsMenu = (
  <Popover
    content={
      <Menu>
        <MenuItem
          text={
            <span>
              <strong>g</strong>lobal
            </span>
          }
        ></MenuItem>
        <MenuItem text="gimuy" />
        <MenuItem
          text={
            <span>
              stick<strong>y</strong>
            </span>
          }
        ></MenuItem>
      </Menu>
    }
    // disabled={disabled}
    minimal
    position={Position.BOTTOM_RIGHT}
  >
    <Button minimal={true} rightIcon="flag" />
  </Popover>
)

export default memo(RegExp_)

const style = {
  padding: 0,
  height: "calc(100% - 2px)",
  marginBottom: 0,
}
