import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma"; // Assuming you are using Prisma
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const userId = req.query.userId as string;

  if (!session?.user?.id || session.user.id !== userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const categories = await prisma.category.findMany({
      where: {
        OR: [{ creatorID: userId }, { creatorID: null }],
      },
    });

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
