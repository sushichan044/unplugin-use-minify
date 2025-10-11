/**
 * This entry file is for Farm plugin.
 *
 * @module
 */

import { UseMinify } from "./index";

/**
 * Farm plugin
 *
 * @example
 * ```ts
 * // farm.config.js
 * import UseMinify from 'unplugin-use-minify/farm'
 *
 * export default {
 *   plugins: [UseMinify()],
 * }
 * ```
 */
const farm = UseMinify.farm as typeof UseMinify.farm;
export default farm;
export { farm as "module.exports" };
