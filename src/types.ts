import { Dispatch, SetStateAction } from "react"

export type HooksType<T> = [T, Dispatch<SetStateAction<T>>]
export type Size = number | string
