import Image from "next/image";
import {
	Description,
	Field,
	Fieldset,
	FieldsetProps,
	Input,
	InputProps,
	Label,
	Legend,
	Select,
	SelectProps,
	Textarea,
	TextareaProps,
} from "@headlessui/react";
import { cn } from "@/lib/classnames";
import { Dispatch, FC, FormEvent, HTMLAttributes, SetStateAction } from "react";
import { FaChevronCircleDown } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

interface IProps {
	title: string;
	handleSubmit: () => void;
}

interface MyInputProps {
	label?: string;
	description?: string;
	options?: { label: string; value: any }[];
}

interface FileUploadProps extends MyInputProps {
	images: File[];
	setImages: Dispatch<SetStateAction<File[]>>;
	max?: number;
	multiple?: boolean;
}
interface FormProps extends FC<FieldsetProps & IProps> {
	InputField: FC<MyInputProps & InputProps>;
	SelectField: FC<MyInputProps & SelectProps>;
	TextareaField: FC<MyInputProps & TextareaProps>;
	ImageUploadField: FC<MyInputProps & FileUploadProps>;
}

export const Form: FormProps = ({
	title,
	handleSubmit,
	children,
	...props
}) => {
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit();
			}}
			className="w-full px-4 my-2">
			<Fieldset
				{...props}
				className="space-y-6 rounded-xl bg-white dark:bg-gray-700 p-6 sm:p-10 text-black">
				<Legend className="text-base/7 font-semibold dark:text-white">
					{title}
				</Legend>
				{children as JSX.Element}
			</Fieldset>
		</form>
	);
};

Form.InputField = ({ label, description, value, ...props }) => (
	<Field>
		{label && (
			<Label className="text-sm/6 font-medium dark:text-white">{label}</Label>
		)}
		{description && (
			<Description className="text-sm/6 dark:text-white/50">
				{description}
			</Description>
		)}
		<Input
			{...props}
			value={value}
			className={cn(
				"mt-3 block w-full rounded-lg border-2 py-1.5 px-3",
				"border-gray-200 bg-gray-100 dark:bg-white/5 text-sm/6 dark:text-white",
				"focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary-green",
				{ "bg-white": !!value }
			)}
		/>
	</Field>
);

Form.ImageUploadField = ({
	label,
	description,
	images,
	setImages,
	multiple = false,
	max = 3,
}) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) return;

		const newFiles = Array.from(event.target.files);
		setImages(multiple ? [...images, ...newFiles] : newFiles);
	};

	const removeImage = (index: number) => {
		setImages(images.filter((_, i) => i !== index));
	};
	return (
		<Field>
			{description && (
				<Description className="text-sm/6 font-medium dark:text-white">
					{description}
				</Description>
			)}
			{/* Styled Label as Upload Button */}
			{(multiple || images.length < 1) && images.length < max && (
				<label
					htmlFor="image-upload"
					className={cn(
						"mt-3 flex items-center justify-center w-full cursor-pointer rounded-lg bg-gray-100 dark:bg-white/10 py-2 px-4 text-sm font-medium text-black dark:text-white",
						"hover:bg-gray-300 dark:hover:bg-white/20"
					)}>
					{label}
				</label>
			)}

			{/* Hidden File Input */}
			<input
				id="image-upload"
				type="file"
				multiple={false}
				onChange={handleChange}
				className="hidden"
				accept="image/png, image/gif, image/jpeg"
			/>
			{/* Image Previews */}
			<div className="mt-3 flex gap-2 flex-wrap">
				{images.map((file, index) => (
					<div
						key={index}
						className="relative h-36 w-36">
						<Image
							src={URL.createObjectURL(file)}
							alt="Uploaded preview"
							className="h-full w-full object-cover rounded-lg"
							fill
						/>
						<FaRegTrashCan
							size={20}
							onClick={() => removeImage(index)}
							className="absolute -top-2 -right-2 bg-black/70 text-white p-1 rounded-full hover:bg-black transition hover:cursor-pointer"
						/>
					</div>
				))}
			</div>
		</Field>
	);
};

Form.SelectField = ({ label, description, options = [], ...props }) => (
	<Field>
		{label && (
			<Label className="text-sm/6 font-medium dark:text-white">{label}</Label>
		)}
		{description && (
			<Description className="text-sm/6 dark:text-white/50">
				{description}
			</Description>
		)}
		<div className="relative">
			<Select
				{...props}
				className={cn(
					"mt-3 block w-full appearance-none rounded-lg border-2 border-gray-200 bg-gray-100 dark:bg-white/5 py-1.5 px-3 text-sm/6 dark:text-white",
					"focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary-green",
					"*:text-black"
				)}>
				{options.map((option, index) => (
					<option
						key={index}
						value={option.value}>
						{option.label}
					</option>
				))}
			</Select>
			<FaChevronCircleDown
				className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
				aria-hidden="true"
			/>
		</div>
	</Field>
);

Form.TextareaField = ({ label, description, className, value, ...props }) => (
	<Field>
		{label && (
			<Label className="text-sm/6 font-medium dark:text-white">{label}</Label>
		)}
		{description && (
			<Description className="text-sm/6 dark:text-white/50">
				{description}
			</Description>
		)}
		<Textarea
			{...props}
			className={cn(
				"mt-3 block w-full rounded-lg border-2 border-gray-200 py-1.5 px-3 text-sm/6",
				"bg-gray-100 dark:bg-white/5 dark:text-white",
				"focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary-green",
				{ "bg-white": !!value },
				className
			)}
			rows={3}
			value={value}
		/>
	</Field>
);

// Example usage
export default function FormExample() {
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		alert("Form submitted!");
	};

	return (
		<Form
			title="User Information"
			handleSubmit={() => {}}>
			<Form.InputField label="Full Name" />
			<Form.SelectField
				label="Country"
				description="Select your country"
				options={[
					{ value: "us", label: "United States" },
					{ value: "ca", label: "Canada" },
					{ value: "mx", label: "Mexico" },
				]}
			/>
			<Form.TextareaField
				label="Bio"
				description="Tell us about yourself."
			/>
		</Form>
	);
}
