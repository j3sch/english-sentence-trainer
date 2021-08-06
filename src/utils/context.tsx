import { createContext, Dispatch, SetStateAction } from 'react';

interface ContextProps {
	questionLanguage: string;
	setQuestionLanguage: Dispatch<SetStateAction<string>>;
	answerLanguage: string;
	setAnswerLangauge: Dispatch<SetStateAction<string>>;
	textToTranslate: string;
	setTextToTranslate: Dispatch<SetStateAction<string>>;
	translationResult: string;
	setTranslationResult: Dispatch<SetStateAction<string>>;
	file: { ger: string; en: string }[];
	setFile: Dispatch<SetStateAction<{ ger: string; en: string }[]>>;
	properties: {
		_id: number;
		letterEqual: number[];
		textToTranslate: string;
		translatedTextSplitted: string[];
		translationResult: string;
	}[];
	userId: string;
}

export default createContext({} as ContextProps);
