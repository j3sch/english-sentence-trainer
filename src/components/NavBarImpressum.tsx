import Image from 'next/image';
import Link from 'next/link';

export default function NavBarImpressum(): JSX.Element {
	return (
		<div>
			<nav className="bg-black px-4 shadow-xl">
				<div className="flex items-center h-24">
					<div className="w-44 mt-1">
						<Link href="/">
							<Image
								alt="sentence builder logo"
								src="/images/sentence-builder(1).svg"
								width={147}
								height={49}
								priority
							/>
						</Link>
					</div>
				</div>
			</nav>
		</div>
	);
}
