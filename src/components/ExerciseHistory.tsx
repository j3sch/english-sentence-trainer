interface Props {
	exerciseHistory: {
		letterEqual: number[];
		textToTranslate: string;
		translatedTextSplitted: string[];
		translationResult: string;
	}[];
}

export default function ExerciseHistory({
	exerciseHistory,
}: Props): JSX.Element {
	let counter = 0;
	return (
		<>
			{exerciseHistory.map(
				(
					historyItem: {
						letterEqual: number[];
						textToTranslate: string;
						translatedTextSplitted: string[];
						translationResult: string;
					},
					i: number,
				) => {
					return (
						historyItem !== undefined && (
							<div
								key={i}
								className="border-2 w-3/4 border-gray-600 text-center text-xl flex flex-col justify-center items-center m-1"
							>
								<p className="p-2.5 border-b-2 border-gray-600 w-full border-opacity-30">
									{historyItem.textToTranslate}
								</p>
								<p className="p-[0.6rem] border-b-2 border-gray-600 w-full border-opacity-30 bg-green-600 bg-opacity-30">
									{historyItem.translationResult}
								</p>
								<div className="p-1 flex justify-center">
									{historyItem.translatedTextSplitted.map(
										(translatedChar, j) => {
											translatedChar === ' ' && counter++;
											return historyItem.letterEqual[j - counter] === 1 ? (
												<p
													key={j}
													className="h-10 py-1 px-px bg-green-600 border-t-[0.5px] border-b-[0.5px] border-r-[0.5px] border-gray-600 border-opacity-50 bg-opacity-30"
												>
													{translatedChar}
												</p>
											) : (
												<p
													key={j}
													className="h-10 py-1 px-px bg-red-600 border-t-[0.5px] border-b-[0.5px] border-r-[0.5px] border-gray-600 border-opacity-50 bg-opacity-30"
												>
													{translatedChar}
												</p>
											);
										},
									)}
								</div>
							</div>
						)
					);
				},
			)}
		</>
	);
}
