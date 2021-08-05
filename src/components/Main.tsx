import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/solid';
import textEqual from '~/helper/textEqual';
import Context from '~/utils/context';
import pickRandomExercise from '~/helper/pickRandomExercise';
import present from '~/data/ger-en/present';
import past from '~/data/ger-en/past';
import future from '~/data/ger-en/future';
import ExerciseHistory from './ExerciseHistory';
import nookies from 'nookies';

const exerciseHistory: {
	letterEqual: number[];
	textToTranslate: string;
	translatedTextSplitted: string[];
	translationResult: string;
}[] = [];

export default function Main(): JSX.Element {
	const [translatedText, setTranslatedText] = useState('');
	const {
		textToTranslate,
		setTextToTranslate,
		translationResult,
		setTranslationResult,
		properties,
		cookie,
		ctx,
	} = useContext(Context) || {};

	useEffect(() => {
		if (properties !== undefined) {
			for (let i = 0; i < properties.length; i++) {
				exerciseHistory.push(properties[i]);
				if (exerciseHistory.length === 2) {
					exerciseHistory.pop();
				}
			}
		}
	});

	useEffect(() => {
		pickExercise();
	}, []);

	const addExercise = async (
		letterEqual: number[],
		translatedTextSplitted: string[],
	) => {
		fetch(
			`https://english-sentence-trainer.vercel.app/api/exercises?letterEqual=${letterEqual}&textToTranslate=${textToTranslate}&translationResult=${translationResult}&translatedTextSplitted=${translatedTextSplitted}&cookie=${cookie}`,
		);
	};

	function pickExercise() {
		let file: { ger: string; en: string }[] = [{ ger: '', en: '' }];

		switch (nookies.get(ctx)['SelectedLanguageMode']) {
			case 'Random':
				file = pickRandomExercise();
				break;
			case 'Present':
				file = present;
				break;
			case 'Past':
				file = past;
				break;
			case 'Future':
				file = future;
				break;
		}

		const randomNum = Math.floor(Math.random() * file.length);
		setTextToTranslate(file[randomNum].ger);
		setTranslationResult(file[randomNum].en);
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (translatedText.length !== 0) {
			const translatedTextSplitted = translatedText.split('');
			const letterEqual = textEqual(translatedText, translationResult, ctx);
			exerciseHistory.unshift({
				letterEqual,
				textToTranslate,
				translationResult,
				translatedTextSplitted,
			});

			addExercise(letterEqual, translatedTextSplitted);
			setTranslatedText('');
			if (exerciseHistory.length === 2) {
				exerciseHistory.pop();
			}
		}
		pickExercise();
	};

	return (
		<div className="flex flex-col justify-items-center bg-[#212123] h-full w-full text-gray-300 items-center">
			<p className="h-1/4 flex px-20 items-center justify-center  text-4xl text-center">
				{textToTranslate}
			</p>
			<form className="w-3/4 mb-24" onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Enter the translation"
					value={translatedText}
					onChange={(e) => setTranslatedText(e.target.value)}
					className="h-24 w-full text-2xl text-center rounded-lg text-white bg-[#706CF9]"
				/>
			</form>
			<ExerciseHistory exerciseHistory={exerciseHistory} />
			{exerciseHistory.length !== 0 && (
				<Link href="/history">
					<a className="focus:outline-none focus-visible:ring-2 ring-white rounded-lg border-solid p-1 m-5">
						<ChevronDownIcon className="h-10 w-10 text-grey-300 cursor-pointer" />
					</a>
				</Link>
			)}
		</div>
	);
}
