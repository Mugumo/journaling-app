import { ButtonProps, Button as HUButton } from "@headlessui/react";
import { cn } from "@/lib/classnames";
interface IProps extends ButtonProps {
	color?: "primary" | "secondary";
	variant?: "full" | "outline" | "naked";
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
				"flex items-center justify-center gap-2 rounded-md py-2 px-4",
				"bg-purple-accent text-white shadow-md hover:bg-primary-blue disabled:bg-gray-500 disabled:opacity-65",
				{ "bg-primary-green": color === "secondary" },
				{ "bg-none": variant === "outline" },
				{ "bg-none border-none": variant === "naked" },
				className
			)}>
			{children}
		</HUButton>
	);
};
