import React, { useState } from 'react';
import nookies from 'nookies';
import { GetServerSideProps } from 'next';
import Main from '~/components/Main';
import NavBar from '~/components/NavBar';
import Context from '~/utils/context';
import connectToDatabase from '~/utils/mongodb';
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
	cookie: string;
	ctx: {};
}

export default function Home({ properties, cookie, ctx }: props): JSX.Element {
	function getCurrentMode() {
		const cookies = nookies.get(ctx);

		if (cookies.SelectedLanguageMode === undefined) {
			return 'Random';
		}
		return cookies.SelectedLanguageMode;
	}

	const [languageMode, setLanguageMode] = useState(getCurrentMode());
	const [questionLanguage, setQuestionLanguage] = useState('GER');
	const [answerLanguage, setAnswerLangauge] = useState('EN');
	const [switchLanguage, setSwitchLanguage] = useState(false);

	const [textToTranslate, setTextToTranslate] = useState('');
	const [translationResult, setTranslationResult] = useState('');
	const [file, setFile] = useState([{ ger: '', en: '' }]);

	return (
		<div className="h-full w-full overflow-hidden">
			<Context.Provider
				value={{
					languageMode,
					setLanguageMode,
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
					cookie,
					ctx,
					setSwitchLanguage,
					switchLanguage,
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

export const getServerSideProps: GetServerSideProps = async (ctx: {}) => {
	const randomstring = require('randomstring');

	let randomString;

	const cookies = nookies.get(ctx);

	if (cookies.Cookie === undefined) {
		randomString = randomstring.generate();
		nookies.set(ctx, 'Cookie', randomString, {
			path: '/',
			maxAge: 10 * 365 * 24 * 60 * 60,
		});
	}
	const cookie = cookies.Cookie;

	if (cookie !== undefined) {
		const filtered = await getHistoryDB(cookie);
		return {
			props: { properties: filtered, cookie },
		};
	}
	return {
		props: { cookie: randomString },
	};
};
