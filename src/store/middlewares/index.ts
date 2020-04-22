import { Middleware } from "redux"
import mode from "~/utils/mode"
import logger from "./logger"
import patchPromiseMiddleware from "./patchPromiseMiddleware"
import promise from "./promise"

const middlewares: Array<Middleware> = [promise, patchPromiseMiddleware]

if (mode.isNotProd) middlewares.push(logger)

export default middlewares
