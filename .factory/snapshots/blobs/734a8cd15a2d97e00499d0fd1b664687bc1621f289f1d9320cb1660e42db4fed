import { describe, expect, test } from "bun:test";
import { countWords } from "../src/index";

describe("countWords", () => {
  test("counts words across whitespace", () => {
    expect(countWords("one two  three\nfour")).toBe(4);
  });
  test("counts nothing in blank text", () => {
    expect(countWords("   \n\t ")).toBe(0);
  });
});
