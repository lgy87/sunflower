import { routerMiddleware as createRouterMiddleware } from "connected-react-router"
import { createBrowserHistory } from "history"
import { RootAction, RootState, Services } from "MyTypes"
import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import services from "../services"
import middlewares from "./middlewares"
import rootReducer from "./rootReducer"
import { composeEnhancers } from "./utils"

const composeEnhancers = composeWithDevTools({})

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares)),
)

// browser history
export const history = createBrowserHistory()

export const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState,
  Services
>({
  dependencies: services,
})

const routerMiddleware = createRouterMiddleware(history)

// configure middlewares
const middlewares = [epicMiddleware, routerMiddleware]
// compose enhancers
const enhancer = composeEnhancers(applyMiddleware(...middlewares))

// rehydrate state on app start
const initialState = {}

// create store
const store = createStore(rootReducer(history), initialState, enhancer)

epicMiddleware.run(rootEpic)

// export store singleton instance
export default store
