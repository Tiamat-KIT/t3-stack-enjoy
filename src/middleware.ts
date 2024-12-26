import {auth} from "~/server/auth"
import { apiAuthPrefix, /*authRoutes,*/ DEFAULT_LOGIN_REDIRECT, publicRoutes } from "./route"
export default auth((req) => {
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;
    console.log(`pathname: ${nextUrl.pathname}`);
    console.log(`isLoggedIn ${isLoggedIn}`);

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    // const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    if(isApiAuthRoute) return;
    

    /*if(isAuthRoute) {
        if(isLoggedIn) return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl))
        return;
    }*/

    if(!isLoggedIn && !isPublicRoute) return Response.redirect(new URL('/',nextUrl))
    
    return;
})

export const config = {
    matcher: [
        '/((?!.+\\.[\\w]+$|_next).*)',
        '/',
        '/(api|trpc)(.*)'
    ],
  };