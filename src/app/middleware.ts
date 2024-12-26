import {auth} from "~/server/auth"

export default auth((req) => {
    const { nextUrl } = req;
    const session = req.auth
    if(session != null) {
        return Response.redirect(
            new URL(
                "/dashboard",
                nextUrl
            ))
    }
})

export const config = {
    matcher: ["/((?!api|trpc|_next/static|_next/image|favicon.ico).*)"],
};