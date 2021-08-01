import React, { useState, useContext, useEffect } from 'react';
import { textEqual } from '~/helper/textEqual';
import { Context } from '~/utils/context';
import { pickRandomExercise } from '~/helper/pickRandomExercise';

let exerciseHistory: {
	letterEqual: number[];
	translatedTextSplitted: string[];
	translationResult: string;
}[] = [];

export function Main() {
	const [translatedText, setTranslatedText] = useState('');
	const {
		languageMode,
		textToTranslate,
		setTextToTranslate,
		translationResult,
		setTranslationResult,
		file,
		setFile,
		properties,
		cookie,
	} = useContext(Context) || {};

	useEffect(() => {
		console.log(properties);
		if (properties !== undefined) {
			for (let i = 0; i < properties.length; i++) {
				exerciseHistory.push(properties[i]);
			}
		}
	}, []);

	let counter = 0;
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		counter = 0;
		if (translatedText.length !== 0) {
			const translatedTextSplitted = translatedText.split('');
			let letterEqual = textEqual(translatedText, translationResult);
			exerciseHistory.unshift({
				letterEqual,
				translationResult,
				translatedTextSplitted,
			});

			addExercise(letterEqual, translatedTextSplitted);
			setTranslatedText('');
			if (exerciseHistory.length === 4) {
				exerciseHistory.pop();
			}
		}
		pickExercise();
	};

	const addExercise = async (
		letterEqual: number[],
		translatedTextSplitted: string[],
	) => {
		const data = await fetch(
			`http://localhost:3000/api/exercises?letterEqual=${letterEqual}&translationResult=${translationResult}&translatedTextSplitted=${translatedTextSplitted}&cookie=${cookie}`,
		);
		console.log(data.json());
	};

	function pickExercise() {
		if (languageMode === 'Random') {
			setFile(pickRandomExercise());
			//TODO 
		}

		let randomNum = Math.floor(Math.random() * file.length);
		setTextToTranslate(file[randomNum].ger);
		setTranslationResult(file[randomNum].en);
	}

	if (textToTranslate === '') {
		pickExercise();
	}
	return (
		<div className="flex flex-col justify-items-center bg-[#212123] h-full w-full text-gray-300 items-center">
			<p className="h-1/4 flex items-center justify-center  text-4xl text-center">
				{textToTranslate}
			</p>
			<form className="w-3/4 mb-20" onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Enter the translation"
					value={translatedText}
					onChange={(e) => setTranslatedText(e.target.value)}
					className="h-24 w-full text-2xl text-center rounded-lg  bg-[#706CF9]"
				/>
			</form>
			{exerciseHistory.map((historyItem, i) => {
				return (
					historyItem !== undefined && (
						<div
							key={i}
							className="border-2 w-3/4 border-gray-600 text-center text-xl flex flex-col justify-center items-center m-1"
						>
							<p className="h-12 pt-3 border-b-2 border-gray-600 w-full border-opacity-30 bg-green-600 bg-opacity-30">
								{historyItem.translationResult}
							</p>
							<div className="h-12  w-full p-3">
								<p className="py-[0.3rem] border-l-[0.5px] border-gray-600 border-opacity-50 inline" />
								{historyItem.translatedTextSplitted.map((translatedChar, i) => {
									translatedChar === ' ' && counter++;
									return historyItem.letterEqual[i - counter] === 1 ? (
										<p
											key={i}
											className="py-1 px-px bg-green-600 border-t-[0.5px] border-b-[0.5px] border-r-[0.5px] border-gray-600 border-opacity-50 bg-opacity-30 inline"
										>
											{translatedChar}
										</p>
									) : (
										<p
											key={i}
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
		</div>
	);
}
