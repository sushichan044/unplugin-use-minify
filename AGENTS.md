# AGENTS.md

This file provides guidance to Agents when working with code in this repository.

## Overview

`unplugin-use-minify` is an unplugin that enables selective, function-level minification using the `"use minify"` directive. It uses OXC (Oxidation Compiler) for parsing and minification, applying transformations only to functions that explicitly opt-in.

## Development Commands

```bash
# Build the project (using tsdown)
pnpm run build

# Run tests (using vitest)
pnpm run test

# Run linter (ESLint)
pnpm run lint

# Format code (Biome)
pnpm run format

# Type checking
pnpm run typecheck

# Publish preview with pkg-pr-new
pnpm run pkg-pr-new
```

## Architecture

### Core Logic (`src/core/index.ts`)

The main transformation pipeline:

1. **Parse**: Uses `oxc-parser` to parse source code into AST with TypeScript/TSX support
2. **Visit**: Traverses AST to find `FunctionDeclaration`, `ArrowFunctionExpression`, and `FunctionExpression` nodes
3. **Filter**: Uses `shouldMinifyThisBlock()` to check if function has `BlockStatement` body containing `"use minify"` as the first statement
4. **Minify**: Applies `minifyFunction()` with `oxc-minify` to matching functions
5. **Replace**: Uses `MagicString` to apply replacements after removing contained/nested replacements via `removeContained()` to handle nested functions correctly
6. **Map**: Generates source maps for debugging

### Plugin Factory (`src/index.ts`)

- Uses `unplugin` to create unified plugin interface
- Applies file filtering via `unplugin-utils`
- Configurable `enforce` timing (pre/post)
- Default includes: `[/\.[cm]?[jt]sx?$/]`
- Default excludes: `[/node_modules/]`

### Bundler-Specific Exports

Each file (`vite.ts`, `webpack.ts`, `rspack.ts`, `rollup.ts`, `rolldown.ts`, `esbuild.ts`, `farm.ts`) exports the plugin configured for that specific bundler.

## Important Implementation Details

### Supported Function Types

- ✅ **Function Declaration**: `function foo() { "use minify"; ... }`
- ✅ **Function Expression**: `const foo = function() { "use minify"; ... }`
- ✅ **Arrow Function (Block)**: `const foo = () => { "use minify"; ... }`
- ✅ **Async Functions**: All function types support async
- ✅ **Nested Functions**: Inner functions with `"use minify"` are processed independently (handled by `removeContained()`)
- ❌ **Arrow Function (Implicit Return)**: `const foo = () => x * 2` (no BlockStatement)

### Options

- see `src/core/index.ts` for `UserMinifyOptions` type definition and detailed comments
- see `src/core/options.ts` for plugin options
- **Note**: `compress` option is currently disabled due to OXC bug (see comments in `src/core/index.ts`)

## Testing

Tests use `@sxzz/test-utils` for fixture-based snapshot testing. See `tests/fixtures/basic.ts` for comprehensive examples of supported and unsupported cases.
