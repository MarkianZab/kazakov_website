import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { locales, hasLocale, defaultLocale, type Locale } from "@/lib/locales";
import { isAdminEmail } from "@/lib/admin";

function getPreferredLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && hasLocale(cookieLocale)) return cookieLocale;

  // Pick the supported locale the browser ranks highest; ties keep header order
  const header = request.headers.get("accept-language") ?? "";
  let best: Locale = defaultLocale;
  let bestQ = 0;
  for (const part of header.split(",")) {
    const [tag, ...params] = part.trim().split(";");
    const lang = tag.trim().slice(0, 2).toLowerCase();
    if (!hasLocale(lang)) continue;
    const qParam = params.find((p) => p.trim().startsWith("q="));
    const q = qParam ? parseFloat(qParam.split("=")[1]) || 0 : 1;
    if (q > bestQ) {
      bestQ = q;
      best = lang;
    }
  }
  return best;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Admin routes: Supabase auth check ──────────────────────────────────────
  if (pathname.startsWith("/admin")) {
    let supabaseResponse = NextResponse.next({ request });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            supabaseResponse = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Being authenticated is not enough — the account must be an allowlisted
    // admin. This blocks anyone who self-registers against the public project.
    const isAdmin = isAdminEmail(user?.email);
    const isLoginPath = pathname === "/admin/login";

    if (!isAdmin && !isLoginPath) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
    if (isAdmin && isLoginPath) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/dashboard";
      return NextResponse.redirect(url);
    }
    return supabaseResponse;
  }

  // ── Public routes: locale routing ──────────────────────────────────────────
  const pathnameHasLocale = locales.some(
    (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  );

  if (!pathnameHasLocale) {
    const locale = getPreferredLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    const response = NextResponse.redirect(url);
    response.cookies.set("NEXT_LOCALE", locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  // Persist locale cookie based on current path
  const currentLocale = pathname.split("/")[1] as Locale;
  const response = NextResponse.next({ request });
  response.cookies.set("NEXT_LOCALE", currentLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: ["/((?!_next|api|ingest|favicon\\.ico|.*\\..*).*)"],
};
