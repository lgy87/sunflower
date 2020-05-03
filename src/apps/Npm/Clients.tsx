import { Button, ButtonGroup } from "@blueprintjs/core"
import React, { FC, memo } from "react"

type ClientValues = "npm" | "yarn"
type ClientChangeHandler = (value: ClientValues) => void
type ClientsProps = {
  clients: Array<ClientValues>
  onChange: ClientChangeHandler
  activedClient: ClientValues
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
