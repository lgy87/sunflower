import { routerMiddleware } from "connected-react-router"
import { createBrowserHistory } from "history"
import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import middlewares from "./middlewares"
import createRootReducer from "./rootReducer"
import { RootState } from "./types"

const composeEnhancers = composeWithDevTools({})

export const history = createBrowserHistory()

export default function configureStore(preloadedState: RootState) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeEnhancers(
      applyMiddleware(routerMiddleware(history), ...middlewares),
    ),
  )

  return store
}
