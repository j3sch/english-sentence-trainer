import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/solid';
import textEqual from '~/helper/textEqual';
import Context from '~/utils/context';
import pickRandomExercise from '~/helper/pickRandomExercise';
import simplePresent from '~/data/ger-en/simplePresent';
import presentProgressive from '~/data/ger-en/presentProgressive';
import simplePast from '~/data/ger-en/simplePast';
import pastProgressive from '~/data/ger-en/pastProgressive';
import presentPerfectProgressive from '~/data/ger-en/presentPerfectProgressive';
import simplePastPerfect from '~/data/ger-en/simplePastPerfect';
import willFuture from '~/data/ger-en/willFuture';
import goingToFuture from '~/data/ger-en/goingToFuture';
import simplePresentPerfect from '~/data/ger-en/simplePresentPerfect';

const exerciseHistory: {
	letterEqual: number[];
	textToTranslate: string;
	translatedTextSplitted: string[];
	translationResult: string;
}[] = [];

export default function Main(): JSX.Element {
	const [translatedText, setTranslatedText] = useState('');
	const {
		languageMode,
		textToTranslate,
		setTextToTranslate,
		translationResult,
		setTranslationResult,
		properties,
		cookie,
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

	const addExercise = async (
		letterEqual: number[],
		translatedTextSplitted: string[],
	) => {
		fetch(
			`http://localhost:3000/api/exercises?letterEqual=${letterEqual}&textToTranslate=${textToTranslate}&translationResult=${translationResult}&translatedTextSplitted=${translatedTextSplitted}&cookie=${cookie}`,
		);
	};

	function pickExercise() {
		let file: { ger: string; en: string }[] = [{ ger: '', en: '' }];
		switch (languageMode) {
			case 'Random':
				file = pickRandomExercise();
				break;
			case 'Simple Present':
				file = simplePresent;
				break;
			case 'Present Progressive':
				file = presentProgressive;
				break;
			case 'Simple Past':
				file = simplePast;
				break;
			case 'Past Progressive':
				file = pastProgressive;
				break;
			case 'Simple Present Perfect':
				file = simplePresentPerfect;
				break;
			case 'Present Perfect Progressive':
				file = presentPerfectProgressive;
				break;
			case 'Simple Past Perfect':
				file = simplePastPerfect;
				break;
			case 'will-future':
				file = willFuture;
				break;
			case 'going to-future':
				file = goingToFuture;
				break;
		}

		const randomNum = Math.floor(Math.random() * file.length);
		setTextToTranslate(file[randomNum].ger);
		setTranslationResult(file[randomNum].en);
	}

	let counter = 0;
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		counter = 0;
		if (translatedText.length !== 0) {
			const translatedTextSplitted = translatedText.split('');
			const letterEqual = textEqual(translatedText, translationResult);
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

	if (textToTranslate === '') {
		pickExercise();
	}
	return (
		<div className="flex flex-col justify-items-center bg-[#212123] h-full w-full text-gray-300 items-center">
			<p className="h-1/4 flex items-center justify-center  text-4xl text-center">
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
			{exerciseHistory.map((historyItem, i) => {
				return (
					historyItem !== undefined && (
						<div
							key={i}
							className="border-2 w-3/4 border-gray-600 text-center text-xl flex flex-col justify-center items-center m-1"
						>
							<p className="h-12 p-2 border-b-2 border-gray-600 w-full border-opacity-30">
								{historyItem.textToTranslate}
							</p>
							<p className="h-12 p-2 border-b-2 border-gray-600 w-full border-opacity-30 bg-green-600 bg-opacity-30">
								{historyItem.translationResult}
							</p>
							<div className="h-12  w-full p-2 flex items-center justify-center">
								<p className="py-[0.3rem] border-l-[0.5px] border-gray-600 border-opacity-50 inline" />
								{historyItem.translatedTextSplitted.map((translatedChar, j) => {
									translatedChar === ' ' && counter++;
									return historyItem.letterEqual[j - counter] === 1 ? (
										<p
											key={j}
											className="py-1 px-px bg-green-600 border-t-[0.5px] border-b-[0.5px] border-r-[0.5px] border-gray-600 border-opacity-50 bg-opacity-30 inline"
										>
											{translatedChar}
										</p>
									) : (
										<p
											key={j}
											className="py-1 px-px bg-red-600 border-t-[0.5px] border-b-[0.5px] border-r-[0.5px] border-gray-600 border-opacity-50 bg-opacity-30 inline"
										>
											{translatedChar}
										</p>
									);
								})}
							</div>
						</div>
					)
				);
			})}
			<Link href="/history">
				<ChevronDownIcon className="h-12 w-12 text-white m-6" />
			</Link>
		</div>
	);
}
