import { FC, ReactNode, JSXElementConstructor, HTMLAttributes } from "react";
import { cn } from "@/lib/classnames";
interface Props {
	children?: ReactNode;
	className?: string;
	as?: "form" | "div" | "section" | "article" | JSXElementConstructor<any>;
}

interface StaticComponents {
	Header?: FC<Props>;
	Body?: FC<Props>;
}

export const Wrapper: FC<Props> & StaticComponents = ({
	children,
	className,
	as = "div",
}) => {
	return (
		<div
			className={cn(
				"rounded-xl bg-white border border-gray-100 dark:bg-blue-dark",
				className
			)}>
			{children}
		</div>
	);
};

const Header: FC<HTMLAttributes<HTMLDivElement>> = ({
	children,
	className = "",
}) => {
	return (
		<div
			className={cn(
				"border-b-2 border-gray-100 dark:border-gray-300 px-2",
				className
			)}>
			{children}
		</div>
	);
};

const Body: FC<HTMLAttributes<HTMLDivElement>> = ({
	children,
	className = "py-4",
}) => {
	return <div className={cn("px-2", className)}>{children}</div>;
};

Wrapper.Header = Header;
Wrapper.Body = Body;

Wrapper.displayName = "Wrapper";
