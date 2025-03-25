export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - login (Auth routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!signin|auth/signup|auth/reset_password|auth/update-password|auth/verify|auth/update_password|auth/newuser|auth/reset_wait|auth/password_expired|auth/agent_signup|^auth/agent_signup/update_profile|auth/agent_signup|_next/static|images|_next/image|favicon.ico).*)",

  ],
};

console.log("Middleware running")
