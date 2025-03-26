import { Button } from "@/components/ui";
import {
	Dialog,
	DialogPanel,
	DialogPanelProps,
	DialogProps,
	DialogTitle,
	DialogTitleProps,
	useClose,
} from "@headlessui/react";
import { FC, useState } from "react";
import { cn } from "@/lib/classnames";
import { IoMdCloseCircle } from "react-icons/io";

interface ModalProps extends FC<DialogProps> {
	// Title: FC<DialogTitleProps>;
	Panel: FC<
		DialogPanelProps & {
			size?: "sm" | "md" | "lg" | "xl" | "2xl";
		}
	>;
}
export const Modal: ModalProps = ({ open, onClose, children, ...props }) => {
	return (
		<Dialog
			{...props}
			open={open}
			as="div"
			className="relative z-10 focus:outline-none"
			onClose={onClose}>
			<div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/10">
				<div className="flex min-h-full items-center justify-center p-4">
					{children as JSX.Element}
				</div>
			</div>
		</Dialog>
	);
};

Modal.Panel = ({ children, size = "md", title, ...props }) => {
	let close = useClose();
	return (
		<DialogPanel
			{...props}
			className={cn(
				"w-full max-w-md rounded-xl dark:bg-white/5 bg-dark-navy/40 p-6",
				"backdrop-blur-2xl duration-300 ease-out",
				"data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0",
				{ "max-w-lg": size === "lg" },
				{ "max-w-xl": size === "xl" },
				{ "max-w-2xl": size === "2xl" }
			)}>
			<DialogTitle
				as="h3"
				className="text-xl font-bold text-white flex w-full justify-between items-start">
					{title}
				<IoMdCloseCircle
					onClick={() => close()}
					size={25}
					className="hover:cursor-pointer z-50"
				/>
			</DialogTitle>
			<div className="min-h-32 max-h-[80vh] overflow-y-auto">
				{children as JSX.Element}
			</div>
		</DialogPanel>
	);
};

// Example usage
export default function ModalExample() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Button
				onClick={() => setIsOpen(true)}
				className="rounded-md bg-black/20 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white">
				Open Modal
			</Button>
			<Modal
				open={isOpen}
				onClose={() => setIsOpen(false)}>
				<DialogTitle>Payment Successful</DialogTitle>
				<Modal.Panel>
					<p className="mt-2 text-sm text-white/50">
						Your payment has been successfully submitted. We've sent you an
						email with all the details of your order.
					</p>
					<div className="mt-4">
						<Button
							className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
							onClick={() => setIsOpen(false)}>
							Got it, thanks!
						</Button>
					</div>
				</Modal.Panel>
			</Modal>
		</>
	);
}
