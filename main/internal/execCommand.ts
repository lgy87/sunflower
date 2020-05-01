import { exec as exec_ } from "child_process"
import { promisify } from "util"
import pickStdoutAndTrim from "./pickStdoutAndTrim"

const exec = promisify(exec_)

export default async function (command: string) {
  try {
    return pickStdoutAndTrim(await exec(command))
  } catch (e) {
    return Promise.reject(e.message)
  }
}
