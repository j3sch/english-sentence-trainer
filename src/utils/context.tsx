import { createContext } from 'react';
import { Dispatch, SetStateAction } from 'react';

interface ContextProps {
	languageMode: string;
	setLanguageMode: Dispatch<SetStateAction<string>>;
	questionLanguage: string;
	setQuestionLanguage: Dispatch<SetStateAction<string>>;
	answerLanguage: string;
	setAnswerLangauge: Dispatch<SetStateAction<string>>;
}

export const Context = createContext({} as ContextProps);
