const platforms = {
  sunflower: /sunflower/i,
  wechat: /MicroMessenger/i,
  chanjet: /chanjet/i,
  qiandaola: /qiandaola/i,
  qq: /qq/i,
  wechatMiniProgram: /miniProgram/,
}

export type Platform = Readonly<{
  sunflower: boolean
  wechat: boolean
  chanjet: boolean
  qiandaola: boolean
  qq: boolean
  wechatMiniProgram: boolean
}>

export function factory(ua: string): Platform {
  const test = (re: RegExp) => re.test(ua)

  const sunflower = test(platforms.sunflower)
  const wechat = test(platforms.wechat)
  const chanjet = test(platforms.chanjet)
  const qiandaola = test(platforms.qiandaola)
  const qq = test(platforms.qq)
  const wechatMiniProgram =
    test(platforms.wechatMiniProgram) ||
    (window as any).__wxjs_environment === "miniprogram"

  return {
    sunflower,
    wechat,
    chanjet,
    qiandaola,
    qq,
    wechatMiniProgram,
  }
}

export default factory(window.navigator.userAgent)
