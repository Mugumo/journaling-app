"use client";
import { useState } from "react";
import Image from "next/image";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { cn } from "@/lib/classnames";
interface IProps {
	images: string[];
	height?: "sm" | "md" | "lg" | "xl";
}

export const Carousel: React.FC<IProps> = ({ images, height = "md" }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const prevSlide = () => {
		setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
	};

	const nextSlide = () => {
		setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
	};

	return (
		<div className="relative w-full max-w-3xl mx-auto overflow-clip">
			<div
				className={cn("flex transition-transform ease-in-out duration-500", 
                    {"h-36": height === "sm",},
                    {"h-44": height === "md",},
                    {"h-48": height === "lg",},
                    {"h-60": height === "xl",},
                )}
				style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
				{images.map((src, index) => (
					<div
						key={index}
						className="w-full flex-shrink-0">
						<Image
							src={src}
							alt={`Slide ${index + 1}`}
							width={800}
							height={450}
							className="w-full h-auto object-cover rounded-lg"
							priority={index === 0}
						/>
					</div>
				))}
			</div>

			{/* Previous Button */}
			<button
				onClick={prevSlide}
				disabled={currentIndex < 1}
				className={cn(
					"absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-gray-800/50 disabled:text-gray-400",
					"text-white rounded-full hover:bg-gray-900"
				)}>
				<FaChevronCircleLeft size={24} />
			</button>

			{/* Next Button */}
			<button
				onClick={nextSlide}
				disabled={images.length < 2}
				className={cn(
					"absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gray-800/50",
					"text-white rounded-full hover:bg-gray-900 disabled:text-gray-400"
				)}>
				<FaChevronCircleRight size={24} />
			</button>

			{/* Indicators */}
			<div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
				{images.map((_, index) => (
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
		</div>
	);
};

export default Carousel;
