import type { SourceMap } from "magic-string";
import type { MinifyOptions } from "oxc-minify";
import type { BlockStatement } from "oxc-parser";
import type { Except } from "type-fest";

import MagicString from "magic-string";
import { minify } from "oxc-minify";
import { parseSync, Visitor } from "oxc-parser";

import { removeContained } from "./merge";

type Minified = {
  code: string;
  map: SourceMap;
};

// we want to specift compress.unused = false, but it is not working due to bug.
// so disable compress option for now.
// TODO: enable compress option (except compress.unused) when the bug is fixed.
/**
 * @default
 * ```ts
 * {
 *   codegen: {
 *     removeWhitespace: true,
 *   },
 *   mangle: {
 *     toplevel: false,
 *   },
 * }
 * ```
 */
export type UserMinifyOptions = Except<
  MinifyOptions,
  "compress" | "module" | "sourcemap"
>;

const defaultMinifyOptions: UserMinifyOptions = {
  codegen: {
    removeWhitespace: true,
  },
  mangle: {
    toplevel: false,
  },
};

export function useMinify(
  code: string,
  minifyOptions: UserMinifyOptions | null | undefined = undefined,
): Minified {
  const resolvedMinifyOptions: UserMinifyOptions =
    minifyOptions ?? defaultMinifyOptions;

  const magicStr = new MagicString(code);

  const parsed = parseSync("file.tsx", code, {
    astType: "ts",
    lang: "tsx",
    preserveParens: true,
    range: true,
    sourceType: "module",
  });
  const replacements: TextReplaceMent[] = [];

  const visitor = new Visitor({
    ArrowFunctionExpression(node) {
      const fnBody = node.body;
      if (!(fnBody.type === "BlockStatement")) {
        return;
      }
      if (!shouldMinifyThisBlock(fnBody)) {
        return;
      }

      const minified = minifyFunction(
        code.slice(node.start, node.end),
        resolvedMinifyOptions,
      );
      replacements.push({
        content: minified,
        end: node.end,
        start: node.start,
      });
    },

    FunctionDeclaration(node) {
      const fnBody = node.body;
      if (!fnBody || !shouldMinifyThisBlock(fnBody)) {
        return;
      }

      const minified = minifyFunction(
        code.slice(node.start, node.end),
        resolvedMinifyOptions,
      );
      replacements.push({
        content: minified,
        end: node.end,
        start: node.start,
      });
    },

    FunctionExpression(node) {
      const fnBody = node.body;
      if (!fnBody || !shouldMinifyThisBlock(fnBody)) {
        return;
      }

      const minified = minifyFunction(
        code.slice(node.start, node.end),
        resolvedMinifyOptions,
      );
      replacements.push({
        content: minified,
        end: node.end,
        start: node.start,
      });
    },
  });
  visitor.visit(parsed.program);

  applyTextReplacements(code, replacements);

  return {
    code: applyTextReplacements(code, replacements),
    map: magicStr.generateMap({ hires: true }),
  };
}

function shouldMinifyThisBlock(fnBody: BlockStatement): boolean {
  const bodyHead = fnBody.body[0];
  return (
    bodyHead != null &&
    bodyHead.type === "ExpressionStatement" &&
    bodyHead.expression.type === "Literal" &&
    bodyHead.expression.value === "use minify"
  );
}

function minifyFunction(
  code: string,
  minifyOptions: UserMinifyOptions,
): string {
  const minified = minify("file.tsx", code, {
    ...minifyOptions,
    compress: false, // see UserMinifyOptions comment
  });

  return minified.code;
}

type TextReplaceMent = {
  content: string;
  end: number;
  start: number;
};

function applyTextReplacements(
  source: string,
  replacements: TextReplaceMent[],
): string {
  if (replacements.length === 0) {
    return source;
  }

  const stableReplacements = removeContained(replacements);
  const magicString = new MagicString(source);

  for (const { content, end, start } of stableReplacements) {
    magicString.overwrite(start, end, content);
  }

  return magicString.toString();
}
