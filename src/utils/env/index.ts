import * as r from "ramda"
import * as ra from "ramda-adjunct"

export const re = {
  dev: /\bdev-/i,
  preTest: /\bpre-test-/i,
  test: /(?<!-)test-/i,
  inte: /\binte-/i,
  online: / /i, // just a placeholder
}

export type Env = Readonly<{
  isDev: boolean
  isPreTest: boolean
  isTest: boolean
  isInte: boolean
  isOnline: boolean
  isNotDev: boolean
  isNotPreTest: boolean
  isNotTest: boolean
  isNotInte: boolean
  isNotOnline: boolean
}>

export function factory(url: string): Env {
  const test = (re: RegExp) => re.test(url)

  const isDev = test(re.dev)
  const isPreTest = test(re.preTest)
  const isTest = test(re.test)
  const isInte = test(re.inte)
  const isOnline = r.all(ra.isFalse, [isDev, isPreTest, isTest, isInte])

  return {
    isDev,
    isPreTest,
    isTest,
    isInte,
    isOnline,
    isNotDev: r.not(isDev),
    isNotPreTest: r.not(isPreTest),
    isNotTest: r.not(isTest),
    isNotInte: r.not(isInte),
    isNotOnline: r.not(isOnline),
  }
}

export default factory(window.location.href)
