type __Fn0<R> = () => R
type __Fn1<A1, R> = (a1: A1) => R
type __Fn2<A1, A2, R> = (a1: A1, a2: A2) => R
type __Fn3<A1, A2, A3, R> = (a1: A1, a2: A2, a3: A3) => R
type __Fn4<A1, A2, A3, A4, R> = (a1: A1, a2: A2, a3: A3, a4: A4) => R
type __Fn5<A1, A2, A3, A4, A5, R> = (
  a1: A1,
  a2: A2,
  a3: A3,
  a4: A4,
  a5: A5,
) => R
type __Fn6<A1, A2, A3, A4, A5, A6, R> = (
  a1: A1,
  a2: A2,
  a3: A3,
  a4: A4,
  a5: A5,
  a6: A6,
) => R
type __Fn7<A1, A2, A3, A4, A5, A6, A7, R> = (
  a1: A1,
  a2: A2,
  a3: A3,
  a4: A4,
  a5: A5,
  a6: A6,
  a7: A7,
) => R
type __Fn8<A1, A2, A3, A4, A5, A6, A7, A8, R> = (
  a1: A1,
  a2: A2,
  a3: A3,
  a4: A4,
  a5: A5,
  a6: A6,
  a7: A7,
  a8: A8,
) => R
type __Fn9<A1, A2, A3, A4, A5, A6, A7, A8, A9, R> = (
  a1: A1,
  a2: A2,
  a3: A3,
  a4: A4,
  a5: A5,
  a6: A6,
  a7: A7,
  a8: A8,
  a9: A9,
) => R

type Fn<
  A = undefined,
  B = undefined,
  C = undefined,
  D = undefined,
  E = undefined,
  F = undefined,
  G = undefined,
  H = undefined,
  I = undefined,
  J = undefined
> = J extends undefined
  ? I extends undefined
    ? H extends undefined
      ? G extends undefined
        ? F extends undefined
          ? E extends undefined
            ? D extends undefined
              ? C extends undefined
                ? B extends undefined
                  ? __Fn0<A>
                  : __Fn1<A, B>
                : __Fn2<A, B, C>
              : __Fn3<A, B, C, D>
            : __Fn4<A, B, C, D, E>
          : __Fn5<A, B, C, D, E, F>
        : __Fn6<A, B, C, D, E, F, G>
      : __Fn7<A, B, C, D, E, F, G, H>
    : __Fn8<A, B, C, D, E, F, G, H, I>
  : __Fn9<A, B, C, D, E, F, G, H, I, J>
