import nookies from 'nookies';
import { GetServerSideProps } from 'next';
import connectToDatabase from '~/utils/mongodb';
import NavBarImpressum from '~/components/NavBarImpressum';
import GoBackBtn from '~/components/GoBackBtn';
import Footer from '~/components/Footer';
import Exercise from '~/components/Exercise';
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
				<Exercise exerciseHistory={exerciseHistory} />
				<div className="mt-8">
					<GoBackBtn />
				</div>
			</div>
			<Footer />
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx: {}) => {
	const { db } = await connectToDatabase();

	const cookie = nookies.get(ctx).Cookie;

	if (cookie !== undefined) {
		const data = await db
			.collection('exercises')
			.aggregate([
				{
					$search: {
						index: 'default',
						text: {
							query: cookie,
							path: 'data.cookie',
						},
					},
				},
			])
			.sort({ _id: -1 })
			.limit(60)
			.toArray();

		const properties = JSON.parse(JSON.stringify(data));

		const filtered = properties.map(
			(property: {
				_id: number;
				data: {
					letterEqual: string;
					textToTranslate: string;
					translatedTextSplitted: string;
					translationResult: string;
				};
			}) => {
				const letterEqualArray = property.data.letterEqual.split(',');

				const letterEqualNumber = letterEqualArray.map((letter: string) => {
					return parseInt(letter);
				});

				const translatedTextSplitted =
					property.data.translatedTextSplitted.split(',');

				return {
					_id: property._id,
					letterEqual: letterEqualNumber,
					textToTranslate: property.data.textToTranslate,
					translationResult: property.data.translationResult,
					translatedTextSplitted,
				};
			},
		);

		return {
			props: { exerciseHistory: filtered },
		};
	}

	return {
		props: { exerciseHistory: null },
	};
};
