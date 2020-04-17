import { createLogger } from "redux-logger"

export default createLogger({
  collapsed: true,
  diff: true,
  duration: true,
  timestamp: true,
  level: "log",
})
