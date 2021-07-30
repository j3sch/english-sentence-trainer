import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import React, { useContext, useEffect } from 'react';
import { Context } from '~/utils/context';
import { simplePresent } from '~/data/ger-en/simplePresent';
import { presentProgressive } from '~/data/ger-en/presentProgressive';
import { simplePast } from '~/data/ger-en/simplePast';
import { pastProgressive } from '~/data/ger-en/pastProgressive';
import { presentPerfectProgressive } from '~/data/ger-en/presentPerfectProgressive';
import { simplePastPerfect } from '~/data/ger-en/simplePastPerfect';
import { willFuture } from '~/data/ger-en/willFuture';
import { goingToFuture } from '~/data/ger-en/goingToFuture';
import { simplePresentPerfect } from '~/data/ger-en/simplePresentPerfect';
import { pickRandomExercise } from '~/helper/pickRandomExercise';
interface Props {
	name: string;
	dropDownItems: any[];
}

function classNames(...classes: String[]) {
	return classes.filter(Boolean).join(' ');
}

export function DropDown(props: Props) {
	let { name } = props;
	let { dropDownItems } = props;
	const {
		setLanguageMode,
		languageMode,
		setQuestionLanguage,
		questionLanguage,
		setAnswerLangauge,
		answerLanguage,
		setTranslationResult,
		setTextToTranslate,
		file,
		setFile,
	} = useContext(Context) || {};

	const handleClick = (textClicked: string) => {
		switch (name) {
			case 'Mode':
					setLanguageMode(textClicked);
				

				break;
			case 'QuestionLanguage':
				setQuestionLanguage(textClicked);
				break;
			case 'AnswerLanguage':
				setAnswerLangauge(textClicked);
				break;
		}
		pickExercise();
	};

	function pickExercise() {
		let currentMode = {
			Random: pickRandomExercise(),
			'Simple Present': simplePresent,
			'Present Progressive': presentProgressive,
			'Simple Past': simplePast,
			'Past Progressive': pastProgressive,
			'Simple Present Perfect': simplePresentPerfect,
			'Present Perfect Progressive': presentPerfectProgressive,
			'Simple Past Perfect': simplePastPerfect,
			'will-future': willFuture,
			'going to-future': goingToFuture,
		};

		console.log(languageMode);

		setFile((currentMode as any)[languageMode]);
		let randomNum = Math.floor(Math.random() * file.length);
		setTextToTranslate(file[randomNum].ger);
		setTranslationResult(file[randomNum].en);
	}

	return (
		<Menu as="div" className="relative inline-block text-left">
			{({ open }) => (
				<>
					<div>
						<Menu.Button className="inline-flex leading-tight justify-center w-full shadow-sm px-2 py-2 text-xl font-semibold text-gray-300 focus:outline-none focus:ring-0">
							{name === 'Mode'
								? languageMode
								: name === 'QuestionLanguage'
								? questionLanguage
								: answerLanguage}
						</Menu.Button>
					</div>

					<Transition
						show={open}
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items
							static
							className="dropDown origin-top-right text-center absolute w-56 shadow-lg bg-black ring-1 ring-black ring-opacity-5 focus:outline-none"
						>
							<div className="py-1">
								{dropDownItems.map((item: any, index: number) => (
									<Menu.Item
										key={index}
										onClick={() => handleClick(`${item.displayNavBar}`)}
									>
										{({ active }) => (
											<a
												href="#"
												className={classNames(
													active
														? 'bg-gray-100 text-gray-900'
														: 'text-gray-300',
													'block px-4 py-2 text-sm',
												)}
											>
												{item.name}
											</a>
										)}
									</Menu.Item>
								))}
							</div>
						</Menu.Items>
					</Transition>
				</>
			)}
		</Menu>
	);
}
