/** The slice fixture's one function: a word count that ignores blank lines. */
export function countWords(text: string): number {
  return text.split(/\s+/).filter((word) => word.length > 0).length;
}

/**
 * Converts text into a URL-safe slug: lowercased, every run of non-ASCII-
 * alphanumeric characters collapsed to one hyphen, and end hyphens trimmed.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
