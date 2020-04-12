const cp = require("child_process")
const util = require("util")

const pickStdoutAndTrim = require("./pickStdoutAndTrim")
const exec = util.promisify(cp.exec)

module.exports = async function (command) {
  try {
    return pickStdoutAndTrim(await exec(command))
  } catch (e) {
    return Promise.reject(e.message)
  }
}
