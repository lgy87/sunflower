import React, { StrictMode } from "react"
import ReactDOM from "react-dom"
import App from "~/renderer"

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root"),
)
