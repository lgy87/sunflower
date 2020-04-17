import { ActionType, StateType } from "typesafe-actions"

export type RootAction = ActionType<typeof import("./rootAction").default>
export type RootReducer = ReturnType<typeof import("./rootReducer").default>
export type Store = StateType<typeof import("./index").default>

declare module "MyTypes" {
  export type Store = Store
  export type RootAction = RootAction
  export type RootState = StateType<RootReducer>
}

declare module "typesafe-actions" {
  interface Types {
    RootAction: RootAction
  }
}
