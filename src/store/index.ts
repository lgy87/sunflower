import { createBrowserHistory } from "history"
import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import middlewares from "./middlewares"
import rootReducer from "./rootReducer"

const composeEnhancers = composeWithDevTools({})

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares)),
)

export const history = createBrowserHistory()

// compose enhancers
const enhancer = composeEnhancers(applyMiddleware(...middlewares))

// rehydrate state on app start
const initialState = {}

// create store
const store = createStore(rootReducer(history), initialState, enhancer)
