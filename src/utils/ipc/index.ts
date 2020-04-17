import { ipcRenderer } from "electron"
import uuid from "~/utils/uuid"

export default new Proxy({}, { get: ipcGet })

type AnyObject = Record<string, any>

const FROM_RENDERER = "FROM_RENDERER__"

function ipcGet(ipcObject: AnyObject, domain: string) {
  if (ipcObject[domain]) return ipcObject[domain]

  return (ipcObject[domain] = new Proxy({}, { get: topicGet }))

  function topicGet(domainObject: AnyObject, topic: string) {
    if (domainObject[topic]) return domainObject[topic]

    return (domainObject[topic] = new Proxy({}, { get: fnGet }))

    function fnGet(topicObject: AnyObject, fn: string) {
      topicObject[fn] = (...args: Array<any>) =>
        new Promise(resolve => {
          const uid = uuid()

          ipcRenderer
            .once(uid, (_, resp) => resolve(resp))
            .send(FROM_RENDERER, `${domain}/${topic}#${fn}`, uid, ...args)
        })

      return topicObject[fn]
    }
  }
}
