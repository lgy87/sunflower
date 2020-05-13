import * as fs from "fs"
import * as path from "path"
import * as r from "ramda"
import * as ra from "ramda-adjunct"
import { promisify } from "util"
import db from "../db"
import isFile from "../internal/isFile"

const readFile = promisify(fs.readFile)

type Source = {
  name: string
  src: string
}
type ClientSources = Record<"npm" | "yarn", Array<Source>>

function buildKey(client: string): string {
  return `${client.toLowerCase()}.source`
}

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
export async function get(client: string): Promise<Array<Source>> {
  try {
    const key = buildKey(client)
    return await db.get(key)
  } catch (e) {
    await set(client, defaults())
    return defaults()
  }
}

export async function set(client: string, value: Array<Source>) {
  try {
    const key = buildKey(client)
    await db.put(key, value)
    return true
  } catch (e) {
    return e
  }
}

export async function all(): Promise<ClientSources> {
  const npm = await get("npm")
  const yarn = await get("yarn")

  return {
    npm,
    yarn,
  }
}

export async function remove(client: string, index: number) {
  const items = await get(client)

  await set(client, r.remove(index, 1, items))
  return true
}

export async function restore(client: string) {
  await set(client, defaults())
  return true
}

export async function moveUp(client: string, index: number) {
  if (ra.isNilOrEmpty(index)) return true
  if (index === 0) return true

  try {
    const items = await get(client)
    const target = items.splice(index, 1)[0]
    items.splice(index - 1, 0, target)
    await set(client, items)
    return true
  } catch (e) {
    return e
  }
}

export async function moveDown(client: string, index: number) {
  return moveUp(client, index + 1)
}

export async function add(client: string, index: number, source: Source) {
  try {
    const items = await get(client)
    items.splice(index, 0, source)

    await set(client, items)
    return items
  } catch (e) {
    return e
  }
}

export async function using(client: string) {
  const filename = path.resolve(
    `${process.env.HOME}${path.sep}.${client.toLowerCase()}rc`,
  )
  const isAFile = await isFile(filename)

  if (r.not(isAFile)) return null

  const fileContent = await readFile(filename, { encoding: "utf-8" })
  const re = /^registry[ =]"?(https:\/\/[^"/]+)/m
  const matched = re.exec(fileContent)

  if (r.isNil(matched)) return null

  const [, src] = matched

  const sourceList = await get(client)
  const hit = sourceList.find(item => item.src.startsWith(src))

  if (r.isNil(hit)) return null

  return hit.name
}
