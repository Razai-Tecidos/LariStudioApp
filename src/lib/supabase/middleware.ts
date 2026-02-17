import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/types/database";
import { getClientEnv, getServerEnv } from "@/lib/env";

const PUBLIC_ROUTES = ["/login", "/reset-password", "/api/health"];
const ASSET_FILE = /\.(.*)$/;

export type AuthDecision =
  | { action: "allow" }
  | { action: "redirect-login" }
  | { action: "redirect-home" };

export function resolveAuthDecision(input: {
  pathname: string;
  isAuthenticated: boolean;
  userEmail?: string | null;
  ownerEmail: string;
}): AuthDecision {
  const { pathname, isAuthenticated, ownerEmail, userEmail } = input;
  const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));

  if (!isAuthenticated && isPublicRoute) {
    return { action: "allow" };
  }

  if (!isAuthenticated) {
    return { action: "redirect-login" };
  }

  if (!userEmail || userEmail.toLowerCase() !== ownerEmail.toLowerCase()) {
    return { action: "redirect-login" };
  }

  if (pathname === "/login") {
    return { action: "redirect-home" };
  }

  return { action: "allow" };
}

export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    ASSET_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });
  const env = getClientEnv();
  const serverEnv = getServerEnv();

  const supabase = createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_CLIENT_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const decision = resolveAuthDecision({
    pathname,
    isAuthenticated: Boolean(user),
    userEmail: user?.email,
    ownerEmail: serverEnv.AUTHORIZED_OWNER_EMAIL,
  });

  if (decision.action === "redirect-login") {
    if (user) {
      await supabase.auth.signOut();
    }

    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (decision.action === "redirect-home") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return response;
}
