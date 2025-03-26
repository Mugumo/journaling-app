import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { cn } from "@/lib/classnames";

export type Crumb = {
	name: string;
	url: string;
};

export const Breadcrumbs = ({
	trail,
	className,
}: {
	trail: Crumb[];
	className?: string;
}) => {
	return (
		<div className={cn("flex my-1 gap-2", className)}>
			{trail.map(({ name, url }, idx) => (
				<Link
					key={idx}
					href={url}
					className={cn(
						"flex items-center gap-2 text-[0.95rem] font-semibold capitalize text-gray-300/60 transition hover:text-primary dark:text-gray-200 dark:hover:text-primary",
						{
							"text-gray-700 dark:text-gray-400": idx + 1 === trail.length,
						}
					)}>
					{name}
					<IoIosArrowForward
						className={cn("h-[0.8rem] w-auto", {
							hidden: idx + 1 === trail.length,
						})}
					/>
				</Link>
			))}
		</div>
	);
};
