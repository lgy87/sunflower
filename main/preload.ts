const isDev = require("electron-is-dev")

// @ts-ignore
process.env.NODE_ENV = isDev ? "development" : "production"
