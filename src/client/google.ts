import { google } from "googleapis";
import { env } from "~/env";

const oauth2Client = new google.auth.OAuth2({
    clientId: env.AUTH_GOOGLE_ID,
    clientSecret: env.AUTH_GOOGLE_SECRET,
    redirectUri: "http://localhost:3000/google-calender"
})

export default oauth2Client