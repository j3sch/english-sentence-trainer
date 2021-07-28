export function textEqual(
	translatedText: string,
	translationResult: string,
): number[] {
	let translatedTextWords = removePunction(translatedText).split(' ');
	let translationResultWords = removePunction(translationResult).split(' ');
	let charArraytranslationResult = [''];
	let letterEqual: number[] = [];
	let translatedTextArray = [''];

	//goes through all the words
	for (let i = 0; i < translatedTextWords.length; i++) {
		if (translationResultWords.length > i) {
			translatedTextArray = translatedTextWords[i].split('');
			charArraytranslationResult = translationResultWords[i].split('');
		}

		// compare word
		for (let j = 0; j < translatedTextArray.length; j++) {
			if (translationResultWords.length > i) {
				if (translatedTextArray[j] === charArraytranslationResult[j]) {
					letterEqual.push(1);
				} else {
					letterEqual.push(0);
				}
			} else {
				letterEqual.push(0);
			}
		}
	}

	let letterEqualPosition = 0;

	// if the translated text contains a word in the result text, then true
	for (let i = 0; i < translatedTextWords.length; i++) {
		for (let j = 0; j < translationResultWords.length; j++) {
			if (translatedTextWords[i] === translationResultWords[j]) {
				for (let z = 0; z < translatedTextWords[i].length; z++) {
					letterEqual[letterEqualPosition + z] = 1;
				}
			}
		}
		letterEqualPosition += translatedTextWords[i].length;
	}
	return addRemovedPuntion(translatedText, translationResult, letterEqual);;
}

function removePunction(text: string): string {
	let textWithoutPunction = text.replace(/[.!?]/g, '');
	return textWithoutPunction;
}

function addRemovedPuntion(translatedText: string, translationResult: string, letterEqual: number[]): number[] {
	if (
		translatedText.charAt(translatedText.length - 1) === '?' ||
		translatedText.charAt(translatedText.length - 1) === '!' ||
		translatedText.charAt(translatedText.length - 1) === '.'
	) {
		if (
			translatedText.charAt(translatedText.length - 1) ===
			translationResult.charAt(translationResult.length - 1)
		) {
			letterEqual.push(1);
		} else {
			letterEqual.push(0);
		}
	}
	return letterEqual;
}
