import { ActionType, StateType } from "typesafe-actions"

export type RootAction = ActionType<typeof import("./rootAction").default>
export type RootReducer = ReturnType<typeof import("./rootReducer").default>
export type RootState = StateType<RootReducer>
export type Store = StateType<typeof import("./configureStore").default>

declare module "typesafe-actions" {
  interface Types {
    RootAction: RootAction
  }
}
