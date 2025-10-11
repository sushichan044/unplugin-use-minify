# unplugin-use-minify

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

An unplugin that enables selective, function-level minification using the `"use minify"` directive.

## ✨ Features

- 🚀 **Lightning Fast** - Powered by OXC for maximum performance
- 🎯 **Selective Minification** - Minify only the functions you want with `"use minify"` directive
- 🗺️ **Source Maps** - Full source map support for debugging
- 📦 **Universal** - Works with Vite, Webpack, Rspack, Rollup, Rolldown, esbuild, and Farm
- 🔧 **TypeScript Native** - First-class TypeScript and TSX support
- 🪶 **Zero Config** - Works out of the box with sensible defaults

## 📦 Installation

```bash
npm i -D unplugin-use-minify
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import UseMinify from 'unplugin-use-minify/vite'

export default defineConfig({
  plugins: [UseMinify()],
})
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.ts
import UseMinify from 'unplugin-use-minify/rollup'

export default {
  plugins: [UseMinify()],
}
```

<br></details>

<details>
<summary>Rolldown</summary><br>

```ts
// rolldown.config.ts
import UseMinify from 'unplugin-use-minify/rolldown'

export default {
  plugins: [UseMinify()],
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
import { build } from 'esbuild'
import UseMinify from 'unplugin-use-minify/esbuild'

build({
  plugins: [UseMinify()],
})
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.ts
import UseMinify from 'unplugin-use-minify/webpack'

export default {
  plugins: [UseMinify()],
}
```

<br></details>

<details>
<summary>Rspack</summary><br>

```ts
// rspack.config.ts
import UseMinify from 'unplugin-use-minify/rspack'

export default {
  plugins: [UseMinify()],
}
```

<br></details>

<details>
<summary>Farm</summary><br>

```ts
// farm.config.ts
import UseMinify from 'unplugin-use-minify/farm'

export default {
  plugins: [UseMinify()],
}
```

<br></details>

## 🚀 Usage

Simply add `"use minify"` as the first statement in any function body:

### Basic Example

```ts
// Before
function initAnalytics() {
  "use minify"

  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  gtag('js', new Date())
  gtag('config', 'GA_MEASUREMENT_ID')
}
// > calculateScore.toString()
// function initAnalytics(){"use minify";window.dataLayer=window.dataLayer||[];function gtag(){window.dataLayer.push(arguments)}__name(gtag,"gtag");gtag("js",new Date);gtag("config","GA_MEASUREMENT_ID")}

// After
export function calculateScore(e:number){"use minify";return e*2+50}
// > calculateScore.toString()
// function initAnalytics(){"use minify";window.dataLayer=window.dataLayer||[];function e(){window.dataLayer.push(arguments)}__name(e,"e");e(`js`,new Date),e(`config`,`GA_MEASUREMENT_ID`)}
```

### Supported Function Types

#### ✅ Function Declaration

```ts
function myFunc() {
  "use minify"
  // This will be minified
}
```

#### ✅ Function Expression

```ts
const myFunc = function() {
  "use minify"
  // This will be minified
}
```

#### ✅ Arrow Function (Block Body)

```ts
const myFunc = () => {
  "use minify"
  // This will be minified
}
```

#### ✅ Async Functions

```ts
async function fetchData() {
  "use minify"
  // This will be minified
}

const processData = async () => {
  "use minify"
  // This will be minified
}
```

#### ❌ Arrow Function (Implicit Return)

```ts
// This CANNOT be minified
const double = (x: number) => x * 2
```

### Mixed Usage

```ts
// This function will NOT be minified
export function debugFunction() {
  const message = "This stays readable"
  console.log(message)
  return message
}

// This function WILL be minified
export function optimizedFunction() {
  "use minify"
  const value = 42
  const result = value * 2
  return result
}
```

## ⚙️ Options

See [src/core/options.ts](./src/core/options.ts) for details.

## 💡 Why?

When you embed functions via `Function.prototype.toString()` (e.g. SSR scripts, workers, evaluators), you face a trade-off:

- Unminified: readable, formatted source
- Minified: minimal inline size after bundling

This plugin lets you have both!

Add `"use minify"` as the first line in any function to minify.
You keep readable code in development while shipping compact inline output in production.

### Real-World Use Case: React Inline Scripts

```tsx
// Readable during development, minified in production
function initAnalytics() {
  "use minify"

  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  gtag('js', new Date())
  gtag('config', 'GA_MEASUREMENT_ID')
}

// Inject into HTML
export function AnalyticsScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(${initAnalytics.toString()})()`,
      }}
    />
  )
}

// Development: Readable function in <script>
// Production: Minified function automatically injected
// Result: Smaller HTML size without losing development experience
```

## 📝 License

[MIT](./LICENSE) License © 2025-PRESENT [Kentaro Suzuki](https://github.com/sushichan044)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/unplugin-use-minify.svg
[npm-version-href]: https://npmjs.com/package/unplugin-use-minify
[npm-downloads-src]: https://img.shields.io/npm/dm/unplugin-use-minify
[npm-downloads-href]: https://www.npmcharts.com/compare/unplugin-use-minify?interval=30
