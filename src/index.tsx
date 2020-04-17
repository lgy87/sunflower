import React, { StrictMode } from "react"
import ReactDOM from "react-dom"
import App from "~/apps"
import "./init"

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root"),
)
