import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	callbacks: {
		async jwt({ token, account, profile, trigger }): Promise<JWT> {
			if (account && profile) {
				if (trigger === "signIn") {
					let dbUser = await prisma.user.findUnique({
						where: { email: profile.email! },
					});
					if (!dbUser) {
						throw new Error("Couldn't get the user profile");
					}
					return {
						...token,
						id: dbUser.id,
						firstName: dbUser.firstName,
						lastName: dbUser.lastName,
						nickname: dbUser.nickname,
						avatarUrl: dbUser.avatarUrl,
					};
				}

				if (trigger === "signUp") {
					let dbUser = await prisma.user.create({
						data: {
							email: profile.email!,
							name: profile.name,
							avatarUrl: profile.image,
							provider: "google",
							providerAccountId: profile.sub,
						},
					});
					return {
						...token,
						id: dbUser.id, 
						firstName: dbUser.firstName,
						lastName: dbUser.lastName,
						nickname: dbUser.nickname,
						avatarUrl: dbUser.avatarUrl,
					};
				}
			}
			return token;
		},

		async session({ session, token }): Promise<Session> {
			if (session.user) {
				session.user.id = token.id as string;
				session.user.firstName = token.firstName as string;
				session.user.lastName = token.lastName as string;
				session.user.nickname = token.nickname as string;
				session.user.avatarUrl = token.avatarUrl as string;
			}
			return session;
		},
	},
	session: {
		strategy: "jwt",
	},
};

export default NextAuth(authOptions);
