import { ButtonProps, Button as HUButton } from "@headlessui/react";
import cn from "classnames";
interface IProps extends ButtonProps {
	color?: "primary" | "secondary";
	variant?: "full" | "outline";
}
export const Button = ({
	color = "primary",
	variant = "full",
	children,
	className,
	...props
}: IProps) => {
	return (
		<HUButton
			{...props}
			className={cn(
				"flex items-center gap-2 rounded-md bg-gray-800 py-2 px-4 text-white shadow-md hover:bg-gray-700",
				{ "bg-dark-green": color === "secondary" },
				{ "bg-none": variant === "outline" },
				className
			)}>
			{children}
		</HUButton>
	);
};
