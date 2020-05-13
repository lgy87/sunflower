export type ClientValue = "npm" | "yarn"
export type SourceItem = {
  name: string
  src: string
}
export type SourceList = Array<SourceItem>
export type Sources = Record<ClientValue, SourceList>
