import { factory, Device } from "./index"

describe("device", () => {
  describe("web", () => {
    let device: Device

    beforeAll(() => {
      const ua =
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:68.0) Gecko/20100101 Firefox/68.0"
      device = factory(ua)
    })

    it("能够在web中正确检测状态", () => {
      expect(device.isWeb).toBeTruthy()
      expect(device.isAndroid).toBeFalsy()
      expect(device.isIPhone).toBeFalsy()
      expect(device.isIPad).toBeFalsy()
      expect(device.isNotWeb).toBeFalsy()
      expect(device.isNotAndroid).toBeTruthy()
      expect(device.isNotIPhone).toBeTruthy()
      expect(device.isNotIPad).toBeTruthy()
    })
  })

  describe("android", () => {
    let device: Device

    beforeAll(() => {
      const ua =
        "Mozilla/5.0 (Linux; Android 4.4.4; SAMSUNG-SM-N900A Build/tt) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/33.0.0.0 Mobile Safari/537.36"
      device = factory(ua)
    })

    it("能够在android中正确检测状态", () => {
      expect(device.isWeb).toBeFalsy()
      expect(device.isAndroid).toBeTruthy()
      expect(device.isIPhone).toBeFalsy()
      expect(device.isIPad).toBeFalsy()
      expect(device.isNotWeb).toBeTruthy()
      expect(device.isNotAndroid).toBeFalsy()
      expect(device.isNotIPhone).toBeTruthy()
      expect(device.isNotIPad).toBeTruthy()
    })
  })

  describe("iPhone", () => {
    let device: Device

    beforeAll(() => {
      const ua =
        "Mozilla/5.0 (iPhone 6s; CPU iPhone OS 11_4_1 like Mac OS X) AppleWebKit/604.3.5 (KHTML, like Gecko) Version/11.0 MQQBrowser/8.3.0 Mobile/15B87 Safari/604.1 MttCustomUA/2 QBWebViewType/1 WKType/1"
      device = factory(ua)
    })

    it("能够在iPhone中正确检测状态", () => {
      expect(device.isWeb).toBeFalsy()
      expect(device.isAndroid).toBeFalsy()
      expect(device.isIPhone).toBeTruthy()
      expect(device.isIPad).toBeFalsy()
      expect(device.isNotWeb).toBeTruthy()
      expect(device.isNotAndroid).toBeTruthy()
      expect(device.isNotIPhone).toBeFalsy()
      expect(device.isNotIPad).toBeTruthy()
    })
  })

  describe("iPad", () => {
    let device: Device

    beforeAll(() => {
      const ua =
        "Mozilla/5.0 (iPad; CPU OS 8_0_2 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A405 Safari/600.1.4"
      device = factory(ua)
    })

    it("能够在iPad中正确检测状态", () => {
      expect(device.isWeb).toBeFalsy()
      expect(device.isAndroid).toBeFalsy()
      expect(device.isIPhone).toBeFalsy()
      expect(device.isIPad).toBeTruthy()
      expect(device.isNotWeb).toBeTruthy()
      expect(device.isNotAndroid).toBeTruthy()
      expect(device.isNotIPhone).toBeTruthy()
      expect(device.isNotIPad).toBeFalsy()
    })
  })
})
