import typescript from "@rollup/plugin-typescript";
import { rollupBuild, testFixtures } from "@sxzz/test-utils";
import path from "node:path";
import { describe } from "vitest";

import UseMinify from "../src/rollup";

describe("rollup", async () => {
  const { dirname } = import.meta;
  await testFixtures(
    "*.ts",
    async (args, id) => {
      const { snapshot } = await rollupBuild(id, [typescript(), UseMinify()]);
      return snapshot;
    },
    { cwd: path.resolve(dirname, "fixtures"), promise: true },
  );
});
