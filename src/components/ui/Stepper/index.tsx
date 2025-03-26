"use client";
import { Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/classnames";
import { Button } from "..";
interface IProps {
	children: JSX.Element[];
    disabled: boolean;
	currentIndex: number;
	setCurrentIndex: Dispatch<SetStateAction<number>>;
	// height?: "sm" | "md" | "lg" | "xl";
}

export const Stepper: React.FC<IProps> = ({
	children,
    disabled,
	currentIndex,
	setCurrentIndex,
}) => {
	return (
		<div className="relative w-full max-w-3xl mx-auto overflow-clip">
			{/* Indicators */}
			<div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-2">
				{children.map((_, index) => (
					<div
						key={index}
						onClick={() => setCurrentIndex(index)}
						className={cn(
							"w-3 h-3 rounded-full cursor-pointer transition-all duration-300 disabled:text-gray-400 bg-gray-400",
							{ "bg-white scale-125": currentIndex === index }
						)}
					/>
				))}
			</div>
			<div
				className={cn(
					"w-full h-fit flex transition-transform ease-in-out duration-500"
				)}
				style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
				{children.map((element, index) => (
					<div
						key={index}
						className="w-full flex-shrink-0">
						{element}
					</div>
				))}
			</div>
			<div className="flex justify-between items-end px-5">
				<Button
					onClick={() => setCurrentIndex((prev) => prev - 1)}
					disabled={currentIndex < 1 || disabled}>
					Previous
				</Button>
				<Button
					color="secondary"
					onClick={() => setCurrentIndex((prev) => prev + 1)}
					disabled={currentIndex > children.length - 2 || disabled}>
					Next
				</Button>
			</div>
		</div>
	);
};

export default Stepper;
