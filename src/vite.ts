/**
 * This entry file is for Vite plugin.
 *
 * @module
 */

import { UseMinify } from "./index";

/**
 * Vite plugin
 *
 * @example
 * ```ts
 * // vite.config.ts
 * import UseMinify from 'unplugin-use-minify/vite'
 *
 * export default defineConfig({
 *   plugins: [UseMinify()],
 * })
 * ```
 */
const vite = UseMinify.vite as typeof UseMinify.vite;
export default vite;
export { vite as "module.exports" };
