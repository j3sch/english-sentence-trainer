import Image from 'next/image';
import Link from 'next/link';

export function NavBarImpressum() {
	return (
		<div>
			<nav className="bg-black px-4 shadow-xl">
				<div className="flex items-center h-24">
					<Link href="/">
						<Image
							alt="sentence builder logo"
							src="/images/sentence-builder.svg"
							width={147}
							height={49}
							priority
						/>
					</Link>
				</div>
			</nav>
		</div>
	);
}
