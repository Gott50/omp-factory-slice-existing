import { describe, expect, test } from "bun:test";
import { countWords, slugify } from "../src/index";

describe("countWords", () => {
  test("counts words across whitespace", () => {
    expect(countWords("one two  three\nfour")).toBe(4);
  });
  test("counts nothing in blank text", () => {
    expect(countWords("   \n\t ")).toBe(0);
  });
});

const SLUG_INPUTS = [
  "",
  "   \n\t ",
  "!!!",
  "日本語",
  "Hello World",
  "a   b",
  "a / b",
  "!hello!",
  "  hi  ",
  "-lead",
  "trail-",
  "a--b",
  "a-b-c",
  "snake_case",
  "don't stop",
  "a😀b",
  "café",
  "abc123",
  "v2 release",
  "a !!! b",
  "-",
  "---a---",
  "A_B",
  "a-b  c-d",
  "a\nb",
  "a\u0000b",
  "\uD800",
];

describe("slugify", () => {
  test("lowercases and joins words", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });
  test("returns the empty string for empty input", () => {
    expect(slugify("")).toBe("");
  });
  test("returns the empty string for whitespace-only input", () => {
    expect(slugify("   \n\t ")).toBe("");
  });
  test("returns the empty string when nothing is slug-worthy", () => {
    expect(slugify("!!!")).toBe("");
    expect(slugify("日本語")).toBe("");
  });
  test("collapses a run of separators to one hyphen", () => {
    expect(slugify("a   b")).toBe("a-b");
    expect(slugify("a !!! b")).toBe("a-b");
  });
  test("collapses mixed separators in one run", () => {
    expect(slugify("a / b")).toBe("a-b");
  });
  test("trims leading and trailing separators", () => {
    expect(slugify("!hello!")).toBe("hello");
    expect(slugify("  hi  ")).toBe("hi");
    expect(slugify("-lead")).toBe("lead");
    expect(slugify("trail-")).toBe("trail");
    expect(slugify("---a---")).toBe("a");
  });
  test("coalesces hyphen runs", () => {
    expect(slugify("a--b")).toBe("a-b");
  });
  test("preserves single hyphens", () => {
    expect(slugify("a-b-c")).toBe("a-b-c");
  });
  test("treats underscore as a separator", () => {
    expect(slugify("snake_case")).toBe("snake-case");
    expect(slugify("A_B")).toBe("a-b");
  });
  test("treats punctuation and emoji as separators", () => {
    expect(slugify("don't stop")).toBe("don-t-stop");
    expect(slugify("a😀b")).toBe("a-b");
  });
  test("does not transliterate non-ASCII letters", () => {
    expect(slugify("café")).toBe("caf");
  });
  test("keeps already-clean input unchanged", () => {
    expect(slugify("abc123")).toBe("abc123");
  });
  test("keeps letters and digits together", () => {
    expect(slugify("v2 release")).toBe("v2-release");
  });
  test("emits only the closed alphabet", () => {
    for (const input of SLUG_INPUTS) {
      const slug = slugify(input);
      expect(slug === "" || /^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)).toBe(true);
    }
  });
  test("is deterministic", () => {
    for (const input of SLUG_INPUTS) {
      expect(slugify(input)).toBe(slugify(input));
    }
  });
  test("is idempotent", () => {
    for (const input of SLUG_INPUTS) {
      const once = slugify(input);
      expect(slugify(once)).toBe(once);
    }
  });
  test("takes exactly one parameter", () => {
    expect(slugify.length).toBe(1);
  });
});
