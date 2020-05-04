import { Button, ButtonGroup } from "@blueprintjs/core"
import React, { FC, memo } from "react"

export type ClientValue = "npm" | "yarn"
export type ClientChangeHandler = (value: ClientValue) => void
type ClientsProps = {
  clients: Array<ClientValue>
  onChange: ClientChangeHandler
  activedClient: ClientValue
}
const Clients: FC<ClientsProps> = ({ clients, onChange, activedClient }) => {
  return (
    <ButtonGroup>
      {clients.map(client => (
        <Button
          key={client}
          onClick={() => onChange(client)}
          active={client === activedClient}
        >
          {client}
        </Button>
      ))}
    </ButtonGroup>
  )
}

export default memo(Clients)
