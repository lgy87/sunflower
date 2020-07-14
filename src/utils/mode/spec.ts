import { factory, Mode, modes } from "./index"

describe("mode", () => {
  describe("production", () => {
    let mode: Mode

    beforeAll(() => {
      const process = ({
        env: {
          NODE_ENV: modes.prod,
        },
      } as unknown) as NodeJS.Process

      mode = factory(process)
    })

    it("能够获取当前的所处的 mode 环境", async () => {
      expect(mode.current).toBe(modes.prod)
    })
    it("能够判断当前是否处于设置的环境", () => {
      expect(mode.isProd).toBeTruthy()
      expect(mode.isDev).toBeFalsy()
      expect(mode.isTest).toBeFalsy()
      expect(mode.isNotProd).toBeFalsy()
      expect(mode.isNotDev).toBeTruthy()
      expect(mode.isNotTest).toBeTruthy()
    })
  })

  describe("development", () => {
    let mode: Mode

    beforeAll(() => {
      const process = ({
        env: {
          NODE_ENV: modes.dev,
        },
      } as unknown) as NodeJS.Process
      mode = factory(process)
    })

    it("能够获取当前的所处的 mode 环境", () => {
      expect(mode.current).toBe(modes.dev)
    })

    it("能够判断当前是否处于设置的环境", () => {
      expect(mode.isProd).toBeFalsy()
      expect(mode.isDev).toBeTruthy()
      expect(mode.isTest).toBeFalsy()
      expect(mode.isNotProd).toBeTruthy()
      expect(mode.isNotDev).toBeFalsy()
      expect(mode.isNotTest).toBeTruthy()
    })
  })

  describe("test", () => {
    let mode: Mode

    beforeAll(() => {
      const process = ({
        env: {
          NODE_ENV: modes.test,
        },
      } as unknown) as NodeJS.Process
      mode = factory(process)
    })

    it("能够获取当前的所处的 mode 环境", () => {
      expect(mode.current).toBe(modes.test)
    })

    it("能够判断当前是否处于设置的环境", () => {
      expect(mode.isProd).toBeFalsy()
      expect(mode.isDev).toBeFalsy()
      expect(mode.isTest).toBeTruthy()
      expect(mode.isNotProd).toBeTruthy()
      expect(mode.isNotDev).toBeTruthy()
      expect(mode.isNotTest).toBeFalsy()
    })
  })
})
