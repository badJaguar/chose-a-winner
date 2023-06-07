import NextAuth, { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook";
// import GithubProvider from "next-auth/providers/github"
// import TwitterProvider from "next-auth/providers/twitter"
// import Auth0Provider from "next-auth/providers/auth0"
import InstagramProvider from "next-auth/providers/instagram";


// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('signIn', user, account, profile, email, credentials);

      return true;
    },
    async session({ session, user, token }) {
      console.log(session, user, token);

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log(token, user, account, profile, isNewUser);

      return token;
    }
  },
};

export default NextAuth(authOptions);
