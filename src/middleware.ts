import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  const { pathname } = request.nextUrl;


  if (token && pathname.startsWith("/auth/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }


  if (!token && pathname.startsWith("/cart")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }


  return NextResponse.next();
}


export const config = {
  matcher: ["/cart", "/auth/login"],
};