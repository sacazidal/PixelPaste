import { updateSession } from "@/utils/supabase/middleware";
import { NextResponse } from "next/server";
import { checkUserRole } from "./utils/serverCheckUserRole";

export async function middleware(request) {
  const response = await updateSession(request);

  if (request.nextUrl.pathname.startsWith("/admin/secret")) {
    const { user, error } = await checkUserRole("admin");

    if (error || !user) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
