import nookies from 'nookies';
import { GetServerSideProps } from 'next';
import connectToDatabase from '~/utils/mongodb';
import NavBarImpressum from '~/components/NavBarImpressum';
import GoBackBtn from '~/components/GoBackBtn';

interface Props {
	exerciseHistory: {
		letterEqual: number[];
		textToTranslate: string;
		translatedTextSplitted: string[];
		translationResult: string;
	}[];
}

export default function History({ exerciseHistory }: Props): JSX.Element {
	let counter = 0;
	return (
		<>
			<NavBarImpressum />
			<div className="flex flex-col min-h-[85%] items-center bg-[#212123] text-gray-300 w-full pt-10 pb-28">
				{exerciseHistory.map(
					(
						historyItem: {
							letterEqual: number[];
							textToTranslate: string;
							translatedTextSplitted: string[];
							translationResult: string;
						},
						i: number,
					) => {
						return (
							historyItem !== undefined && (
								<div
									key={i}
									className="border-2 w-3/4 border-gray-600 text-center text-xl flex flex-col justify-center items-center m-1"
								>
									<p className="h-12 p-2 border-b-2 border-gray-600 w-full border-opacity-30">
										{historyItem.textToTranslate}
									</p>
									<p className="h-12 p-2 border-b-2 border-gray-600 w-full border-opacity-30 bg-green-600 bg-opacity-30">
										{historyItem.translationResult}
									</p>
									<div className="h-12  w-full p-2 flex items-center justify-center">
										<p className="py-[0.3rem] border-l-[0.5px] border-gray-600 border-opacity-50 inline" />
										{historyItem.translatedTextSplitted.map(
											(translatedChar, j) => {
												translatedChar === ' ' && counter++;
												return historyItem.letterEqual[j - counter] === 1 ? (
													<p
														key={j}
														className="py-1 px-px bg-green-600 border-t-[0.5px] border-b-[0.5px] border-r-[0.5px] border-gray-600 border-opacity-50 bg-opacity-30 inline"
													>
														{translatedChar}
													</p>
												) : (
													<p
														key={j}
														className="py-1 px-px bg-red-600 border-t-[0.5px] border-b-[0.5px] border-r-[0.5px] border-gray-600 border-opacity-50 bg-opacity-30 inline"
													>
														{translatedChar}
													</p>
												);
											},
										)}
									</div>
								</div>
							)
						);
					},
				)}
				<div className="mt-8 mb-4">
					<GoBackBtn />
				</div>
			</div>
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
			.limit(40)
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
