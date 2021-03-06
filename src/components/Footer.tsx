import Link from 'next/link';

export function Footer(): JSX.Element {
	return (
		<div className="h-[5.5rem] flex bg-[#212123]  text-white">
			<div className="w-full shadow flex flex-col justify-center bg-black bg-opacity-50 items-center gap-2">
				<Link href="/impressum">
					<a className="text-xl focus:outline-none focus-visible:ring-2 ring-white rounded-lg border-solid px-1 pb-1">
						Impressum
					</a>
				</Link>
				<p className="text-sm">Copyright © 2021, Jens Schlegel.</p>
			</div>
		</div>
	);
}

export default Footer;
