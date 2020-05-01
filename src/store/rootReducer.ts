import { connectRouter } from "connected-react-router"
import { History } from "history"
import { combineReducers } from "redux"
import devtool from "~/apps/Devtool/reducers"

export default function createRootReducer(history: History<any>) {
  return combineReducers({
    router: connectRouter(history),
    devtool,
  })
}
