import { createPromise } from "redux-promise-middleware"

export default createPromise({
  promiseTypeDelimiter: "/",
  promiseTypeSuffixes: ["R", "S", "F"],
})
