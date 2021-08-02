import connectToDatabase from '~/utils/mongodb';

export default async function handler(req, res) {
	const { db } = await connectToDatabase();

	const data = req.query;

	const response = await db.collection('exercises').insertOne({ data });

	res.json(response);
}
