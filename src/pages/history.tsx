import nookies from 'nookies';
import { GetServerSideProps } from 'next';
import NavBarImpressum from '~/components/NavBarOnlyLogo';
import GoBackBtn from '~/components/GoBackBtn';
import Footer from '~/components/Footer';
import ExerciseHistory from '~/components/ExerciseHistory';
import getHistoryDB from '~/helper/getHistoryDB';
interface Props {
	exerciseHistory: {
		letterEqual: number[];
		textToTranslate: string;
		translatedTextSplitted: string[];
		translationResult: string;
	}[];
}

export default function History({ exerciseHistory }: Props): JSX.Element {
	return (
		<>
			<NavBarImpressum />
			<div className="flex flex-col items-center bg-[#212123] text-gray-300 w-full pt-10 pb-10">
				<ExerciseHistory exerciseHistory={exerciseHistory} />
				<div className="mt-8">
					<GoBackBtn />
				</div>
			</div>
			<Footer />
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx: {}) => {

	const userId = nookies.get(ctx).UserId;

	if (userId !== undefined) {
		const filtered = await getHistoryDB(userId, 60);

		return {
			props: { exerciseHistory: filtered },
		};
	}

	return {
		props: { exerciseHistory: null },
	};
};
