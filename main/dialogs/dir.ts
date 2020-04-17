import { dialog } from "electron"

export async function get() {
  return await dialog.showOpenDialog({
    properties: ["openDirectory"],
  })
}
