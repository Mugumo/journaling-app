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
				beige: {
					dark: "#F5ECE0",
					light: "#F2DEBA", // Fixed missing `#`
				},
				purple: {
					accent: "#150050",
				},
				primary: {
					blue: "#3C79F5",
					green: "#0D7C66", // Fixed missing quotes
				},
				secondary: {
					blue: "#336D82", // Fixed missing quotes
					green: "#BDE8CA",
				},
				dark: {
					blue: "#16213E",
					green: "#143E24"
				},
				navy: "#1A2F4B",
				accent: "#2DCDDF",
				brown: "#3C2A21",
				charcoal: '#344055'
			},
		},
	},
	plugins: [],
};
export default config;
