import localforage from "localforage"
import { name, driver } from "./config"

export default localforage.createInstance({
  name,
  driver,
})
