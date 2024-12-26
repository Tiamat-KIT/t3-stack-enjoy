import {auth} from "~/server/auth"

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth
    if(isLoggedIn) {
        return Response.redirect(new URL("/dashboard",nextUrl))
    }
})

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
  };