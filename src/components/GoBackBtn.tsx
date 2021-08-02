import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/solid';
export default function GoBackBtn(): JSX.Element {
	return (
		<Link href="/">
			<button className="bg-[#706CF9] hover:bg-[#5f59fa] text-white w-60 font-bold text-lg py-2 px-4 rounded flex items-center justify-center">
				<ArrowLeftIcon className="h-6 w-6 mr-3"/>Go back
			</button>
		</Link>
	);
}
