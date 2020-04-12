/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs")
const path = require("path")
const r = require("ramda")

const resolve = r.curryN(2, path.resolve)

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const APP = fs.realpathSync(process.cwd())
const resolveApp = resolve(APP)
const packageJson = resolveApp("package.json")

module.exports = {
  APP,
  SRC: resolveApp("src"),
  DIST: resolveApp("dist"),
  TEST: resolveApp("test"),
  BUILD: resolveApp("build"),
  WEBPACK: resolveApp("webpack"),
  ASSETS: resolveApp("src/assets"),
  PUBLIC: resolveApp("public"),
  PLUGINS: resolveApp("plugins"),
  NODE_MODULES: resolveApp("node_modules"),
  // -----
  packageJson,
  dotenv: resolveApp(".env.json"),
  appHtml: resolveApp("public/index.html"),
  appIndex: resolveApp("src/index"),
  // -----
  resolveApp,
}
