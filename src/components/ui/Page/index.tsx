import { FC, ReactNode } from "react";
import Head from "next/head";
import { Header } from "..";

interface Props {
	pageTitle?: string;
	children: ReactNode;
}

export const Page: FC<Props> = ({ children, pageTitle }) => {

	const myTitle = `Leaf | ${pageTitle || 'Page'}`
	return (
		<div className="flex h-screen w-screen flex-col gap-y-0 overflow-x-clip bg-white dark:bg-slate-950">
			<Head>
				<title>{myTitle}</title>
			</Head>
			<Header />
			<div className="relative grow overflow-y-auto text-black dark:text-white">
				{/* <SideBar /> */}
				<div className="h-full overflow-y-auto px-1 bg-beige-dark dark:bg-slate-950">
					{children}
				</div>
			</div>
		</div>
	);
};
