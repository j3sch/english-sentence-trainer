import React, { useState, useContext, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import DropDown from '~/components/DropDown';
import modeDropDownItems from '~/data/modesDropDownItems';
import languagesDropDownItems from '~/data/languagesDropDownItems';
import Context from '~/utils/context';
import nookies, { parseCookies } from 'nookies';
import UpperLowerCaseBtn from '~/components/UpperLowerCaseBtn';
export default function NavBar(): JSX.Element {
	const [isOpen, setIsOpen] = useState(false);
	const [questionLanguage, setQuestionLanguage] = useState('firstDropDown');
	const [answerLanguage, setAnswerLanguage] = useState('secondDropDown');

	const {
		setTextToTranslate,
		setTranslationResult,
		translationResult,
		textToTranslate,
	} = useContext(Context) || {};

	function switchLanguages() {
		const dropDownValue = questionLanguage;
		setQuestionLanguage(answerLanguage);
		setAnswerLanguage(dropDownValue);

		const textToTranslateSaved = textToTranslate;
		setTextToTranslate(translationResult);
		setTranslationResult(textToTranslateSaved);
	}

	const [isActive, setActive] = useState(true);

	useEffect(() => {
		let isUpperLowerCaseActiv = parseCookies()['UpperLowerCase'] === 'true';
		setActive(isUpperLowerCaseActiv);
	}, []);

	function handleClick() {
		if (isActive) {
			setActive(false);
			nookies.set(null, 'UpperLowerCase', 'false', {
				path: '/',
				maxAge: 10 * 365 * 24 * 60 * 60,
			});
		} else {
			setActive(true);
			nookies.set(null, 'UpperLowerCase', 'true', {
				path: '/',
				maxAge: 10 * 365 * 24 * 60 * 60,
			});
		}
	}

	return (
		<div>
			<nav className="bg-black px-4 shadow-xl w-full">
				<div className="flex items-center h-24 w-full">
					<div className="w-40 h-full flex items-center">
						<Link href="/">
							<a className="focus:outline-none focus-visible:ring-2 py-2 focus-visible:mr-4 rounded-lg ring-white">
								<Image
									alt="sentence builder logo"
									src="/images/sentence-builder.svg"
									width={147}
									height={49}
									priority
									className="cursor-pointer"
								/>
							</a>
						</Link>
					</div>
					<div className="hidden sm:block w-4/5 relative">
						<div className="mx-5 items-center flex">
							<div className="w-1/6 flex justify-center">
								<DropDown name="Mode" dropDownItems={modeDropDownItems} />
							</div>
							<div className="flex ml-[8%] md:ml-[4%] relative w-44">
								<DropDown
									name={questionLanguage}
									dropDownItems={languagesDropDownItems}
								/>
								<button
									onClick={switchLanguages}
									className=" absolute left-[3.5rem] focus:outline-none focus-visible:left-[3.4rem] focus-visible:px-0.5 focus-visible:ring-2 py-1 rounded-lg focus-visible:ring-white"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-7 w-7 text-gray-300"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
										/>
									</svg>
								</button>

								<div className="absolute left-[5.5rem]">
									<DropDown
										name={answerLanguage}
										dropDownItems={languagesDropDownItems}
									/>
								</div>
							</div>
							<div className="absolute right-14">
								<UpperLowerCaseBtn isActive={isActive} />
							</div>
						</div>
					</div>
					<div className="flex sm:hidden absolute right-[10%]">
						<button
							onClick={() => setIsOpen(!isOpen)}
							type="button"
							className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus-visible:ring-2 ring-offset-2 focus:ring-offset-gray-800 ring-white"
							aria-controls="mobile-menu"
							aria-expanded="false"
						>
							<span className="sr-only">Open main menu</span>
							{!isOpen ? (
								<svg
									className="block h-7 w-7"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							) : (
								<svg
									className="block h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							)}
						</button>
					</div>
				</div>
			</nav>

			<Transition
				show={isOpen}
				enter="transition ease-out duration-100 transform"
				enterFrom="opacity-0 scale-95"
				enterTo="opacity-100 scale-100"
				leave="transition ease-in duration-75 transform"
				leaveFrom="opacity-100 scale-100"
				leaveTo="opacity-0 scale-95"
			>
				{(ref) => (
					<div className="sm:hidden" id="mobile-menu">
						<div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
							<div className="hover:bg-gray-700 text-white block w-full px-3 py-2 rounded-md text-base font-medium">
								<DropDown name="Mode" dropDownItems={modeDropDownItems} />
							</div>

							<div className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
								<DropDown
									name={questionLanguage}
									dropDownItems={languagesDropDownItems}
								/>
							</div>

							<div className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
								<DropDown
									name={answerLanguage}
									dropDownItems={languagesDropDownItems}
								/>
							</div>
							<div
								onClick={handleClick}
								className="text-gray-300 hover:bg-gray-700 justify-center w-full hover:text-white flex px-3 py-2 rounded-md text-base font-medium"
							>
								<UpperLowerCaseBtn isActive={isActive} />
							</div>
						</div>
					</div>
				)}
			</Transition>
		</div>
	);
}
