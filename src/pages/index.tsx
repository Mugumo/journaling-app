import {
	Breadcrumbs,
	Crumb,
	JournalList,
	Page,
	PageTitle,
	SubTitle,
	Title,
	Wrapper,
} from "@/components/ui";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { GetServerSideProps } from "next/types";
import { authOptions } from "./api/auth/[...nextauth]";
// import { fetchInitialJournals } from "@/services/journal";
import { JournalData } from "@/types/data-types";
import { mockJournalEntries } from "@/data/mock";

interface IProps {
	journals: JournalData[];
}
export default function Home({ journals }: IProps) {
	const breadCrumbs: Crumb[] = [
		{
			name: "Dashboard",
			url: "/",
		},
	];

	const { data: session } = useSession();

	return (
		<Page pageTitle="Dashboard">
			<div className="w-full px-5 pb-36 flex flex-col between gap-3">
				<div className="flex flex-col my-2">
					<Breadcrumbs trail={breadCrumbs} />
					<PageTitle title="Your journals" />
					<SubTitle title={`Welcome back, ${session?.user?.name}`} />
				</div>
				<JournalList {...{ journals }} />
			</div>
		</Page>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { req, res } = context;
	const session = await getServerSession(req, res, authOptions);

	// Redirect to sign-in if no session
	if (!session) {
		return {
			redirect: {
				destination: "/auth/signin",
				permanent: false,
			},
		};
	}

	// Fetch user's journal entries
	// const journals = await fetchInitialJournals(session);

	const journals = [...mockJournalEntries, ...mockJournalEntries];

	return {
		props: { journals },
	};
};
