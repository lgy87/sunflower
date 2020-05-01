import { dialog } from "electron"

export async function get(defaultPath?: string) {
  return await dialog.showOpenDialog({
    properties: ["openDirectory"],
    defaultPath,
  })
}
