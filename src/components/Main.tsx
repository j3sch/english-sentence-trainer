import React, { useState } from 'react';

export function Main() {
	const [textToTranslate, setTextToTranslate] = useState(
		'Translate this sentence',
	);
	const [translatedText, setTranslatedText] = useState('');
	const [translationResult, setTranslationResult] = useState(
		'Result of the translation',
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		setTranslatedText('');
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
					className="h-24 w-full text-2xl text-center rounded-lg bg-[#706CF9]"
				/>
			</form>
		</div>
	);
}
