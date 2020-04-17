import * as ra from "ramda-adjunct"

/*
const keys = ["FOO", "BAR", "BAZ", "QUUX", "MOS"]
const dict = makeDict(keys)

=>

{
  FOO: "FOO",
  BAR: "BAR",
  BAZ: "BAZ",
  QUUX: "QUUX",
  MOS: "MOS",
}
*/

export default function makeDict(keys: Array<any>) {
  if (ra.isNotArray(keys)) {
    throw new Error("makeDict 只支持数组参数!")
  }

  return ra.renameKeys(keys as any, keys)
}
