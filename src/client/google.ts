import { google } from "googleapis";
import { env } from "~/env";

const googleOAuthClient = () => new google.auth.OAuth2({
    clientId: env.AUTH_GOOGLE_ID,
    clientSecret: env.AUTH_GOOGLE_SECRET,
    redirectUri: "http://localhost:3000/google-calender"
})

const globalForGoogleOAuth = globalThis as unknown as {
    google_oauth: ReturnType<typeof googleOAuthClient> | undefined
}

export const google_oauth = globalForGoogleOAuth.google_oauth ?? googleOAuthClient()

if (env.NODE_ENV !== "production") globalForGoogleOAuth.google_oauth = google_oauth