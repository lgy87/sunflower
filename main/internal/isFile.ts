import { statSync } from "fs"
import * as ra from "ramda-adjunct"

export default async function (path) {
  try {
    if (ra.isTruthy(path)) {
      return await statSync(path).isFile()
    }
    throw new Error("路径不能为空！")
  } catch (e) {
    return Promise.reject(e.message)
  }
}
