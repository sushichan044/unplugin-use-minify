/**
 * This entry file is for Rollup plugin.
 *
 * @module
 */

import { UseMinify } from "./index";

/**
 * Rollup plugin
 *
 * @example
 * ```ts
 * // rollup.config.js
 * import UseMinify from 'unplugin-use-minify/rollup'
 *
 * export default {
 *   plugins: [UseMinify()],
 * }
 * ```
 */
const rollup = UseMinify.rollup as typeof UseMinify.rollup;
export default rollup;
export { rollup as "module.exports" };
