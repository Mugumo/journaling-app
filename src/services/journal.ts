import { mockCategories, mockJournalLabels } from "@/data/mock";
import { prisma } from "@/lib/prisma";
import { JournalData } from "@/types/data-types";
import { Category, Label } from "@prisma/client";
import { Session } from "next-auth";
import toast from "react-hot-toast";

export const fetchInitialJournals = async (
	session: Session
): Promise<JournalData[]> => {
	let retrievedJournals = await prisma.journalEntry.findMany({
		take: 10,
		where: { authorId: session.user.id },
		include: {
			category: true,
			images: true,
			labels: true,
		},
		orderBy: { createdAt: "desc" },
	});
	retrievedJournals.map((journal) => ({
		...journal,
		createdAt: journal.createdAt.toISOString(),
		updatedAt: journal.updatedAt.toISOString(),
	}));
	return retrievedJournals;
};

export const fetchJournals = async (page: number): Promise<JournalData[]> => {
	const res = await fetch(`/api/journals?page=${page}`);
	const data = await res.json();
	return data;
};

export const fetchJournalCategories = async (session: Session | null) : Promise<Category[]> => {
	if (!session?.user?.id) {
		toast.error("No user session found.");
		return [];
	}

	try {
		const response = await fetch(`/api/categories?userId=${session.user.id}`);

		if (!response.ok) {
			throw new Error(`Failed to fetch categories: ${response.statusText}`);
		}

		const data = await response.json();
		if (data.length === 0) return mockCategories;
		else return data;
	} catch (error) {
		console.error("Error fetching journal categories:", error);
		return [];
	}
};

export const fetchJournalLabels = async (session: Session | null) : Promise<Label[]> => {
	if (!session?.user?.id) {
		toast.error("No user session found.");
		return [];
	}

	try {
		const response = await fetch(`/api/labels?userId=${session.user.id}`);

		if (!response.ok) {
			throw new Error(`Failed to fetch labels: ${response.statusText}`);
		}

		const data = await response.json();
		if (data.length === 0) return mockJournalLabels;
		else return data;
	} catch (error) {
		console.error("Error fetching journal labels:", error);
		return [];
	}
};
