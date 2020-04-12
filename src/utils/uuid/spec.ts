import uuid from "."

describe("uuid", () => {
  it("能够生成不重复的随机数，以当前时间开头", () => {
    const random = uuid()

    expect(random).toMatch(/^\d{14}_/)
  })
  it("能够指定前缀", () => {
    const random = uuid({ prefix: "lgy_" })
    expect(random).toMatch(/^lgy_\d{14}_/)
  })
  it("能够指定后缀", () => {
    const random = uuid({ suffix: "_lgy" })
    expect(random).toMatch(/^\d{14}_.+_lgy$/)
  })
  it("能够指定前缀和后缀", () => {
    const random = uuid({ prefix: "lgy_", suffix: "_lgy" })
    expect(random).toMatch(/^lgy_\d{14}_.+_lgy$/)
  })
})
