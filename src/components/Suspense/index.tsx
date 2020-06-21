import React, {
  ComponentProps,
  FC,
  memo,
  ReactNode,
  Suspense as ReactSuspense,
} from "react"
import { Overwrite } from "utility-types"
import Loading from "~/components/Loading"
import style from "./style.module.css"

type ReactSuspenseProps = ComponentProps<typeof ReactSuspense>
type Fallback = Partial<Pick<ReactSuspenseProps, "fallback">>
type Props = Overwrite<ReactSuspenseProps, Fallback> & {
  children: ReactNode
}

const loading = <Loading className={style.loading} />

const Suspense: FC<Props> = ({ children }) => {
  return <ReactSuspense fallback={loading}>{children}</ReactSuspense>
}

export default memo(Suspense)
