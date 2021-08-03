import present from '~/data/ger-en/present';
import presentPerfect from '~/data/ger-en/presentPerfect';
import past from '~/data/ger-en/past';
import pastPerfect from '~/data/ger-en/pastPerfect';
import futurePerfect from '~/data/ger-en/futurePerfect';
import future from '~/data/ger-en/future';

export default function pickRandomExercise(): { ger: string; en: string }[] {
	const pickExerciseCategory = [
		present,
		presentPerfect,
		past,
		pastPerfect,
		futurePerfect,
		future,
	];

	return pickExerciseCategory[
		Math.floor(Math.random() * pickExerciseCategory.length)
	];
}
