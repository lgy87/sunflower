import * as r from "ramda"

export default r.pipe(r.propOr("", "stdout"), r.trim)
