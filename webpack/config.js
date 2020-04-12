const { SRC } = require("./paths")

module.exports.alias = {
  "~": SRC,
  "@apps": "~/renderer/apps",
  "react-dom": "@hot-loader/react-dom",
}
