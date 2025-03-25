import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Prisma, PrismaClient } from "@prisma/client";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";
import { DefaultArgs } from "@prisma/client/runtime/library";
const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	pages: {
		signIn: "/auth/signin", // Custom sign-in page
	},
	adapter: PrismaAdapter(prisma),
	callbacks: {
		// async jwt({ token, account, profile, trigger }): Promise<JWT> {
		// 	if (account && profile) {
		// 		let dbUser = await prisma.user.findUnique({
		// 			where: { email: profile.email! },
		// 		});
		// 		if (dbUser) {
		// 			return {
		// 				...token,
		// 				id: dbUser.id,
		// 				firstName: dbUser.firstName,
		// 				lastName: dbUser.lastName,
		// 				nickname: dbUser.nickname,
		// 				avatarUrl: dbUser.avatarUrl,
		// 			};
		// 		} else {
		// 			dbUser = await prisma.user.create({
		// 				data: {
		// 					email: profile.email!,
		// 					name: profile.name,
		// 					avatarUrl: profile.image,
		// 					provider: "google",
		// 					providerAccountId: profile.sub,
		// 				},
		// 			});
		// 			return {
		// 				...token,
		// 				id: dbUser.id,
		// 				firstName: dbUser.firstName,
		// 				lastName: dbUser.lastName,
		// 				nickname: dbUser.nickname,
		// 				avatarUrl: dbUser.avatarUrl,
		// 			};
		// 		}
		// 	}
		// 	return token;
		// },

		async redirect({ url, baseUrl }) {
			// Allows relative callback URLs
			if (url.startsWith("/")) return `${baseUrl}${url}`;
			// Allows callback URLs on the same origin
			else if (new URL(url).origin === baseUrl) return url;
			return baseUrl;
		},

		// async session({ session, token }): Promise<Session> {
		// 	if (session.user) {
		// 		session.user.id = token.id as string;
		// 		session.user.firstName = token.firstName as string;
		// 		session.user.lastName = token.lastName as string;
		// 		session.user.nickname = token.nickname as string;
		// 		session.user.avatarUrl = token.avatarUrl as string;
		// 	}
		// 	return session;
		// },
	},
	session: {
		strategy: "jwt",
	},
};

export default NextAuth(authOptions);
function PrismaAdapter(prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>): import("next-auth/adapters").Adapter | undefined {
	throw new Error("Function not implemented.");
}

