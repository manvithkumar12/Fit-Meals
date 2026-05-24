import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
  locales: ["en", "de"],
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: false,
});

const authRoutes = ["/login", "/register"];
const protectedRoutes = ["/profile", "/dashboard"];

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("UserToken")?.value;
  const { pathname } = request.nextUrl;

  // strip locale prefix to get clean path e.g. /en/login → /login
  const cleanPath = pathname.replace(/^\/(en|de)/, "") || "/";

  const isAuthRoute = authRoutes.some((route) => cleanPath.startsWith(route));
  const isProtectedRoute = protectedRoutes.some((route) =>
    cleanPath.startsWith(route),
  );

  if (token && isAuthRoute) {
    const locale = pathname.split("/")[1] || "en";
    return NextResponse.redirect(new URL(`/${locale}/profile`, request.url));
  }

  if (!token && isProtectedRoute) {
    const locale = pathname.split("/")[1] || "en";
    return NextResponse.redirect(
      new URL(`/${locale}/login/Customer`, request.url),
    );
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!_next|api|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|ico|zip)).*)",
  ],
};
