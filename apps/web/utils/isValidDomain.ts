export const isValidDomain = (d: unknown): d is string =>
  typeof d === "string" &&
  // must have at least one “.”, no spaces/@, not start/end with “.”
  /^[^@\s.][^@\s]*\.[^@\s.]+$/.test(d);