import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface GoogleProfile {
	iss: string;
	azp: string;
	aud: string;
	sub: string;
	email: string;
	email_verified: boolean,
	at_hash: string,
	name: string,
	picture: string,
	given_name: string,
	iat: number,
	exp: number
}
export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!
		}),
	],

	callbacks: {
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id;
				session.user.firstName = token.firstName;
				session.user.lastName = token.lastName;
				session.user.nickname = token.nickname;
				session.user.avatarUrl = token.avatarUrl;
			}
			return session;
		},
		async jwt({ token, account, profile }) {
			let gProfile = profile as GoogleProfile
			if (account && gProfile) {
			  let dbUser = await prisma.user.findUnique({
				where: { email: gProfile.email },
			  });
	  
			  if (!dbUser) {
				dbUser = await prisma.user.create({
				  data: {
					email: gProfile.email!,
					name: gProfile.name,
					avatarUrl: gProfile.picture,
					provider: "google",
					providerAccountId: gProfile.sub,
				  },
				});
			  }
			  token.id = dbUser.id;
			  token.firstName = dbUser.firstName;
			  token.lastName = dbUser.lastName;
			  token.nickname = dbUser.nickname;
			  token.avatarUrl = dbUser.avatarUrl;
			}
			return token;
		  },
		},

	session: {
		strategy: "jwt",
	},

	pages: {
		signIn: "/signin",
		error: "/signin"
	},
};

export default NextAuth(authOptions);

