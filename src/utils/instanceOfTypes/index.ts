/*
 * Guangyao Li
 * 2019/08/21
 * lgy87@foxmail.com
 */
const fn = function () {
  return "just-a-function"
}

export default [
  undefined,
  null,
  true,
  false,
  42,
  "just-a-string",
  Symbol("just-a-symbol"),
  { foo: "bar" },
  fn,
]
