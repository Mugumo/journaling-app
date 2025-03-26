import { ReactNode } from "react";
import { Dialog as HeDialog } from "@headlessui/react";
import { MdOutlineClose } from "react-icons/md";
import { cn } from "@/lib/classnames";

interface Props {
	size?: "sm" | "md" | "lg" | "xl";
	title?: string | ReactNode;
	children: ReactNode;
	hideClose?: boolean;
	isOpen: boolean;
	backdropFill?: "bg-black/30" | "bg-black/70";
	onClose: () => void;
}

export const Dialog = ({
	isOpen,
	onClose,
	title,
	children,
	hideClose = false,
	backdropFill = "bg-black/30",
	size = "md",
}: Props) => {
	return (
		<HeDialog
			open={isOpen}
			onClose={onClose}
			className="relative z-[200]">
			<div
				className={`fixed inset-0 flex items-center justify-center ${backdropFill} p-4 backdrop-blur-[2px] dark:bg-black/80`}>
				<HeDialog.Panel
					className={cn(
						"w-full overflow-hidden rounded-2xl bg-white shadow-lg shadow-black/40 dark:bg-blue-dark",
						{
							"max-w-md": size === "sm",
							"max-w-3xl": size === "md",
							"max-w-6xl": size === "lg",
							"max-w-[70%]": size === "xl",
						}
					)}>
					<div className={cn("relative rounded-t px-4 flex")}>
						{title && (
							<h3 className="relative top-[2px] py-2 font-bold text-xl">
								{title}
							</h3>
						)}
						{!hideClose && (
							<button
								onClick={onClose}
								className="absolute right-0 top-0 flex-shrink p-2 ">
								<MdOutlineClose className="h-8 w-auto rounded-xl bg-black/5 ring-danger/70 ring-offset-2 transition hover:bg-danger/20 hover:text-danger hover:ring focus:outline-0 focus:ring focus:ring-black/30 dark:bg-blue-darker dark:text-white dark:ring-offset-blue-dark" />
							</button>
						)}
					</div>
					<div className="max-h-[85vh] overflow-y-auto pb-10">{children}</div>
				</HeDialog.Panel>
			</div>
		</HeDialog>
	);
};
