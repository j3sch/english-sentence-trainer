import React, { useState, useEffect } from 'react';
import nookies, { parseCookies } from 'nookies';

export default function UpperLowerCaseBtn(): JSX.Element {
	const [active, setActive] = useState(true);

	useEffect(() => {
		let isUpperLowerCaseActiv = parseCookies()['UpperLowerCase'] === 'true';
		setActive(isUpperLowerCaseActiv);
	}, []);

	function handleClick() {
		if (active) {
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

	return active === true ? (
		<button
			onClick={handleClick}
			className="bg-[#706CF9] hover:bg-[#5f59fa] text-white w-24 font-bold text-lg py-2 px-4 rounded-lg flex items-center justify-center"
		>
			A & a
		</button>
	) : (
		<button
			onClick={handleClick}
			className="bg-[#9a9ab6] bg-opacity-60 hover:bg-[#929297] text-gray-300 w-24 font-bold text-lg py-2 px-4 rounded-lg flex items-center justify-center"
		>
			a & a
		</button>
	);
}
