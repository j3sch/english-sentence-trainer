import { simplePresent } from '~/data/ger-en/simplePresent';
import { presentProgressive } from '~/data/ger-en/presentProgressive';
import { simplePast } from '~/data/ger-en/simplePast';
import { pastProgressive } from '~/data/ger-en/pastProgressive';
import { presentPerfectProgressive } from '~/data/ger-en/presentPerfectProgressive';
import { simplePastPerfect } from '~/data/ger-en/simplePastPerfect';
import { willFuture } from '~/data/ger-en/willFuture';
import { goingToFuture } from '~/data/ger-en/goingToFuture';
import { simplePresentPerfect } from '~/data/ger-en/simplePresentPerfect';

export function pickRandomExercise() {
    let pickExerciseCategory = [
        simplePresent,
		presentProgressive,
		presentProgressive,
		simplePast,
		pastProgressive,
		simplePresentPerfect,
		presentPerfectProgressive,
		simplePastPerfect,
		willFuture,
		goingToFuture,
	];

	return pickExerciseCategory[
		Math.floor(Math.random() * pickExerciseCategory.length)
	];
}
