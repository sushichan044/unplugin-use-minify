/**
 * This entry file is for Rolldown plugin.
 *
 * @module
 */

import { UseMinify } from "./index";

/**
 * Rolldown plugin
 *
 * @example
 * ```ts
 * // rolldown.config.js
 * import UseMinify from 'unplugin-use-minify/rolldown'
 *
 * export default {
 *   plugins: [UseMinify()],
 * }
 * ```
 */
const rolldown = UseMinify.rolldown as typeof UseMinify.rolldown;
export default rolldown;
export { rolldown as "module.exports" };
