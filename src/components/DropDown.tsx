import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

interface Props {
	dropDownItems: any[];
	selected: String;
}

function classNames(...classes: String[]) {
	return classes.filter(Boolean).join(' ');
}

export function DropDownMode(props: Props) {
	let { dropDownItems } = props;
	let { selected } = props;

	const handleClick = (text: String) => {
		selected = text;
	};

	return (
		<Menu as="div" className="relative inline-block text-left">
			{({ open }) => (
				<>
					<div>
						<Menu.Button className="inline-flex leading-tight justify-center w-full shadow-sm px-2 py-2 text-xl font-semibold text-gray-300 focus:outline-none focus:ring-0">
							{selected}
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
