import { Main } from '~/components/Main';
import { NavBar } from '~/components/NavBar';
import React, { useState } from 'react';
import { Context } from '~/utils/context';
import { connectToDatabase } from '~/utils/mongodb';
import nookies from 'nookies';
const randomstring = require('randomstring');
import Footer from '~/components/Footer';

export default function Home({ properties, cookie, ctx }: any): JSX.Element {
	const [languageMode, setLanguageMode] = useState(getCurrentMode());
	const [questionLanguage, setQuestionLanguage] = useState('Ger');
	const [answerLanguage, setAnswerLangauge] = useState('En');

	const [textToTranslate, setTextToTranslate] = useState('');
	const [translationResult, setTranslationResult] = useState('');
	const [file, setFile] = useState([{ ger: '', en: '' }]);

	function getCurrentMode() {
		let cookies = nookies.get(ctx);

		if (cookies['SelectedLanguageMode'] === undefined) {
			return 'Random';
		} else {
			return cookies['SelectedLanguageMode'];
		}
	}

	return (
		<div className="h-full w-full">
			<Context.Provider
				value={{
					languageMode,
					setLanguageMode,
					questionLanguage,
					setQuestionLanguage,
					answerLanguage,
					setAnswerLangauge,
					//text
					textToTranslate,
					setTextToTranslate,
					translationResult,
					setTranslationResult,
					file,
					setFile,
					properties,
					cookie,
					ctx,
				}}
			>
				<NavBar />
				<Main />
				<Footer />
			</Context.Provider>
		</div>
	);
}

export async function getServerSideProps(ctx: {}) {
	const { db } = await connectToDatabase();
	let randomString;

	let cookies = nookies.get(ctx);

	if (cookies['Cookie'] === undefined) {
		randomString = randomstring.generate();
		nookies.set(ctx, 'Cookie', randomString, {
			path: '/',
			maxAge: 10 * 365 * 24 * 60 * 60,
		});
	}
	const cookie = cookies['Cookie'];

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
			.limit(2)
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
					translatedTextSplitted: translatedTextSplitted,
				};
			},
		);
		return {
			props: { properties: filtered, cookie },
		};
	}
	{
		return {
			props: { cookie: randomString },
		};
	}
}
