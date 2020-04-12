const r = require("ramda")
const ra = require("ramda-adjunct")
const fs = require("fs")

const paths = require("./paths")

const eqByString = r.eqBy(String)

const { env } = process
const shouldUseSourceMap = eqByString(env.GENERATE_SOURCEMAP, false)
const isHttps = eqByString(env.HTTPS, true)

const { HOST } = env
const host = HOST || "0.0.0.0"

const useYarn = fs.existsSync(paths.yarnLockFile)
const port = parseInt(env.PORT, 10) || 3000
const protocol = env.HTTPS === "true" ? "https" : "http"

const initEnv = function (env) {
  process.env.NODE_PATH = paths.SRC

  process.env.BABEL_ENV = env
  process.env.NODE_ENV = env
}

const stringifyValues = r.mapObjIndexed(JSON.stringify)

function ensureSlash(path, needsSlash) {
  const pathWithoutLastSlash = removeLastSlash(path)

  if (needsSlash) return ra.concatRight("/", pathWithoutLastSlash)
  return pathWithoutLastSlash
}

const removeLastSlash = r.dropLastWhile(r.equals("/"))

const moduleFileExtensions = [".js", ".ts", ".tsx", ".mjs", ".json"]

const readConfigFile = function (file) {
  return JSON.parse(fs.readFileSync(file, { encoding: "utf-8" }))
}
module.exports = {
  shouldUseSourceMap,
  isHttps,
  initEnv,
  readConfigFile,
  eqByString,
  host,
  useYarn,
  port,
  protocol,
  ensureSlash,
  stringifyValues,
  moduleFileExtensions,
}
