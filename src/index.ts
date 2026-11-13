/** The slice fixture's one function: a word count that ignores blank lines. */
export function countWords(text: string): number {
  return text.split(/\s+/).filter((word) => word.length > 0).length;
}
