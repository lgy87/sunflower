import { Button, ControlGroup, InputGroup, Toaster } from "@blueprintjs/core"
import * as r from "ramda"
import * as ra from "ramda-adjunct"
import React, { memo, useCallback, useEffect, useMemo, useState } from "react"
import { useUpdateEffect } from "react-use"
import Checkbox from "~/components/Checkbox"
import ipc from "~/utils/ipc"
import Section from "./Section"

const defaultSettings = {
  cached: false,
  dir: "",
}
type CacheSetting = typeof defaultSettings
type Dir = CacheSetting["dir"]

type PickedDirectories = {
  canceled: boolean
  filePaths: Array<string>
}

function Cache(props: any) {
  const [cache, setCache] = useState<CacheSetting>(defaultSettings)
  const [defaultDir, setDefaultDir] = useState("")

  const fetchDefaultsSettings = useCallback(() => {
    return ipc.devtool.cache.defaults()
  }, [])

  const fetchDefaultsDir = useCallback(
    () => fetchDefaultsSettings().then(r.prop("dir")),
    [fetchDefaultsSettings],
  )

  const pickDir = useCallback(() => {
    ipc.dialogs.dir.get().then((resp: PickedDirectories) => {
      if (ra.isTrue(resp.canceled)) return

      setCache(r.assoc("dir", resp.filePaths[0]))
    })
  }, [])

  useEffect(() => {
    ipc.devtool.cache.get().then((resp: CacheSetting) => {
      setCache(resp)
    })
  }, [setCache])

  useEffect(() => {
    fetchDefaultsDir().then((dir: Dir) => {
      setDefaultDir(dir)
    })
  })

  const handleCacheChange = useCallback(e => {
    const { checked: cached } = e.target

    setCache(r.assoc("cached", cached))
  }, [])

  const restoreDefaults = useCallback(() => {
    fetchDefaultsDir().then((dir: Dir) => {
      setCache(r.assoc("dir", dir))
    })
  }, [fetchDefaultsDir])

  useUpdateEffect(() => {
    console.log("i am cache, ", cache)
    ipc.devtool.cache
      .set(cache)
      .catch((e: any) => (Toaster as any).show(e.message))
  }, [cache, setCache])

  const restoreDefaultDisabled = useMemo(() => {
    if (!cache.cached) return true
    if (defaultDir === cache.dir) return true

    return false
  }, [cache.cached, cache.dir, defaultDir])

  return (
    <Section>
      <Checkbox onChange={handleCacheChange} value={cache.cached}>
        使用缓存目录(推荐)
      </Checkbox>
      <ControlGroup>
        <Button disabled={restoreDefaultDisabled} onClick={restoreDefaults}>
          恢复
        </Button>
        <InputGroup
          value={cache.dir}
          fill={true}
          disabled={!cache.cached}
          readOnly
        />
        <Button
          disabled={!cache.cached}
          onClick={pickDir}
          icon="folder-close"
        ></Button>
      </ControlGroup>
    </Section>
  )
}

export default memo(Cache)
