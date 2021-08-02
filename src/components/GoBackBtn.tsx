import Link from 'next/link';

export function GoBackBtn() {
	return (
		<Link href="/">
			<button className="absolute bottom-40 bg-[#706CF9] hover:bg-[#5f59fa] text-white w-64 font-bold py-2 px-4 rounded">
				Go back
			</button>
		</Link>
	);
}
