import { Card, LoginButton, Page } from "@/components/ui";
import { useTheme } from "@/hooks/theme";
import Image from "next/image";
import Link from "next/link";
import { BiMoon, BiSun } from "react-icons/bi";
import { SiThymeleaf } from "react-icons/si";

const SignIn = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<Page pageTitle="Sign In">
			<div className="relative w-full h-full grid grid-cols-[auto_40%]">
				<div className="w-full h-full overflow-clip relative dark:opacity-85">
					<Image
						className="object-cover object-center"
						src="/images/backgrounds/fill_form_pana.png"
						alt="hands holding pens"
						priority
						fill
					/>
				</div>
				<div className="h-full flex flex-col justify-center">
					<Card
						size="lg"
						className="flex flex-col items-start justify-between py-12 gap-20 min-h-[65vh] relative text-navy dark:text-white">
						<div className="w-full flex flex-col gap-10 items-start">
							{/* <p className="w-full text-8xl font-medium mb-3">Welcome to</p> */}
							<Link
								href="/"
								className="flex gap-2 items-start rounded-lg pr-2">
								<SiThymeleaf
									size={110}
									className="text-dark-green bg-white rounded-3xl"
								/>
								<div className="flex flex-col font-bold">
									<h1 className="text-8xl leading-none -mt-1">Leaf</h1>
									<p className="text-2xl opacity-70 leading-none tracking-wider pr-2 text-right">
										journaling
									</p>
								</div>
							</Link>
							<p className="px-2 text-4xl">
								Capture your thoughts, reflect on your journey, and grow with
								Leaf.
							</p>
						</div>
						<LoginButton />
						{
							<div className="absolute bottom-2 right-2 hover:cursor-pointer">
								{theme === "dark" ? (
									<BiSun
										onClick={() => toggleTheme()}
										size={20}
										className="text-orange-400"
									/>
								) : (
									<BiMoon
										onClick={() => toggleTheme()}
										size={20}
										className="text-navy"
									/>
								)}
							</div>
						}
					</Card>
				</div>
			</div>
		</Page>
	);
};

// export async function getServerSideProps(context: GetServerSidePropsContext) {
// 	const session = await getServerSession(context.req, context.res, authOptions)

// 	// If the user is already logged in, redirect.
// 	// Note: Make sure not to redirect to the same page
// 	// To avoid an infinite loop!
// 	if (session) {
// 	  return { redirect: { destination: "/" } }
// 	}

// 	const providers = await getProviders()

// 	return {
// 	  props: { providers: providers ?? [] },
// 	}
//   }

export default SignIn;
