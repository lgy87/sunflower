const { SRC, resolveApp } = require("./paths")

module.exports.alias = {
  "~": SRC,
  "@main": resolveApp("main"),
  "@": `${SRC}/apps`,
  "react-dom": "@hot-loader/react-dom",
  "react-redux":
    process.env.NODE_ENV === "development" ? "react-redux/lib" : "react-redux",
}
