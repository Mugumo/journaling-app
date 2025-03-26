import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma"; // Ensure Prisma is correctly set up

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { page = 1 } = req.query;
	const pageSize = 10;
	const skip = (Number(page) - 1) * pageSize;

	try {
		const journals = await prisma.journalEntry.findMany({
			skip,
			take: pageSize,
			include: {
				category: true,
				images: true,
				labels: true,
			},
			orderBy: { createdAt: "desc" },
		});

		res.status(200).json(journals);
	} catch (error) {
		console.error("Error fetching journals:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}