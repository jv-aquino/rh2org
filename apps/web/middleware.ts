import { auth } from "@/auth";

const PROTECTED_PATH = /^\/(?:dashboard(?:\/.*)?|)$/;  

export default auth((req) => {
  const { pathname, search } = req.nextUrl;
  const isLoggedIn = Boolean(req.auth?.user);

  if (!isLoggedIn && PROTECTED_PATH.test(pathname)) {
    const callbackUrl = encodeURIComponent(pathname + search);
    const url = new URL(`/auth/login?callbackUrl=${callbackUrl}`, req.url);
    return Response.redirect(url);
  }

  return;
});
