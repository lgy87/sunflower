import * as r from "ramda"
import * as ra from "ramda-adjunct"
import db from "../db"

type Dir = string

const KEY = "candidate"

export async function get() {
  try {
    return (await db.get(KEY)) || []
  } catch (e) {
    return []
  }
}

export async function set(dirs: Array<Dir>) {
  try {
    db.put(KEY, dirs)
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
    set(candidate)
    return true
  } catch (e) {
    return e
  }
}

export async function append(dir: Dir) {
  if (ra.isFalsy(dir)) return true

  try {
    const candidate = await get()
    set([...candidate, dir])
    return true
  } catch (e) {
    return e
  }
}
