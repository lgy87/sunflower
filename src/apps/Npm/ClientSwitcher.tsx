import { Button, ButtonGroup } from "@blueprintjs/core"
import React, { FC, memo, ReactEventHandler, useCallback } from "react"
import type { ClientValue } from "./types"

export type ClientChangeHandler = Fn<ClientValue, void>
type ClientsProps = {
  clients: Array<ClientValue>
  onChange: ClientChangeHandler
  current: ClientValue
}

const ClientSwitcher: FC<ClientsProps> = ({ clients, onChange, current }) => {
  const handleChange: ReactEventHandler<HTMLElement> = useCallback(
    ({ target }) => {
      onChange((target as HTMLButtonElement).innerText as ClientValue)
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
