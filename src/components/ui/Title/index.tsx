import { HTMLAttributes } from "react";
import { cn } from "@/lib/classnames";

interface IProps extends HTMLAttributes<HTMLParagraphElement> {
	title: string;
}
export const Title = ({ title, className }: IProps) => {
	return <p className={cn("text-xl font-bold w-full", className)}>{title}</p>;
};
