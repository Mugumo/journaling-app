"use client";

import { GoogleIcon } from "@/components/icons";
import { signIn } from "next-auth/react";
import { Button } from "..";
import { useSearchParams } from "next/navigation";

export const LoginButton = () => {
    const searchParams = useSearchParams();
    
	return (
		<div className="flex flex-col items-center w-full">
			<p className="mt-2 dark:text-gray-300 font-bold text-xl">
				Sign in to start journaling!
			</p>
			<Button onClick={() => signIn("google", { callbackUrl: searchParams.get('callbackUrl') || undefined })}>
				<GoogleIcon />
				Sign in with Google
			</Button>
		</div>
	);
};
