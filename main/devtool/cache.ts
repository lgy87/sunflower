import * as r from "ramda"
import db from "../db"

const DEFAULT_CACHE_DIR = "~/.sunflower"
const KEY = "cache"

export async function get() {
  try {
    return (await db.get(KEY)) || defaults()
  } catch (e) {
    return defaults()
  }
}

export async function defaults() {
  return {
    cached: false,
    dir: DEFAULT_CACHE_DIR,
  }
}

export async function set(settings) {
  let old

  try {
    old = await db.get(KEY)
    return true
  } catch (e) {
    old = defaults()
  } finally {
    await db.put(KEY, r.mergeRight(old, settings))
  }
}
