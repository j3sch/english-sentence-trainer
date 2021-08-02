import Link from 'next/link';

export function Footer(): JSX.Element {
	return (
		<div className="fixed h-[5.5rem] w-full max-w-7xl bottom-0 flex bg-[#212123]  text-white">
			<div className="w-full shadow flex flex-col justify-center bg-black bg-opacity-50 items-center gap-2">
				<Link href="/impressum">
					<a className="text-xl">Impressum</a>
				</Link>
				<p className="text-sm">Copyright © 2021, Jens Schlegel.</p>
			</div>
		</div>
	);
}

export default Footer;
