import { createContext } from 'react';
import { Dispatch, SetStateAction } from 'react';
interface ContextProps {
	languageMode: string;
	setLanguageMode: Dispatch<SetStateAction<string>>;
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
		letterEqual: number[];
		translatedTextSplitted: string[];
		translationResult: string;
	};
}

export const Context = createContext({} as ContextProps);
