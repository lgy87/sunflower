import level from "level"

const instance = level("devtool")

export default function (key: string) {
  return async function () {
    instance.get(key)
  }
}
