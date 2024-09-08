import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const allowAccessWithoutSessionToken = (path: string) => {
  if (["/login", "/login/auth"].includes(path)) {
    return true;
  }
  return false;
};

const allowAccessWithoutOtpToken = (path: string) => {
  if (["/login"].includes(path)) {
    return true;
  }
  return false;
};
export async function middleware(request: NextRequest) {
  console.log("here");
  const sessionToken = request.cookies.get("session")?.value;
  const otpToken = request.cookies.get("otp_token")?.value;

  if (
    allowAccessWithoutSessionToken(request.nextUrl.pathname) &&
    sessionToken
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (
    !allowAccessWithoutSessionToken(request.nextUrl.pathname) &&
    !sessionToken
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    !allowAccessWithoutOtpToken(request.nextUrl.pathname) &&
    !otpToken &&
    !sessionToken
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
