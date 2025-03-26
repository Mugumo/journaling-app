import { Card, Carousel } from "..";
import { JournalData } from "@/types/data-types";
import { format } from "date-fns";
import { cn } from "@/lib/classnames";
import { getPublicImageUrl } from "@/services/supabase";

interface IProps {
	journal: JournalData;
}

export const JournalCard = ({
	journal: { title, images, labels, ...entry },
}: IProps) => {
	return (
		<Card
			size="lg"
			className="min-w-[22rem] flex flex-col gap-2 h-fit overflow-clip">
			<div
				className={cn("w-full rounded-b-lg h-[12rem] overflow-clip", {
					"h-0": images.length === 0,
				})}>
				<Carousel {...{ images: images.map((image) => getPublicImageUrl(image.fileUrl)) }} />
			</div>
			<div className={cn("h-fit truncate overflow-hidden")}>
				<p className="">{title}</p>
				<div className="flex w-full justify-between">
					<p className="text-right font-bold text-gray-600 dark:text-gray-400 text-xs mb-2 whitespace-normal">
						{format(
							typeof entry.createdAt === "string"
								? new Date(entry.createdAt)
								: entry.createdAt,
							"EEEE, MMMM do, yyyy"
						)}
					</p>
					<p className="text-right font-bold text-gray-600 dark:text-gray-400 text-xs mb-2 whitespace-normal">
						{format(
							typeof entry.createdAt === "string"
								? new Date(entry.createdAt)
								: entry.createdAt,
							"h:mm a"
						)}
					</p>
				</div>
				<p className="text-sm text-justify whitespace-normal text-ellipsis overflow-hidden line-clamp-3 dark:text-white">
					{entry.body}
				</p>
				{labels?.length > 0 && (
					<div className="flex flex-wrap gap-2 py-1">
						{labels.map((label) => (
							<div 
							style={{ backgroundColor: label.color }}
							className={cn("text-sm text-white  font-medium lowercase px-3 py-[0.2rem] rounded-xl bg-gray-300 dark:bg-white/5")}>
								{label.name}
							</div>
						))}
					</div>
				)}
			</div>
		</Card>
	);
};
