import { useState } from "react";
import { JournalCard } from "../JournalCard";
import { JournalData } from "@/types/data-types";
import { Button } from "../Button";
import { SubTitle } from "../SubTitle";
import { format } from "date-fns";
import { fetchJournals } from "@/services/journal";
import cn from "classnames";
interface IProps {
	journals: JournalData[];
}

export const JournalList = ({ journals: initialJournals = [] }: IProps) => {
	const [journals, setJournals] = useState<JournalData[]>(initialJournals);
	const [page, setPage] = useState(2); // Start at 2 since page 1 is preloaded
	const [isFetching, setIsFetching] = useState(false);
	const [hasMore, setHasMore] = useState(true);

	const loadMoreJournals = async () => {
		if (isFetching || !hasMore) return;

		setIsFetching(true);
		try {
			const newJournals: JournalData[] = await fetchJournals(page);

			if (newJournals.length === 0) {
				setHasMore(false); // No more data available
			} else {
				setJournals((prev) => [...prev, ...newJournals]);
				setPage((prev) => prev + 1);
			}
		} catch (error) {
			console.error("Error fetching more journals:", error);
		} finally {
			setIsFetching(false);
		}
	};

	// Group journals by date (ignoring time)
	const groupedJournals = journals.reduce<{ [date: string]: JournalData[] }>(
		(acc, journal) => {
			const dateKey = format(
				new Date(journal.createdAt),
				"EEEE, MMMM do, yyyy"
			);
			if (!acc[dateKey]) acc[dateKey] = [];
			acc[dateKey].push(journal);
			return acc;
		},
		{}
	);

	// Sort grouped dates in descending order (newest first)
	const sortedDates = Object.keys(groupedJournals).sort(
		(a, b) => new Date(b).getTime() - new Date(a).getTime()
	);

	return (
		<div className="h-[90vh]">
			{/* Loader Overlay */}
			{isFetching && (
				<div className="fixed w-full h-full flex items-center justify-center bg-white bg-opacity-20 backdrop-blur-sm z-10">
					<div className="flex space-x-2">
						<div
							className="w-3 h-3 bg-gray-800 rounded-full animate-bounce"
							style={{ animationDelay: "0s" }}
						/>
						<div
							className="w-3 h-3 bg-gray-800 rounded-full animate-bounce"
							style={{ animationDelay: "0.2s" }}
						/>
						<div
							className="w-3 h-3 bg-gray-800 rounded-full animate-bounce"
							style={{ animationDelay: "0.4s" }}
						/>
					</div>
				</div>
			)}

			<div
				className={cn(
					"h-full overflow-y-auto bg-beige-dark dark:bg-slate-800 mx-2 rounded-xl p-2 flex flex-col gap-6  transition-opacity",
					{ "opacity-50": isFetching }
				)}>
				{sortedDates.map((date, idx) => (
					<div
						key={date}
						className="col-span-4">
						{/* Date Title */}
						<SubTitle
							title={date}
							className="text-lg font-bold underline text-gray-700 dark:text-gray-300 my-2 pl-5"
						/>
						<div className="w-full px-2 lg:px-5 xl:px-10 h-auto overflow-x-clip grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-flow-row gap-5 lg:gap-8 xl:gap-10">
							{/* Journal Entries for this Date */}
							{groupedJournals[date].map((journal, jdx) => (
								<JournalCard
									key={`${idx}-${jdx}`}
									journal={journal}
								/>
							))}
						</div>
					</div>
				))}

				{/* Load More Button */}
				{hasMore && (
					<Button
						onClick={loadMoreJournals}
						className="mx-auto w-40 rounded-md bg-gray-800 py-2 px-4 text-white shadow-md hover:bg-gray-700 disabled:bg-gray-500">
						{isFetching ? "Loading..." : "Load More"}
					</Button>
				)}

				{/* No More Data Message */}
				{!hasMore && (
					<p className="text-center text-gray-500 mt-4">
						No more journals to load.
					</p>
				)}
			</div>
		</div>
	);
};
