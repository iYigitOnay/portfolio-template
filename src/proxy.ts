import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/session";

// İyimser kontrol: oturumu olmayanı login'e yönlendirir.
// Asıl yetki kontrolü her Server Action/sayfada requireAdmin() ile yapılır.
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await verifySession(request.cookies.get(SESSION_COOKIE)?.value);

  if (pathname === "/admin/login") {
    return session ? NextResponse.redirect(new URL("/admin", request.url)) : NextResponse.next();
  }
  if (!session) {
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
