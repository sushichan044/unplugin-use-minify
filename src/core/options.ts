import type { FilterPattern } from "unplugin-utils";

import type { UserMinifyOptions } from "../core";

export interface Options {
  enforce?: "post" | "pre" | undefined;
  exclude?: FilterPattern;
  include?: FilterPattern;

  minifyOptions?: UserMinifyOptions | null | undefined;
}

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

export type OptionsResolved = Overwrite<
  Required<Options>,
  Pick<Options, "enforce">
>;

export function resolveOptions(options: Options): OptionsResolved {
  return {
    enforce: "enforce" in options ? options.enforce : "pre",
    exclude: options.exclude ?? [/node_modules/],
    include: options.include ?? [/\.[cm]?[jt]sx?$/],
    minifyOptions: options.minifyOptions ?? null,
  };
}
