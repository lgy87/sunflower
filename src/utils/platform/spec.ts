import { factory, Platform } from "./index"

describe("platform", () => {
  describe("web", () => {
    let platform: Platform

    beforeAll(() => {
      const ua =
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:68.0) Gecko/20100101 Firefox/68.0"
      platform = factory(ua)
    })

    it("在web中，各个平台应该都为false", () => {
      const expected = {
        sunflower: false,
        wechat: false,
        chanjet: false,
        qiandaola: false,
        qq: false,
        wechatMiniProgram: false,
      }

      expect(platform).toEqual(expected)
    })
  })

  describe("sunflower", () => {
    let platform: Platform

    beforeAll(() => {
      const ua =
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:68.0) Gecko/20100101 Firefox/68.0 sunflower"
      platform = factory(ua)
    })

    it("能正常判断sunflower平台", () => {
      const expected = {
        sunflower: true,
        wechat: false,
        chanjet: false,
        qiandaola: false,
        qq: false,
        wechatMiniProgram: false,
      }

      expect(platform).toEqual(expected)
    })
  })

  describe("chanjet", () => {
    let platform: Platform

    beforeAll(() => {
      const ua =
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:68.0) Gecko/20100101 Firefox/68.0 Chanjet"
      platform = factory(ua)
    })

    it("能正常判断chanjet平台", () => {
      const expected = {
        sunflower: false,
        wechat: false,
        chanjet: true,
        qiandaola: false,
        qq: false,
        wechatMiniProgram: false,
      }

      expect(platform).toEqual(expected)
    })
  })

  describe("qiandaola", () => {
    let platform: Platform

    beforeAll(() => {
      const ua =
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:68.0) Gecko/20100101 Firefox/68.0 qiandaola"
      platform = factory(ua)
    })

    it("能正常判断chanjet平台", () => {
      const expected = {
        sunflower: false,
        wechat: false,
        chanjet: false,
        qiandaola: true,
        qq: false,
        wechatMiniProgram: false,
      }

      expect(platform).toEqual(expected)
    })
  })
  describe("qq", () => {
    let platform: Platform

    beforeAll(() => {
      const ua =
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:68.0) Gecko/20100101 Firefox/68.0 qq"
      platform = factory(ua)
    })

    it("能正常判断chanjet平台", () => {
      const expected = {
        sunflower: false,
        wechat: false,
        chanjet: false,
        qiandaola: false,
        qq: true,
        wechatMiniProgram: false,
      }

      expect(platform).toEqual(expected)
    })
  })
  describe("MicroMessenger", () => {
    let platform: Platform

    beforeAll(() => {
      const ua =
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:68.0) Gecko/20100101 Firefox/68.0 MicroMessenger"
      platform = factory(ua)
    })

    it("能正常判断微信平台", () => {
      const expected = {
        sunflower: false,
        wechat: true,
        chanjet: false,
        qiandaola: false,
        qq: false,
        wechatMiniProgram: false,
      }

      expect(platform).toEqual(expected)
    })
  })

  describe("miniProgram", () => {
    let platform: Platform

    beforeAll(() => {
      const ua =
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:68.0) Gecko/20100101 Firefox/68.0 MicroMessenger miniProgram"
      platform = factory(ua)
    })

    it("能正常判断小程序平台: 当处于微信小程序中时，微信和小程序都应该为true", () => {
      const expected = {
        sunflower: false,
        wechat: true,
        chanjet: false,
        qiandaola: false,
        qq: false,
        wechatMiniProgram: true,
      }

      expect(platform).toEqual(expected)
    })
  })
})
