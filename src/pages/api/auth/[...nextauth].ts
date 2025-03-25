import NextAuth, { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import GoogleProvider from 'next-auth/providers/google'

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),

	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],

	callbacks: {
		async session({ session, user }) {
			// Attach user id and other profile details to session
			if (session.user) {
				session.user.id = user.id;
				session.user.firstName = user.firstName;
				session.user.lastName = user.lastName;
				session.user.nickname = user.nickname;
				session.user.avatarUrl = user.image;
			}
			return session;
		},
	},

	session: {
		strategy: "database",
	},

	pages: {
		signIn: "/auth/signin",
	},
};

export default NextAuth(authOptions);

