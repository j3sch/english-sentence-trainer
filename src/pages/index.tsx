import React, { useState } from 'react';
import nookies from 'nookies';
import { GetServerSideProps } from 'next';
import Main from '~/components/Main';
import NavBar from '~/components/NavBarMain';
import Context from '~/utils/context';
import Footer from '~/components/Footer';
import getHistoryDB from '~/helper/getHistoryDB';

interface props {
	properties: {
		_id: number;
		letterEqual: number[];
		textToTranslate: string;
		translationResult: string;
		translatedTextSplitted: string[];
	}[];
	userId: string;
}

export default function Home({ properties, userId }: props): JSX.Element {
	const [questionLanguage, setQuestionLanguage] = useState('GER');
	const [answerLanguage, setAnswerLangauge] = useState('EN');

	const [textToTranslate, setTextToTranslate] = useState('');
	const [translationResult, setTranslationResult] = useState('');
	const [file, setFile] = useState([{ ger: '', en: '' }]);

	return (
		<div className="h-full w-full overflow-hidden">
			<Context.Provider
				value={{
					questionLanguage,
					setQuestionLanguage,
					answerLanguage,
					setAnswerLangauge,
					textToTranslate,
					setTextToTranslate,
					translationResult,
					setTranslationResult,
					file,
					setFile,
					properties,
					userId,
				}}
			>
				<NavBar />
				<Main />
				<div className="fixed bottom-0  w-full max-w-7xl">
					<Footer />
				</div>
			</Context.Provider>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const randomstring = require('randomstring');

	let randomString;

	const cookies = nookies.get(ctx);

	if (cookies.UserId === undefined) {
		randomString = randomstring.generate();
		nookies.set(ctx, 'UserId', randomString, {
			path: '/',
			maxAge: 10 * 365 * 24 * 60 * 60,
			sameSite: 'strict',
		});
		nookies.set(ctx, 'SelectedLanguageMode', 'Random', {
			path: '/',
			maxAge: 10 * 365 * 24 * 60 * 60,
			sameSite: 'strict',
		});
	}
	const userId = cookies.UserId;

	if (userId !== undefined) {
		const filtered = await getHistoryDB(userId, 1);
		return {
			props: { properties: filtered, userId },
		};
	}
	return {
		props: { userId: randomString },
	};
};
