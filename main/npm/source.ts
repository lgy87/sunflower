type Source = {
  name: string
  src: string
}

export function defaults(): Array<Source> {
  return [
    { name: "npm", src: "https://registry.npmjs.org/" },
    { name: "yarn", src: "https://registry.yarnpkg.com/" },
    { name: "cnpm", src: "http://r.cnpmjs.org/" },
    { name: "taobao", src: "https://registry.npm.taobao.org/" },
    { name: "nj", src: "https://registry.nodejitsu.com/" },
    { name: "npmMirror", src: "https://skimdb.npmjs.com/registry/" },
    { name: "edunpm", src: "http://registry.enpmjs.org/" },
  ]
}
