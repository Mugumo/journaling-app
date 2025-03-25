import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma), // 👈 Add the Prisma Adapter

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
		strategy: "database", // Use database-backed sessions
	},

	pages: {
		signIn: "/signin", // 👈 Redirect users to custom Sign-in page
	},
};

export default NextAuth(authOptions);
function PrismaAdapter(prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>): import("next-auth/adapters").Adapter | undefined {
	throw new Error("Function not implemented.");
}

