/*
 * Guangyao Li
 * 2020/04/13
 * lgy87@foxmail.com
 */
import { ipcMain } from "electron"

const FROM_RENDERER = "FROM_RENDERER"
const FROM_MAIN = "FROM_MAIN"

ipcMain.on(
  FROM_RENDERER,
  (event: any, filename: string, ...args: Array<any>) => {
    const file = `./${filename}`

    try {
      import(file)
        .then(polyfillESMAndCommonJS)
        .then(fn => fn(...args))
        .then(resp => event.reply(FROM_MAIN, filename, resp))
    } catch (e) {
      event.reply(FROM_MAIN, filename, e)
    }
  },
)

function polyfillESMAndCommonJS(imported) {
  return imported.default ? imported.default : imported
}
