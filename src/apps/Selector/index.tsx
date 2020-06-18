import {
  Button,
  IPopoverProps,
  Menu,
  MenuItem,
  PopoverPosition,
} from "@blueprintjs/core"
import { ItemListRenderer, ItemRenderer, Select } from "@blueprintjs/select"
import * as ra from "ramda-adjunct"
import React, { FC, memo, useCallback } from "react"
import { useLocation, useNavigate } from "react-router"
import storage from "~/utils/storage"
import { App, apps } from "./configs"
import style from "./style.module.css"

const AppSelect = Select.ofType<App>()

const popoverProps: IPopoverProps = {
  minimal: true,
  position: PopoverPosition.TOP_RIGHT,
}

const Selector: FC<{}> = props => {
  const location = useLocation()
  const navigate = useNavigate()

  const switchApp = useCallback(
    async (item: App) => {
      navigate(item.path)
      await storage.setItem("LAST_APP_PATH", item.path)
    },
    [navigate],
  )
  if (ra.lengthLte(1, apps)) return null

  const hit =
    apps.find(app => app.path.startsWith(location.pathname.slice(1))) || apps[0]

  return (
    <AppSelect
      className={style.selector}
      filterable={apps.length > 8}
      popoverProps={popoverProps}
      items={apps}
      itemListRenderer={renderMenu}
      onItemSelect={switchApp}
      itemRenderer={renderItem}
    >
      <Button className={style.button} small text={hit.title} />
    </AppSelect>
  )
}

export default memo(Selector)

const renderItem: ItemRenderer<App> = (item, { handleClick }) => {
  return (
    <MenuItem
      key={item.path}
      shouldDismissPopover
      text={item.title}
      onClick={handleClick}
    ></MenuItem>
  )
}

const renderMenu: ItemListRenderer<App> = ({ items, renderItem }) => {
  return <Menu>{items.map(renderItem)}</Menu>
}
