/*
 * Guangyao Li
 * 2019/06/19
 * lgy87@foxmail.com
 */
const {
  override,
  addBabelPlugin,
  addWebpackAlias,
  setWebpackTarget,
  addWebpackPlugin,
  addBundleVisualizer,
} = require("customize-cra")
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin")
const { alias } = require("./webpack/config")

module.exports = override(
  addBabelPlugin("lodash"),
  addWebpackAlias(alias),
  addWebpackPlugin(new LodashModuleReplacementPlugin()),
  process.env.BUNDLE_VISUALIZE === 1 && addBundleVisualizer(),
  setWebpackTarget("electron-renderer"),
)
