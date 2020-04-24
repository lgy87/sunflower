import { ConnectedRouter } from "connected-react-router"
import React, { StrictMode } from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import App from "~/apps"
import configureStore, { history } from "~/store/configureStore"
import "./init"
import { RootState } from "./store/types"

const store = configureStore({} as RootState)

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </StrictMode>,
  document.getElementById("root"),
)
