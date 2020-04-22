require("module-alias/register")
require("./init")

const { app, BrowserWindow, globalShortcut } = require("electron")
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) app.quit()

const r = require("ramda")
const ra = require("ramda-adjunct")
const isDev = require("electron-is-dev")
const paths = require("../webpack/paths")
const isDarwinEnv = r.propEq("platform", "darwin")(process)
const { default: installExtension } = require("electron-devtools-installer")

let mainWindow: any

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true"

app.allowRendererProcessReuse = true
app.whenReady().then(init)
app.on("window-all-closed", () => isDarwinEnv && quit())
app.on("activate", () => ra.isNull(mainWindow) && init())

/*
 * In this file you can include the rest of your app's specific main process
 * code. You can also put them in separate files and require them here.
 */
function init() {
  createWindow()
  loadWebPage()
  openDevtools()
  register()
  installReduxExtensionToElectron()
}

function quit() {
  globalShortcut.unregisterAll()
  app.quit()
}

function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + "/preload.js",
    },
    width: 800,
    height: 400,
    titleBarStyle: "hidden",
  })

  mainWindow.on("closed", () => (mainWindow = null))
}

function loadWebPage() {
  const url = isDev
    ? "http://localhost:5555/"
    : `file://${paths.DIST}/index.html`

  mainWindow.loadURL(url)
}

function openDevtools() {
  // mainWindow.webContents.on("did-frame-finish-load", () => {
  //   if (isDev) {
  //     mainWindow.webContents.openDevTools({
  //       // mode: "detach",
  //     })
  //   }
  // })
}

function register() {
  const ret = globalShortcut.register("CommandOrControl+Q", quit)

  if (!ret) console.log("registration failed")
}

function installReduxExtensionToElectron() {
  installExtension("lmhkpmbekcpmknklioeibfkpmmfibljd")
    .then((name: string) => console.log(`Added Extension: ${name}`))
    .catch((e: Error) => console.log(`An error occurred: ${e}`))
}

export {}
