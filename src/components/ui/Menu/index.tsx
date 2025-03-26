import {
	Menu as HuMenu,
	MenuButton as HuMenuButton,
	MenuItem as HuMenuItem,
	MenuItems as HuMenuItems,
	MenuProps,
	MenuButtonProps,
	MenuItemsProps,
	MenuItemProps,
	MenuSectionProps,
	MenuSection,
} from "@headlessui/react";
import { FC, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/classnames";

interface IMenu extends FC<MenuProps> {
	Button: FC<MenuButtonProps>;
	Items: FC<MenuItemsProps>;
	Item: FC<MenuItemProps & HTMLAttributes<HTMLButtonElement>>;
	MenuSection: FC<MenuSectionProps>;
}

export const Menu: FC<MenuProps> & IMenu = ({ children, ...props }) => {
	return <HuMenu {...props}>{children}</HuMenu>;
};

const Button: FC<MenuButtonProps> = ({ children }) => {
	return (
		<HuMenuButton
			className={cn(
				"inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold",
				"shadow-inner shadow-white/10 focus:outline-none",
				"dark:shadow-none"
			)}>
			{children}
		</HuMenuButton>
	);
};

const Items: FC<MenuItemsProps> = ({ children }) => {
	return (
		<HuMenuItems
			transition
			anchor="top start"
			className={cn(
				"w-52 rounded-xl border border-white/80 bg-white p-1",
				"dark:bg-gray-700/80 dark:text-white",
				"text-sm/6 text-black font-medium",
				"transition duration-100 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
			)}>
			{children}
		</HuMenuItems>
	);
};

const Item: FC<MenuItemProps & HTMLAttributes<HTMLButtonElement>> = ({
	children,
	...props
}) => {
	return (
		<HuMenuItem>
			<button
				{...props}
				className={cn(
					"group flex w-full items-center gap-2 rounded-lg py-1.5 px-3"
				)}>
				{children as ReactNode}
			</button>
		</HuMenuItem>
	);
};

Menu.Button = Button;
Menu.Items = Items;
Menu.Item = Item;
Menu.MenuSection = MenuSection;

export default Menu;
