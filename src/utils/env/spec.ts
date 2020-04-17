import { factory, Env } from "./index"

describe("env", () => {
  describe("dev", () => {
    let env: Env

    beforeAll(() => {
      const url = "https://dev-a-cloud.my-domain.com?this-is-a-param=value"
      env = factory(url)
    })

    it("能够正确检测出dev环境", () => {
      expect(env.isDev).toBeTruthy()
      expect(env.isPreTest).toBeFalsy()
      expect(env.isTest).toBeFalsy()
      expect(env.isInte).toBeFalsy()
      expect(env.isOnline).toBeFalsy()
      expect(env.isNotDev).toBeFalsy()
      expect(env.isNotPreTest).toBeTruthy()
      expect(env.isNotTest).toBeTruthy()
      expect(env.isNotInte).toBeTruthy()
      expect(env.isNotOnline).toBeTruthy()
    })
  })

  describe("preTest", () => {
    let env: Env

    beforeEach(() => {
      const url = "https://pre-test-cloud.my-domain.com?this-is-a-param=value"
      env = factory(url)
    })

    it("能够正确检测出preTest环境", () => {
      expect(env.isDev).toBeFalsy()
      expect(env.isPreTest).toBeTruthy()
      expect(env.isTest).toBeFalsy()
      expect(env.isInte).toBeFalsy()
      expect(env.isOnline).toBeFalsy()
      expect(env.isNotDev).toBeTruthy()
      expect(env.isNotPreTest).toBeFalsy()
      expect(env.isNotTest).toBeTruthy()
      expect(env.isNotInte).toBeTruthy()
      expect(env.isNotOnline).toBeTruthy()
    })
  })

  describe("test", () => {
    let env: Env

    beforeEach(() => {
      const url = "https://test-cloud.my-domain.com?this-is-a-param=value"
      env = factory(url)
    })

    it("能够正确检测出test环境", () => {
      expect(env.isDev).toBeFalsy()
      expect(env.isPreTest).toBeFalsy()
      expect(env.isTest).toBeTruthy()
      expect(env.isInte).toBeFalsy()
      expect(env.isOnline).toBeFalsy()
      expect(env.isNotDev).toBeTruthy()
      expect(env.isNotPreTest).toBeTruthy()
      expect(env.isNotTest).toBeFalsy()
      expect(env.isNotInte).toBeTruthy()
      expect(env.isNotOnline).toBeTruthy()
    })
  })

  describe("inte", () => {
    let env: Env

    beforeEach(() => {
      const url = "https://inte-cloud.my-domain.com?this-is-a-param=value"
      env = factory(url)
    })

    it("能够正确检测出test环境", () => {
      expect(env.isDev).toBeFalsy()
      expect(env.isPreTest).toBeFalsy()
      expect(env.isTest).toBeFalsy()
      expect(env.isInte).toBeTruthy()
      expect(env.isOnline).toBeFalsy()
      expect(env.isNotDev).toBeTruthy()
      expect(env.isNotPreTest).toBeTruthy()
      expect(env.isNotTest).toBeTruthy()
      expect(env.isNotInte).toBeFalsy()
      expect(env.isNotOnline).toBeTruthy()
    })
  })

  describe("online", () => {
    let env: Env

    beforeEach(() => {
      const url = "https://cloud.my-domain.com?this-is-a-param=value"
      env = factory(url)
    })

    it("能够正确检测出online环境", () => {
      expect(env.isDev).toBeFalsy()
      expect(env.isPreTest).toBeFalsy()
      expect(env.isTest).toBeFalsy()
      expect(env.isInte).toBeFalsy()
      expect(env.isOnline).toBeTruthy()
      expect(env.isNotDev).toBeTruthy()
      expect(env.isNotPreTest).toBeTruthy()
      expect(env.isNotTest).toBeTruthy()
      expect(env.isNotInte).toBeTruthy()
      expect(env.isNotOnline).toBeFalsy()
    })
  })
})
