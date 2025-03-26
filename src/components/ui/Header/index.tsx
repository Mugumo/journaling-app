import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Fragment, useState } from "react";
import { IconType } from "react-icons/lib";
import { TbChartHistogram } from "react-icons/tb";
import { IoPerson } from "react-icons/io5";
import { IoIosArrowDown, IoIosLogOut } from "react-icons/io";
import { useRouter } from "next/router";
import { Button, Menu, Modal } from "@/components/ui";
import { useTheme } from "@/hooks/theme";
import { BiSun, BiMoon } from "react-icons/bi";
import { SiThymeleaf } from "react-icons/si";
import { signOut } from "next-auth/react";
import { CreateJournal } from "@/components/forms";
import { cn } from "@/lib/classnames";

interface NavItem {
	name: string;
	icon: IconType;
	href: string;
	children?: NavItem[];
	show?: boolean;
	newTab?: boolean;
}

export const Header = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const navigation: NavItem[] = [
		{
			name: "Dashboard",
			icon: TbChartHistogram,
			href: "/",
			show: !!session,
			newTab: false,
		},
		{
			name: "Profile",
			icon: IoPerson,
			href: "/profile",
			show: !!session,
			newTab: false,
		},
	];
	const { pathname } = router;
	const { theme, toggleTheme } = useTheme();
	const [open, setOpen] = useState(false);

	return session ? (
		<div className="flex justify-between py-2 px-5 min-h-[7vh] ">
			<Link
				href="/"
				className="flex gap-2 items-end rounded-lg pr-2">
				<SiThymeleaf
					size={40}
					className="text-purple-accent bg-white rounded-lg"
				/>
				<div className="flex flex-col justify-between text-dark-navy dark:text-white font-bold">
					<h1 className="text-3xl leading-none">Leaf</h1>
					<p className="text-xs opacity-70 leading-none text-right">
						journaling
					</p>
				</div>
			</Link>
			<ul className="relative top-1 hidden items-center gap-6 font-semibold text-black dark:text-white/90 lg:flex">
				{navigation.map(
					({ name, href, newTab, show, children = [], icon: Icon }, idx) => (
						<Fragment key={idx}>
							{!show ? null : (
								<>
									{children?.filter((child) => child?.show)?.length > 0 ? (
										<Menu>
											<Menu.Button>
												<button
													className={cn(
														"group flex items-center gap-2 self-center py-2 pl-2 pr-1 hover:text-primary",
														{
															"border-primary text-primary": children.some(
																(_child) => _child.href == pathname
															),
														}
													)}>
													{/* <Icon className={cn("h-5 w-auto", {"stroke-primary text-primary": pathname.startsWith(href)})}/> */}
													{name}
													<IoIosArrowDown />
												</button>
											</Menu.Button>
											<Menu.Items className="mt-2">
												{children.map(({ name, href, show, newTab }) => (
													<Fragment key={href}>
														{!show ? null : (
															<Menu.Item>
																<Link
																	href={href}
																	className="inline-block"
																	target={newTab ? "_blank" : "_self"}>
																	{name}
																</Link>
															</Menu.Item>
														)}
													</Fragment>
												))}
											</Menu.Items>
										</Menu>
									) : (
										<Link
											href={href}
											target={newTab ? "_blank" : "_self"}
											className={cn(
												"group flex items-center gap-2 self-center py-2 pl-2 pr-1 hover:text-primary",
												{
													"border-primary text-primary":
														pathname.startsWith(href),
												}
											)}>
											{/* <Icon className={cn("h-5 w-auto", {"stroke-primary": pathname.startsWith(href)})} /> */}
											{name}
										</Link>
									)}
								</>
							)}
						</Fragment>
					)
				)}
				<Button
					onClick={() => setOpen(true)}
					disabled={open}>
					Record a Journal
				</Button>
				<Menu>
					<Menu.Button>
						{session ? (
							session?.user?.avatarUrl ? (
								<div className="rounded-full relative h-7 w-7 overflow-clip">
									<Image
										alt="avatar"
										src={session.user.avatarUrl}
										fill
										className="object-cover"
									/>
								</div>
							) : (
								session?.user?.name
							)
						) : null}
					</Menu.Button>
					<Menu.Items>
						<Menu.Item
							onClick={() => signOut()}
							className="flex items-center gap-2 py-1.5 px-3">
							<IoIosLogOut size={20} /> Sign Out
						</Menu.Item>
						<Menu.Item
							className="flex gap-2 items-center py-1.5 px-3"
							onClick={() => toggleTheme()}>
							{theme === "dark" ? (
								<BiSun
									size={20}
									className="text-orange-400"
								/>
							) : (
								<BiMoon
									size={20}
									className="text-dark-navy"
								/>
							)}
							{theme === "dark"
								? "Switch to light mode"
								: "Switch to dark mode"}
						</Menu.Item>
					</Menu.Items>
				</Menu>
			</ul>
			<Modal {...{ open, onClose: setOpen }}>
				<Modal.Panel
					size="2xl"
					title="New Journal">
					<CreateJournal onComplete={() => setOpen(false)} />
				</Modal.Panel>
			</Modal>
		</div>
	) : null;
};
