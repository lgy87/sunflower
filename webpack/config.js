const { SRC, resolveApp } = require("./paths")

module.exports.alias = {
  "~": SRC,
  "@main": resolveApp("main"),
  "react-dom": "@hot-loader/react-dom",
}
