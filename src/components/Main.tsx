import React, { useState } from 'react';

let exerciseHistory: {
	translationResult: string;
	translatedText: string;
}[] = [];

export function Main() {
	const [textToTranslate, setTextToTranslate] = useState(
		'Translate this sentence',
	);
	const [translatedText, setTranslatedText] = useState('');
	const [translationResult, setTranslationResult] = useState(
		'Result of the translation',
	);
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		exerciseHistory.unshift({ translationResult, translatedText });
		setTranslatedText('');
		if (exerciseHistory.length === 4) {
			exerciseHistory.pop();
		}
	};

	return (
		<div className="flex flex-col justify-items-center  bg-[#212123] h-full w-full text-gray-300 items-center">
			<p className="h-1/4 flex items-center justify-center  text-4xl">
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
					<div
						key={i}
						className="border-2 w-3/4 border-gray-600 text-center text-xl flex flex-col justify-center items-center m-1"
					>
						<p className="h-12 pt-3 border-b-2 border-gray-600 w-full border-opacity-30 bg-green-600 bg-opacity-30">
							{historyItem.translationResult}
						</p>
						<p className="h-12 p-1">{historyItem.translatedText}</p>
					</div>
				);
			})}
		</div>
	);
}
