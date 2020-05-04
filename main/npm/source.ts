import * as r from "ramda"
import db from "../db"

type Source = {
  name: string
  src: string
}
type ClientSources = Record<"npm" | "yarn", Array<Source>>

const NPM_KEY = "npm.source"
const YARN_KEY = "yarn.source"

export function defaults(): Array<Source> {
  return [
    { name: "npm", src: "https://registry.npmjs.org/" },
    { name: "yarn", src: "https://registry.yarnpkg.com/" },
    { name: "cnpm", src: "http://r.cnpmjs.org/" },
    { name: "taobao", src: "https://registry.npm.taobao.org/" },
    { name: "nj", src: "https://registry.nodejitsu.com/" },
    { name: "npmMirror", src: "https://skimdb.npmjs.com/registry/" },
    { name: "edunpm", src: "http://registry.enpmjs.org/" },
  ]
}
async function source(key): Promise<Array<Source>> {
  try {
    return await db.get(key)
  } catch (e) {
    await db.put(key, defaults())
    return defaults()
  }
}

export async function all(): Promise<ClientSources> {
  const npm = await source(NPM_KEY)
  const yarn = await source(YARN_KEY)

  return {
    npm,
    yarn,
  }
}
export async function remove(client: string, index: number) {
  const key = buildKey(client)
  const items = await source(key)

  await db.put(key, r.remove(index, 1, items))
  return true
}

function buildKey(client: string): string {
  return `${client.toLowerCase()}.source`
}
