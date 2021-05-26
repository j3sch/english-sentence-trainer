import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import Image from 'next/image';
import { DropDownMode } from '~/components/DropDownMode';
import { modeDropDownItems } from '~/data/modesDropDownItems';
import { languagesDropDownItems } from '~/data/languagesDropDownItems';

const NavBar = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div>
			<nav className="bg-gray-800 max-w-7xl mx-auto px-4">
				<div className="flex items-center h-20">
					<Image
						alt="sentence builder logo"
						src="/images/sentence-builder.svg"
						width={108}
						height={36}
						priority
					/>
					<div className="hidden md:block w-full">
						<div className="ml-10 items-center flex">
							<div className="w-1/6">
								<DropDownMode
									selected="Random - Sentences:"
									dropDownItems={modeDropDownItems}
								/>
							</div>

							<DropDownMode
								selected="EN"
								dropDownItems={languagesDropDownItems}
							/>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6 text-gray-300"
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
							<DropDownMode
								selected="GER"
								dropDownItems={languagesDropDownItems}
							/>

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
};

export default NavBar;
