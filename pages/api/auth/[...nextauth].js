import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { getCookie, setCookie } from "cookies-next";

export default NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        const parseData = JSON.parse(credentials.userdata);
        const userDataPayload = {
          userName: parseData.userName,
          password: parseData.password,
          isSocialMediaLogin: false,
          // role: "admin",
        };
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_PATH}/users/account/login`,
            userDataPayload
          );
          // console.log(res);
          setCookie("jwtToken", res.data.body.accessToken);
          setCookie("refreshToken", res.data.body.refreshToken);
          return res.data.body.accessToken;
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
  ],
  session: {
    httpOnly: true,
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: null, // Expires when the browser is closed
      sameSite: "lax",
      path: "/",
    },
  },

  callbacks: {
    jwt: async ({ account, token, user }) => {
      // Initial sign in
      if (account && user) {
        return {
          accessToken: account.accessToken,
          accessTokenExpires: Date.now() + account.expires_at * 1000,
          refreshToken: account.refresh_token,
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      if (token.tokenExpiration < Date.now()) {
        // Call the endpoint where you handle the token refresh for a user
        console.log("refresh Token: ", token.refreshToken);
        const user = await axios.get(
          `${process.env.NEXT_PUBLIC_API_PATH}/account/refreshToken`,
          {
            headers: {
              authorization: `Bearer ${token.refreshToken}`,
            },
          }
        );
        // Check for the result and update the data accordingly
        return { ...token, ...user };
      }
      return token;
    },
    session: ({ session, token, user }) => {
      if (token) {
        session.user = token.user;
        session.accessToken = token.accessToken;
        session.error = token.error;
      }
      if (token.user.remember) {
        session.maxAge = 30 * 24 * 60 * 60; // 30 days
      } else {
        session.maxAge = null; // delete when close the browser
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
});
