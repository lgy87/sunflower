import * as r from "ramda"
import * as ra from "ramda-adjunct"

export enum devices {
  web = "web",
  android = "android",
  iPhone = "iPhone",
  iPad = "iPad",
}

export type Device = Readonly<{
  isWeb: boolean
  isAndroid: boolean
  isIPhone: boolean
  isIPad: boolean
  isNotWeb: boolean
  isNotAndroid: boolean
  isNotIPhone: boolean
  isNotIPad: boolean
}>

export function factory(ua: string): Device {
  const test = (device: string) => new RegExp(device, "i").test(ua)

  const isAndroid = test(devices.android)
  const isIPhone = test(devices.iPhone)
  const isIPad = test(devices.iPad)
  const isWeb = r.all(ra.isFalse, [isAndroid, isIPhone, isIPad])

  return {
    isWeb,
    isAndroid,
    isIPhone,
    isIPad,
    isNotWeb: r.not(isWeb),
    isNotAndroid: r.not(isAndroid),
    isNotIPhone: r.not(isIPhone),
    isNotIPad: r.not(isIPad),
  }
}

export default factory(window.navigator.userAgent)
