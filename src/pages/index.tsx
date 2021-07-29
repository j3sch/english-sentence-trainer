import { Main } from '~/components/Main';
import { NavBar } from '~/components/NavBar';
import React, { useState } from 'react';
import { Context } from '~/utils/Context';

export default function Home(): JSX.Element {
	const [languageMode, setLanguageMode] = useState('Random');
	const [questionLanguage, setQuestionLanguage] = useState('Ger');
	const [answerLanguage, setAnswerLangauge] = useState('En');

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
				}}
			>
				<NavBar />
				<Main />
			</Context.Provider>
		</div>
	);
}
