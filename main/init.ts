/*
 * Guangyao Li
 * 2020/04/13
 * lgy87@foxmail.com
 */
import { ipcMain } from "electron"

const FROM_RENDERER = "FROM_RENDERER__"

ipcMain.on(FROM_RENDERER, (event: any, fnID: string, ...args: Array<any>) => {
  const [filename, fn] = fnID.split("#")
  const file = `./${filename}`
  const [uid, ...rest] = args

  try {
    import(file)
      .then(polyfillESMAndCommonJS)
      .then(topic => topic[fn](...rest))
      .then(resp => event.reply(uid, resp))
  } catch (e) {
    event.reply(uid, e)
  }
})

function polyfillESMAndCommonJS(imported) {
  return imported.default ? imported.default : imported
}
