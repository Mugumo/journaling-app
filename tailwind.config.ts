import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: "class", // Enable dark mode with 'class' strategy
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				bg: {
					beige: {
						dark: "#F5ECE0",
						light: "#F2DEBA", // Fixed missing `#`
					},
				},
				purple: {
					accent: "#6C00FF",
				},
				primary: {
					blue: "#3C79F5",
					green: "#0D7C66", // Fixed missing quotes
				},
				secondary: {
					blue: "#336D82", // Fixed missing quotes
					green: "#BDE8CA",
				},
				accent: "#2DCDDF",
			},
		},
	},
	plugins: [],
};
export default config;