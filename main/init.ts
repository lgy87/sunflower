/*
 * Guangyao Li
 * 2020/04/13
 * lgy87@foxmail.com
 */
const { ipcMain } = require("electron")

ipcMain.on("ok", (a, b, c) => {
  console.log(a, b, c)
})
