import { Button, ControlGroup, InputGroup, Toaster } from "@blueprintjs/core"
import * as r from "ramda"
import * as ra from "ramda-adjunct"
import React, { memo, useCallback, useEffect, useMemo, useState } from "react"
import { useUpdateEffect } from "react-use"
import Checkbox from "~/components/Checkbox"
import Section from "~/components/Section"
import ipc from "~/utils/ipc"
import style from "./style.module.css"

const defaultSettings = {
  cached: false,
  dir: "",
}
export type CacheSettings = typeof defaultSettings
type Dir = CacheSettings["dir"]

type PickedDirectories = {
  canceled: boolean
  filePaths: Array<string>
}

function Cache(props: any) {
  const [cache, setCache] = useState<CacheSettings>(defaultSettings)
  const [defaultDir, setDefaultDir] = useState("")

  const fetchDefaultsSettings = useCallback(ipc.devtool.cache.defaults, [])

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
    ipc.devtool.cache.get().then((resp: CacheSettings) => {
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
    ipc.devtool.cache
      .set(cache)
      .catch((e: any) => (Toaster as any).show(e.message))
  }, [cache, setCache])

  const customized = useMemo(() => {
    if (!cache.cached) return true
    if (defaultDir === cache.dir) return true

    return false
  }, [cache.cached, cache.dir, defaultDir])

  return (
    <Section>
      <Checkbox onChange={handleCacheChange} value={cache.cached}>
        <span className={style.subtitle}>使用缓存目录</span>
        <span className={style.tip}>临时下载的npm包会自动缓存到该目录</span>
      </Checkbox>
      <ControlGroup>
        {customized || <Button onClick={restoreDefaults}>恢复默认</Button>}
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
