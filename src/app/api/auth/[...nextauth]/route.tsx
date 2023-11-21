import { verifyPassword } from "@/app/lib/auth";
import { connectToDatabase } from "@/app/lib/db";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  // secret:"NotASecret",
  pages: { signIn: "/account/login" },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const client = await connectToDatabase();
        const usersCollection = client?.db().collection("users");
        const user = await usersCollection?.findOne({
          email: email,
        });

        if (!user) {
          client?.close();
          throw new Error("User not Found!");
        }
        const isValid = await verifyPassword(password, user.password);
        if (!isValid) {
          client?.close();
          throw new Error("Passwords do not match!");
        }
        client?.close();
        return { id: user._id.toString(), email: user.email };
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
