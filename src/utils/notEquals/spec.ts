/*
 * Guangyao Li
 * 2019/08/31
 * lgy87@foxmail.com
 */
import notEqual from "./index"

describe("notEqual", () => {
  it("支持(不)相等性(对象通过深比较判断相等)", () => {
    const equals = [
      [0, 0],
      [NaN, NaN],
      ["foo", "foo"],
      [true, true],
      [false, false],
      [{ foo: "foo" }, { foo: "foo" }],
    ]

    const notEquals = [
      [0, 1],
      ["foo", "bar"],
      [true, false],
      [false, true],
      [{ foo: "foo" }, { bar: "bar" }],
    ]

    equals.forEach(pair => expect(notEqual(...pair)).toBeFalsy())
    notEquals.forEach(pair => expect(notEqual(...pair)).toBeTruthy())
  })
})
