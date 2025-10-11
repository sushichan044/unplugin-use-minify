import type { SourceMap } from "magic-string";
import type { BlockStatement } from "oxc-parser";

import MagicString from "magic-string";
import { minify } from "oxc-minify";
import { parseSync, Visitor } from "oxc-parser";

import type { UserMinifyOptions } from "./options";

type Minified = {
  code: string;
  map: SourceMap;
};

const defaultMinifyOptions: UserMinifyOptions = {
  codegen: {
    removeWhitespace: true,
  },
  compress: {
    target: "esnext",
  },
  mangle: {
    toplevel: false,
  },
};

export function useMinify(
  code: string,
  minifyOptions: UserMinifyOptions | null | undefined,
): Minified {
  const resolvedMinifyOptions = minifyOptions ?? defaultMinifyOptions;

  const magicStr = new MagicString(code);

  const transformer = createFunctionBlockTransformer(
    (start, end) => code.slice(start, end),
    resolvedMinifyOptions,
  );

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

      const replace = transformer(fnBody);
      if (replace) {
        replacements.push(replace);
      }
    },
    FunctionDeclaration(node) {
      const fnBody = node.body;
      if (!fnBody) return;

      const replace = transformer(fnBody);
      if (replace) {
        replacements.push(replace);
      }
    },
  });
  visitor.visit(parsed.program);

  applyTextReplacements(code, replacements);

  return {
    code: applyTextReplacements(code, replacements),
    map: magicStr.generateMap({ hires: true }),
  };
}

function applyTextReplacements(
  source: string,
  replacements: TextReplaceMent[],
): string {
  if (replacements.length === 0) {
    return source;
  }
  const magicString = new MagicString(source);

  // Apply small replacements first to avoid errors in overlapping ranges
  const bottomUpReplacements = replacements.sort((a, b) => {
    const lengthA = a.end - a.start;
    const lengthB = b.end - b.start;

    if (lengthA !== lengthB) {
      // Smaller ranges first for bottom-up application
      return lengthA - lengthB;
    }

    // Apply from end to start
    return b.start - a.start;
  });

  for (const { content, end, start } of bottomUpReplacements) {
    magicString.overwrite(start, end, content);
  }

  return magicString.toString();
}

type TextReplaceMent = {
  content: string;
  end: number;
  start: number;
};

function createFunctionBlockTransformer(
  getSourceCode: (start: number, end: number) => string,
  minifyOptions: UserMinifyOptions,
) {
  return (functionBody: BlockStatement): TextReplaceMent | undefined => {
    const bodyHead = functionBody.body[0];
    if (
      !bodyHead ||
      bodyHead.type !== "ExpressionStatement" ||
      bodyHead.expression.type !== "Literal" ||
      bodyHead.expression.value !== "use minify"
    )
      return;

    const bodySrc = getSourceCode(functionBody.start, functionBody.end);

    const minified = minify("file.tsx", bodySrc, minifyOptions);

    return {
      content: minified.code,
      end: functionBody.end,
      start: functionBody.start,
    };
  };
}
