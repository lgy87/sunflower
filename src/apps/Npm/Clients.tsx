import { Button, ButtonGroup } from "@blueprintjs/core"
import React, { FC, memo } from "react"

export type ClientValue = "npm" | "yarn"
export type ClientChangeHandler = Fn<number, void>
type ClientsProps = {
  clients: Array<ClientValue>
  onChange: ClientChangeHandler
  current: number
}

const Clients: FC<ClientsProps> = ({ clients, onChange, current }) => {
  return (
    <ButtonGroup>
      {clients.map((client, index) => (
        <Button
          key={client}
          onClick={() => onChange(index)}
          active={index === current}
        >
          {client}
        </Button>
      ))}
    </ButtonGroup>
  )
}

export default memo(Clients)
