
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request) {
  const authToken = request.cookies.get("authToken")?.value;
  const { pathname } = request.nextUrl;

  console.log("Middleware triggered");
  console.log("Pathname:", pathname);
  console.log("Auth Token:", authToken || "No token found");

  // Define public routes (accessible without authentication)
  const publicRoutes = ["/login", "/signup", "/"];
  
  // Define protected routes (require authentication)
  const protectedRoutes = ["/meals", "/community", "/meals/share", "/meals/[mealSlug]", ];

  // Check if current path is a public route
  const isPublicRoute = publicRoutes.includes(pathname) || 
                       pathname.startsWith('/meals/') && !pathname.startsWith('/meals/share');

  // Check if current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => {
    if (route.includes('[') && route.includes(']')) {
      // Handle dynamic routes like /meals/[mealSlug]
      const routePattern = route.replace(/\[.*?\]/g, '[^/]+');
      const regex = new RegExp(`^${routePattern}$`);
      return regex.test(pathname);
    }
    return pathname === route || pathname.startsWith(route + '/');
  });

  // If it's a public route and user is logged in, redirect to meals page
  if (isPublicRoute && authToken) {
    console.log("User is logged in, redirecting to /meals");
    return NextResponse.redirect(new URL("/meals", request.url));
  }

  // If it's a protected route and user is not logged in, redirect to login
  if (isProtectedRoute && !authToken) {
    console.log("No token found, redirecting to /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  console.log("Passing through middleware");
  return NextResponse.next();
}

export const config = {
  matcher: [
    
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
