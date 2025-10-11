/**
 * This entry file is for esbuild plugin.
 *
 * @module
 */

import { UseMinify } from "./index";

/**
 * Esbuild plugin
 *
 * @example
 * ```ts
 * import { build } from 'esbuild'
 * import UseMinify from 'unplugin-use-minify/esbuild'
 *
 * build({ plugins: [UseMinify()] })
```
 */
const esbuild = UseMinify.esbuild as typeof UseMinify.esbuild;
export default esbuild;
export { esbuild as "module.exports" };
