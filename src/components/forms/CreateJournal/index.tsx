import { fetchJournalCategories, fetchJournalLabels } from "@/services/journal";
import { SelectOption } from "@/types/input";
import { Category, Label } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { prisma } from "@/lib/prisma";
import toast from "react-hot-toast";
import { supabase } from "@/services/supabase";
import { v4 as uuidv4 } from "uuid";
import { Stepper } from "@/components/ui";
import { cn } from "@/lib/classnames";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Form } from "@/components/ui";

export type NewJournal = {
	title: string;
	body: string;
	images: string[];
	labels: { id?: string; color: string; name: string }[];
	category: string;
};
interface IProps {
	onComplete: () => void;
}
export const CreateJournal = ({ onComplete }: IProps) => {
	const [loading, setLoading] = useState(false);

	const { data: session } = useSession();
	const [categories, setCategories] = useState<Category[]>([]);
	const [labels, setLabels] = useState<Label[]>([]);

	useEffect(() => {
		if (session) {
			fetchJournalCategories(session).then(setCategories);
			fetchJournalLabels(session).then(setLabels);
		}
	}, [session]);

	const categoryOptions: SelectOption[] = [
		{ label: "None", value: "" },
		...categories.map((category) => ({
			label: category.name,
			value: category.id,
		})),
	];

	const labelOptions: SelectOption[] = [
		{ label: "None", value: "" },
		...labels.map((label) => ({
			label: label.name,
			value: label.id,
		})),
	];

	const [journal, setJournal] = useState<NewJournal>({
		title: "",
		body: "",
		images: [],
		labels: [],
		category: "",
	});
	const [images, setImages] = useState<File[]>([]);
	const [currentIndex, setCurrentIndex] = useState<number>(0);

	const saveJournalEntry = async (journal: NewJournal) => {
		if (!session) {
			throw new Error("User not authenticated");
		}
		setLoading(true);
		try {
			// Upload images to Supabase and get public URLs
			const uploadedImages = await Promise.all(
				journal.images.map(async (file, index) => {
					const fileExt = file.split(".").pop();
					const fileName = `${session.user.name
						?.replace(/ /g, "_")
						.replace(/\//g, "_")}/${uuidv4()}-${index}.${fileExt}`;
					const { data, error } = await supabase.storage
						.from("journaling-app")
						.upload(fileName, file, {
							cacheControl: "3600",
							upsert: false,
						});

					if (error) {
						console.error("Image upload error:", error);
						throw new Error("Failed to upload images");
					}

					// Get the public URL of the uploaded file
					return supabase.storage.from("journaling-app").getPublicUrl(data.path)
						.data.publicUrl;
				})
			);

			const newJournal = await prisma.journalEntry.create({
				data: {
					title: journal.title,
					body: journal.body,
					images: {
						create: uploadedImages.map((imageURL) => ({
							fileUrl: imageURL,
						})),
					},
					categoryId: journal.category || null,
					labels: {
						connect: journal.labels.map((label) => ({ id: label.id })),
					},
					authorId: session.user.id,
				},
			});
			setJournal({
				title: "",
				body: "",
				images: [],
				category: "",
				labels: [],
			});
			return newJournal;
		} catch (error) {
			console.error("Error saving journal entry:", error);
			toast.error("Failed to save journal entry");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Stepper
			disabled={loading}
			{...{ currentIndex, setCurrentIndex }}>
			<Form
				title={journal.title || "Untitled Journal"}
				handleSubmit={() => {}}>
				<Form.InputField
					label="Title"
					value={journal.title}
					onChange={(e) =>
						setJournal((prev) => ({ ...prev, title: e.target.value }))
					}
				/>
				<p className="text-sm dark:text-gray-300">
					Place your thoughts on this canvas.
				</p>
				<Form.TextareaField
					value={journal.body}
					onChange={(e) => {
						if (e.target.value) {
							setJournal((prev) => ({ ...prev, body: e.target.value }));
						} else setJournal((prev) => ({ ...prev, body: "" }));
					}}
					className={"h-72"}
				/>
			</Form>
			<Form
				title="Upload some images"
				handleSubmit={() => {}}>
				<p className="dark:text-gray-300">
					You can add some images here to go with your entry... if you'd like.
				</p>
				<Form.ImageUploadField
					{...{
						images,
						setImages,
						label: "Click to Upload",
						description: "Upload some photos",
						multiple: true,
					}}
				/>
			</Form>
			<Form
				title="Time for some labelling"
				handleSubmit={() => {}}>
				<p className="dark:text-gray-300">
					What was the theme of the journal? Got any labels for it?
				</p>
				<Form.SelectField
					label="Category"
					description=""
					value={journal.category}
					options={categoryOptions}
					onChange={(e) =>
						setJournal((prev) => ({ ...prev, category: e.target.value }))
					}
				/>
				<Form.SelectField
					label="Labels"
					description=""
					options={labelOptions}
					onChange={(e) => {
						setJournal((prev) => ({
							...prev,
							labels: [
								...prev.labels,
								labels.find((label) => label.id === e.target.value)!,
							],
						}));
					}}
				/>
				<div className="flex flex-wrap gap-2 py-1">
					{journal.labels.map((thisLabel) => {
						return (
							<div
								className={cn(
									"font-bold flex items-center gap-2 text-sm text-white",
									"lowercase px-2 py-[0.2rem] rounded-xl bg-gray-300 dark:bg-white/5"
								)}
								style={{ backgroundColor: thisLabel.color }}>
								{thisLabel.name}
								<IoIosCloseCircleOutline
									className="hover:cursor-pointer"
									size={15}
									onClick={() => {
										setJournal((prev) => ({
											...prev,
											labels: [
												...prev.labels.filter(
													(_label) => _label.name !== thisLabel.name
												),
											],
										}));
									}}
								/>
							</div>
						);
					})}
				</div>
			</Form>
		</Stepper>
	);
};
