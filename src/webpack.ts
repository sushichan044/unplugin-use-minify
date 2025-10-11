/**
 * This entry file is for webpack plugin.
 *
 * @module
 */

import { UseMinify } from "./index";

/**
 * Webpack plugin
 *
 * @example
 * ```js
 * // webpack.config.js
 * import UseMinify from 'unplugin-use-minify/webpack'
 *
 * export default {
 *  plugins: [UseMinify()],
 * }
 * ```
 */
const webpack = UseMinify.webpack as typeof UseMinify.webpack;
export default webpack;
export { webpack as "module.exports" };
