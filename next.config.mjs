/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "pmkdncnrnwdktxnqwnbo.supabase.co",
				port: "",
				pathname: "/**",
				search: "",
			},
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
				port: "",
				pathname: "/**",
				search: "",
			},
		],
	},
	reactStrictMode: true,
};

export default nextConfig;
