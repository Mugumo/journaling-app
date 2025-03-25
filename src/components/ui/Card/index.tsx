import { FC, HTMLAttributes } from "react";
import cn from "classnames";
interface IProps {
	size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}
export const Card: FC<HTMLAttributes<HTMLDivElement> & IProps> = ({
	size = "md",
	children,
	className,
}) => {
	return (
		<div
			className={cn(
				"max-w-sm h-fit py-6 px-4 rounded-2xl shadow-lg border",
				"bg-white border-gray-100 text-navy",
				"dark:border-gray-800 dark:shadow-gray-900 dark:bg-charcoal",
				{ "max-w-xs": size === "xs" },
				{ "max-w-md": size === "md" },
				{ "max-w-lg": size === "lg" },
				{ "max-w-xl": size === "xl" },
				{ "max-w-2xl": size === "2xl" },
				className
			)}>
			{children}
		</div>
	);
};
