import { z } from "zod";

export function formatZodErrors(error: z.ZodFormattedError<Map<string, string>, string>) {
  const formatted: Record<string, string> = {};

  for (const key in error) {
    if (key === "_errors") continue;
    const field = error[key as keyof typeof error];
    if (field && "_errors" in field && field._errors.length > 0) {
      formatted[key] = field._errors[0]; // take the first error message
    }
  }

  return formatted;
}