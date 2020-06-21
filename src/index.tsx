import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import App from "~/apps"
import configureStore from "~/store/configureStore"
import "./init"
import { RootState } from "./store/types"

const store = configureStore({} as RootState)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root"),
)
