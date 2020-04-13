import db from "@main/db"

console.log(db)

const DEFAULT_CACHE_DIR = "~/.sunflower"
console.log(DEFAULT_CACHE_DIR)

async function cache() {
  try {
    const settings = await db.get("cache")

    if (settings.x) {
      console.log(settings)
    }
  } catch (e) {
    console.log(e)
  }
}

export default cache
