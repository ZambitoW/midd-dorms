import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "../../../../models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        return (
          profile.email_verified && profile.email.endsWith("@middlebury.edu")
        );
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        let localUser = await User.query().findOne("googleId", user.id);

        if (!localUser) {
          const nameParts = user.name.split(" ");
          const firstName = nameParts[0];
          const lastName = nameParts.slice(1).join(" ");

          localUser = await User.query().insertAndFetch({
            googleId: user.id,
            firstName: firstName,
            lastName: lastName,
            email: user.email,
            classYear: 2025,
            complete: false,
          });
        }
        token.id = localUser.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
};

export default NextAuth(authOptions);
