import { JournalImage, Category, Label, JournalEntry } from "@prisma/client";

export interface JournalData {
    id: string;
    title: string;
    body: string;
    categoryId: string | null;
    authorId: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    images: JournalImage[];
    category: Category | null;
    labels: Label[];
  }