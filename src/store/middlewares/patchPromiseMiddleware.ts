import { AnyAction, Dispatch } from "redux"

export default () => (next: Dispatch<AnyAction>) => (action: any) =>
  next({
    ...action,
    type: action.type
      .replace(/\/R\/R$/, "/R")
      .replace(/\/R\/S$/, "/S")
      .replace(/\/R\/F$/, "/F"),
  })
