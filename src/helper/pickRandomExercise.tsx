import present from '~/data/ger-en/present';
import past from '~/data/ger-en/past';
import future from '~/data/ger-en/future';

export default function pickRandomExercise(): { ger: string; en: string }[] {
	const pickExerciseCategory = [
		present,
		past,
		future,
	];

	return pickExerciseCategory[
		Math.floor(Math.random() * pickExerciseCategory.length)
	];
}
