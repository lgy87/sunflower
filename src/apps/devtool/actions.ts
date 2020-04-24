import { createAsyncAction } from "typesafe-actions"
import { CacheSettings } from "./Cache"

export const fetchSettings = createAsyncAction(
  "devtool/fetchSettings/R",
  "devtool/fetchSettings/S",
  "devtool/fetchSettings/F",
)<void, CacheSettings, void>()

export const fetchDefaultDir = createAsyncAction(
  "devtool/fetchDefaultDir/R",
  "devtool/fetchDefaultDir/S",
  "devtool/fetchDefaultDir/F",
)<void, string, void>()

/*
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
    ipc.devtool.cache.get().then((resp: CacheSettings) => {
      setCache(resp)
    })
  }, [setCache])

  useEffect(() => {
    fetchDefaultsDir().then((dir: Dir) => {
      setDefaultDir(dir)
    })
  })

  */
