import React, { useState, useContext } from 'react';
import { Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import DropDown from '~/components/DropDown';
import modeDropDownItems from '~/data/modesDropDownItems';
import languagesDropDownItems from '~/data/languagesDropDownItems';
import Context from '~/utils/context';

export default function NavBar(): JSX.Element {
	const [isOpen, setIsOpen] = useState(false);
	const [questionLanguage, setQuestionLanguage] = useState('firstDropDown');
	const [answerLanguage, setAnswerLanguage] = useState('secondDropDown');

	const { setSwitchLanguage, switchLanguage } = useContext(Context) || {};

	function switchLanguages() {
		const dropDownValue = questionLanguage;
		setQuestionLanguage(answerLanguage);
		setAnswerLanguage(dropDownValue);

		if (switchLanguage) {
			setSwitchLanguage(false);
		} else {
			setSwitchLanguage(true);
		}
	}

	return (
		<div>
			<nav className="bg-black px-4 shadow-xl w-full">
				<div className="flex items-center h-24">
					<div className="w-44">
						<Link href="/">
							<a>
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
					<div className="hidden md:block w-full">
						<div className="mx-5 items-center flex">
							<div className="w-1/6 flex justify-center">
								<DropDown name="Mode" dropDownItems={modeDropDownItems} />
							</div>
							<div className="flex items-center relative w-2/3">
								<div className="transform origin-right">
									<DropDown
										name={questionLanguage}
										dropDownItems={languagesDropDownItems}
									/>
								</div>
								<button
									onClick={switchLanguages}
									className=" absolute left-[3.7rem]"
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

							{/* <a
									href="#"
									className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
								>
									Reports
								</a> */}
						</div>
					</div>
					<div className="-mr-2 flex md:hidden">
						<button
							onClick={() => setIsOpen(!isOpen)}
							type="button"
							className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
							aria-controls="mobile-menu"
							aria-expanded="false"
						>
							<span className="sr-only">Open main menu</span>
							{!isOpen ? (
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
					<div className="md:hidden" id="mobile-menu">
						<div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
							<a
								href="#"
								className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
							>
								Dashboard
							</a>

							<a
								href="#"
								className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
							>
								Team
							</a>

							<a
								href="#"
								className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
							>
								Projects
							</a>

							<a
								href="#"
								className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
							>
								Calendar
							</a>

							<a
								href="#"
								className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
							>
								Reports
							</a>
						</div>
					</div>
				)}
			</Transition>
		</div>
	);
}