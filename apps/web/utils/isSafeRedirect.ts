export const isSafeRedirect = (url: string | null) => {
  return typeof url === "string" && /^\/(?!\/)/.test(url);
};