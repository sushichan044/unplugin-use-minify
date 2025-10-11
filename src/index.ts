import type { UnpluginInstance } from "unplugin";

import { createUnplugin } from "unplugin";
import { createFilter } from "unplugin-utils";

import type { Options } from "./core/options";

import { useMinify } from "./core";
import { resolveOptions } from "./core/options";

export const UseMinify: UnpluginInstance<Options | undefined, false> =
  createUnplugin((rawOptions = {}) => {
    const options = resolveOptions(rawOptions);
    const filter = createFilter(options.include, options.exclude);

    const name = "unplugin-use-minify";
    return {
      enforce: options.enforce,
      name,

      transformInclude(id) {
        return filter(id);
      },

      transform(code) {
        const result = useMinify(code, options.minifyOptions);

        return result;
      },
    };
  });
