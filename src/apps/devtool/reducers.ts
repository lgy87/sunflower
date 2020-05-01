import { createReducer, PayloadAction } from "typesafe-actions"
import { combineReducers } from "redux"
import { fetchSettings } from "./actions"

// const defaultSettings = {
//   cached: false,
//   dir: "",
// }

const initialState = {
  cached: true,
  dir: "",
  defaultDir: "",
  loading: false,
}

const settings = createReducer(initialState)
  .handleAction(fetchSettings.request, set({ loading: true }))
  .handleAction(fetchSettings.success, mergePayloadAndSet({ loading: false }))
  .handleAction(fetchSettings.failure, set({ loading: false }))

function set<T>(value: Partial<T>) {
  return function <S>(state: S): S {
    return {
      ...state,
      ...value,
    }
  }
}
function mergePayloadAndSet<T, U extends PayloadAction<any, any>>(
  additional?: Partial<T>,
) {
  return function <S>(state: S, action: U): S {
    return {
      ...state,
      ...action.payload,
      ...additional,
    }
  }
}

export default combineReducers({
  settings,
})
