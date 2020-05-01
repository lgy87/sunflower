import getSubDirsIn from "../internal/getSubDirsIn"

export async function getSubModules(parent: string) {
  return getSubDirsIn(parent)
}
