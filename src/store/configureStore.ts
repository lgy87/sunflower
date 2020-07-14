import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import mode from "~/utils/mode"
import middlewares from "./middlewares"
import rootReducer from "./rootReducer"

export default function configureStore(preloadedState: any) {
  const middlewareEnhancer = applyMiddleware(...middlewares)
  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(rootReducer, preloadedState, composedEnhancers)

  const mod = module as any
  if (mode.isNotProd && mod.hot) {
    mod.hot.accept("./reducers", () => store.replaceReducer(rootReducer))
  }

  return store
}
