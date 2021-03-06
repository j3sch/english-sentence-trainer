import connectToDatabase from '~/utils/mongodb';

export default async function getHistoryDB(userId: string, limit: number) {
	const { db } = await connectToDatabase();

	const data = await db
		.collection('exercises')
		.aggregate([
			{
				$search: {
					index: 'default',
					text: {
						query: userId,
						path: 'data.UserId',
					},
				},
			},
		])
		.sort({ _id: -1 })
		.limit(limit)
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
	return filtered;
}
