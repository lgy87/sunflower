import * as r from "ramda"
import db from "../db"

const DEFAULT_CACHE_DIR = "~/.sunflower"

export async function get() {
  try {
    return (await db.get("cache")) || defaults()
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
    old = await db.get("cache")
    return true
  } catch (e) {
    old = defaults()
  } finally {
    await db.put("cache", r.mergeRight(old, settings))
  }
}
