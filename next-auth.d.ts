import "next-auth/jwt";
import NextAuth, { DefaultSession } from "next-auth";


// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

declare module "next-auth/jwt" {
  interface JWT {
    /** The user's role. */
    access_token?: string;
  }
}


declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** Oauth access token */
    } & DefaultSession["user"];
    access_token?: accessToken;
  }
}