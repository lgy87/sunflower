import { Button, ButtonGroup } from "@blueprintjs/core"
import React, { FC, memo, MouseEvent, useCallback } from "react"
import type { ClientValue } from "./types"

export type ClientChangeHandler = Fn<ClientValue, void>
type ClientsProps = {
  clients: Array<ClientValue>
  onChange: ClientChangeHandler
  current: ClientValue
}

const ClientSwitcher: FC<ClientsProps> = ({ clients, onChange, current }) => {
  const handleChange: MouseEvent<HTMLElement> = useCallback(
    newClient => {
      const client = newClient.target.textContent
      onChange(client)
    },
    [onChange],
  )
  return (
    <ButtonGroup>
      {clients.map(client => (
        <Button key={client} onClick={handleChange} active={client === current}>
          {client}
        </Button>
      ))}
    </ButtonGroup>
  )
}

export default memo(ClientSwitcher)
