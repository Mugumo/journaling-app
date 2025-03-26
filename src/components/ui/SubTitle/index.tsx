import { FC, HTMLAttributes } from "react";
import { cn } from "@/lib/classnames";
interface IProps {
	title: string;
}
export const SubTitle: FC<HTMLAttributes<HTMLParagraphElement> & IProps> = ({
	title,
	className,
}) => {
	return (
		<p className={cn("text-gray-400 text-sm font-bold w-full", className)}>{title}</p>
	);
};
