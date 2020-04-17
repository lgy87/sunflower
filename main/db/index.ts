import configs from "../configs"
const level = require("level")

export default level(`./${configs.appName}`, { valueEncoding: "json" })
