const r = require("ramda")

module.exports = r.pipe(r.propOr("", "stdout"), r.trim)
