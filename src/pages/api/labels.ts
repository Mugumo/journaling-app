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
    const labels = await prisma.label.findMany({
      where: {
        OR: [{ creatorID: userId }],
      },
    });

    res.status(200).json(labels);
  } catch (error) {
    console.error("Error fetching labels:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
