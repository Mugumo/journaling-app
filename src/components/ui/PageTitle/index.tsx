interface IProps {
	title: string;
}
export const PageTitle = ({ title }: IProps) => {
	return <p className="text-3xl font-bold w-full">{title}</p>;
};
