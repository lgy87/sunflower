import {
  Button,
  InputGroup,
  Intent,
  Menu,
  MenuItem,
  Popover,
  Position,
  TextArea,
} from "@blueprintjs/core"
import React, { FC, memo } from "react"
import SplitPane from "react-split-pane"
import Section from "~/components/Section"
import "./style.css"

const RegExp: FC<{}> = props => {
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
          />
          <TextArea
            style={{ width: "100%", marginTop: 8 }}
            rows={10}
            growVertically={true}
            large={true}
            intent={Intent.PRIMARY}
            // value={text}
            // onChange={(e: any) => setText(e.target.value)}
          />
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

export default memo(RegExp)

const style = {
  padding: 0,
  height: "calc(100% - 2px)",
  marginBottom: 0,
}
