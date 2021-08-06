interface props {
	isActive: boolean;
}

export default function UpperLowerCaseBtn({ isActive }: props): JSX.Element {
	return isActive === true ? (
		<button className="bg-[#706CF9] hover:bg-[#5f59fa] text-white w-24 font-bold text-lg py-2 px-4 rounded-lg flex items-center justify-center">
			A & a
		</button>
	) : (
		<button className="bg-[#9a9ab6] bg-opacity-60 hover:bg-[#929297] text-gray-300 w-24 font-bold text-lg py-2 px-4 rounded-lg flex items-center justify-center">
			a & a
		</button>
	);
}
