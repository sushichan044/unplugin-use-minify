/**
 * This entry file is for Rspack plugin.
 *
 * @module
 */

import { UseMinify } from "./index";

/**
 * Rspack plugin
 *
 * @example
 * ```js
 * // rspack.config.js
 * import UseMinify from 'unplugin-use-minify/rspack'
 *
 * export default {
 *  plugins: [UseMinify()],
 * }
 * ```
 */
const rspack = UseMinify.rspack as typeof UseMinify.rspack;
export default rspack;
export { rspack as "module.exports" };
