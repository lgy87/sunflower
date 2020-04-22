import devtool from "@/devtool/reducers"
import { connectRouter } from "connected-react-router"
import { History } from "history"
import { combineReducers } from "redux"

export default function createRootReducer(history: History<any>) {
  return combineReducers({
    router: connectRouter(history),
    devtool,
  })
}
