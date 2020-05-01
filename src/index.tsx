import { ConnectedRouter } from "connected-react-router"
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import App from "~/apps"
import configureStore, { history } from "~/store/configureStore"
import "./init"
import { RootState } from "./store/types"

const store = configureStore({} as RootState)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root"),
)
