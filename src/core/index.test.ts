import { describe, expect, it } from "vitest";

import { useMinify } from ".";

describe("useMinify", () => {
  describe("arrow function", () => {
    it("preserves if implicit return", () => {
      const code = `const fn = () => ({ a: 1, b: 2 })`;
      const result = useMinify(code);

      expect(result.code).toBe(code);
    });

    it("preserves if no 'use minify' pragma found", () => {
      const code = `const fn = () => {
        return {
          a: 1,
          b: 2
        }
      }`;
      const result = useMinify(code);

      expect(result.code).toBe(code);
    });

    it("minifies", () => {
      const code = `
      const fn = () => {
        "use minify"

        return {
          a: 1,
          b: 2
        }
      }`;
      const result = useMinify(code);

      expect(result.code.length).toBeLessThan(code.length);
    });
  });

  describe("function declaration", () => {
    it("preserves if no 'use minify' pragma found", () => {
      const code = `
      function fn() {
        return {
          a: 1,
          b: 2
        }
      }`;
      const result = useMinify(code);

      expect(result.code).toBe(code);
    });

    it("minifies", () => {
      const code = `
      function fn() {
        "use minify"

        return {
          a: 1,
          b: 2
        }
      }`;
      const result = useMinify(code);

      expect(result.code.length).toBeLessThan(code.length);
    });
  });

  describe("function expression", () => {
    it("preserves if no 'use minify' pragma found", () => {
      const code = `
      const fn = function() {
        return {
          a: 1,
          b: 2
        }
      }`;
      const result = useMinify(code);

      expect(result.code).toBe(code);
    });

    it("minifies", () => {
      const code = `
      const fn = function() {
        "use minify"

        return {
          a: 1,
          b: 2
        }
      }`;
      const result = useMinify(code);

      expect(result.code.length).toBeLessThan(code.length);
    });
  });
});
