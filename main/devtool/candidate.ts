import * as r from "ramda"
import * as ra from "ramda-adjunct"
import db from "../db"

type Dir = string
type Dirs = Array<Dir>

const KEY = "candidate"

export async function get() {
  try {
    return (await db.get(KEY)) || []
  } catch (e) {
    return []
  }
}

export async function set(dirs: Dirs) {
  try {
    await db.put(KEY, dirs)
    return true
  } catch (e) {
    return e
  }
}

export async function edit(index: number, dir: Dir) {
  if (r.any(ra.isNilOrEmpty, [index, dir])) return false

  try {
    const candidate = await get()
    candidate[index] = dir
    await set(candidate)
    return true
  } catch (e) {
    return e
  }
}

export async function append(dirs: Dirs) {
  if (ra.lengthLte(0, dirs)) return true

  try {
    const candidate = await get()
    await set([...candidate, ...dirs])
    return true
  } catch (e) {
    return e
  }
}

export async function moveUp(index: number) {
  if (ra.isNilOrEmpty(index)) return true
  if (index === 0) return true

  try {
    const candidate = await get()
    const target = candidate.splice(index, 1)
    candidate.splice(index - 1, 0, target[0])
    await set(candidate)
    return true
  } catch (e) {
    return e
  }
}

export async function moveDown(index: number) {
  return moveUp(index + 1)
}

export async function remove(index: number) {
  if (ra.isNilOrEmpty(index)) return true

  try {
    const candidate = await get()

    if (index >= candidate.length) return true

    candidate.splice(index, 1)
    await set(candidate)
    return true
  } catch (e) {
    return e
  }
}
