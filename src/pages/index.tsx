import { Main } from '~/components/Main';
import { NavBar } from '~/components/NavBar';
import React, { useState } from 'react';
import { Context } from '~/utils/context';

export default function Home(): JSX.Element {
	const [languageMode, setLanguageMode] = useState('Random');
	const [questionLanguage, setQuestionLanguage] = useState('Ger');
	const [answerLanguage, setAnswerLangauge] = useState('En');

	const [textToTranslate, setTextToTranslate] = useState('');
	const [translationResult, setTranslationResult] = useState('');
	const [file, setFile] = useState([{ ger: '', en: '' }]);

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
				}}
			>
				<NavBar />
				<Main />
			</Context.Provider>
		</div>
	);
}
