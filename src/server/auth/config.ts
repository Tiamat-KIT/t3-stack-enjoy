import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
// import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google"
import { env } from "~/env";


import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
      accessToken: string
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  session: {
    strategy: "jwt"
  },
  trustHost: true,
  providers: [
    GoogleProvider({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope:  "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly",
        }
      }
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  secret: env.AUTH_SECRET,
  adapter: PrismaAdapter(db),
  callbacks: {
    jwt: async ({token, user, account, profile, isNewUser}) => {
        if (user) {
            token.user = user;
            const u = user as any
            token.role = u.role;
        }
        if (account) {
            token.accessToken = account.access_token
            token.refreshToken = account.refresh_token
        }
        return token;
    },
    session: ({session, token}) => {
        token.accessToken
        return {
            ...session,
            user: {
                ...session.user,
                role: token.role,
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
            },

        };
    },
}
} satisfies NextAuthConfig;
