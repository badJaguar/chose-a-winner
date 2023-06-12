import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import InstagramProvider from "next-auth/providers/instagram";
import { InstagramUser } from "../../../types/InstagramUser";

const url = process.env.NEXT_API_URL;

async function getSessionId(credentials: Record<"username" | "password", string> | undefined): Promise<string> {
  const sessionId = await fetch(`${url}/auth/login`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `username=$${credentials?.username}&password=${credentials?.password}&verification_code=&proxy=&locale=BY&timezone=`
  });

  return await sessionId.json();
}

async function getUserInfoByUsername(sessionId: string, userName: string): Promise<InstagramUser> {
  const user = await fetch(`${url}/user/info_by_username`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `sessionid=${sessionId}&username=${userName}&use_cache=false`
  });

  return await user.json();
}


// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        const sessionId = await getSessionId(credentials);
        const user = await getUserInfoByUsername(sessionId, credentials?.username!);

        const defaultUser: User = {
          id: user.pk,
          email: user.public_email,
          image: user.profile_pic_url,
          name: user.username,
        };

        if (defaultUser && sessionId) {
          // Any object returned will be saved in `user` property of the JWT
          return { ...defaultUser, sessionId };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token = Object.assign({}, token, {
          access_token: account.access_token,
          sessionId: user.sessionId,
          userId: user.id,
        });
      }
      return token;
    },
    async session({ session, token }) {
      if (session) {
        session = Object.assign({}, session, {
          access_token: token.access_token,
          sessionId: token.sessionId,
          userId: token.userId,
        });
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      else if (url.startsWith('/')) return new URL(url, baseUrl).toString();
      return baseUrl;
    },
  },
  // pages: {
  //   signIn: '/auth/signin',
  // }
};

export default NextAuth(authOptions);
