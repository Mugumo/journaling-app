export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - login (Auth routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!auth/signin|_next/static|images|_next/image|favicon*).*)',
  ],
};
