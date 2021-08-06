import React, { useState, Fragment, useContext, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';

import nookies, { parseCookies } from 'nookies';
import Context from '~/utils/context';
import pickRandomExercise from '~/helper/pickRandomExercise';
import present from '~/data/ger-en/present';
import past from '~/data/ger-en/past';
import future from '~/data/ger-en/future';

interface Props {
	name: string;
	dropDownItems: { name: string; displayNavBar: string }[];
}

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

export default function DropDown(props: Props): JSX.Element {
	const { name } = props;
	const { dropDownItems } = props;
	let currentLanguageMode = '';

	const {
		setQuestionLanguage: setFirstDropDown,
		setAnswerLangauge: setSecondDropDown,
		questionLanguage: firstDropDown,
		answerLanguage: secondDropDown,
		setTranslationResult,
		setTextToTranslate,
		setFile,
	} = useContext(Context) || {};

	const [languageMode, setLanguageMode] = useState('');

	useEffect(() => {
		setLanguageMode(parseCookies()['SelectedLanguageMode']);
	}, []);

	function setCookieCurrentMode(textClicked: string) {
		nookies.set(null, 'SelectedLanguageMode', textClicked, {
			path: '/',
			maxAge: 10 * 365 * 24 * 60 * 60,
		});
	}

	const handleClick = (textClicked: string) => {
		switch (name) {
			case 'Mode':
				setLanguageMode(textClicked);
				currentLanguageMode = textClicked;
				setCookieCurrentMode(textClicked);
				break;
			case 'firstDropDown':
				setFirstDropDown(textClicked);
				break;
			case 'secondDropDown':
				setSecondDropDown(textClicked);
				break;
		}
	};

	function pickExercise() {
		const currentMode = {
			Random: pickRandomExercise(),
			Present: present,
			Past: past,
			Future: future,
		};

		setFile((currentMode as any)[currentLanguageMode]);
		const currentFile = (currentMode as any)[currentLanguageMode];
		const randomNum = Math.floor(Math.random() * currentFile.length);
		setTextToTranslate(currentFile[randomNum].ger);
		setTranslationResult(currentFile[randomNum].en);
	}

	function displayDropDownName() {
		switch (name) {
			case 'Mode':
				return languageMode;
			case 'firstDropDown':
				return firstDropDown;
			case 'secondDropDown':
				return secondDropDown;
		}
	}

	return (
		<Menu as="div" className="relative text-left">
			{({ open }) => (
				<>
					<div>
						<Menu.Button className="focus:outline-none focus-visible:ring-2 ring-white w-full px-1 pb-1 text-2xl text-gray-300 rounded-lg border-solid">
							{displayDropDownName()}
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
							className="dropDown origin-top-right text-center z-10 absolute w-56 shadow-lg bg-black ring-1 ring-black ring-opacity-5 focus:outline-none"
						>
							<div className="py-1">
								{dropDownItems.map(
									(
										item: {
											name: string;
											displayNavBar: string;
										},
										index: number,
									) => (
										<Menu.Item
											key={index}
											onClick={() => {
												handleClick(`${item.displayNavBar}`);
												pickExercise();
											}}
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
									),
								)}
							</div>
						</Menu.Items>
					</Transition>
				</>
			)}
		</Menu>
	);
}
