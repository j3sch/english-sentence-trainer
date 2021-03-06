import Image from 'next/image';
import Link from 'next/link';

export default function NavBarImpressum(): JSX.Element {
	return (
		<div>
			<nav className="bg-black px-4 shadow-xl">
				<div className="flex items-center h-24">
					<div className="w-40 h-full flex items-center">
						<Link href="/">
							<a className="Focus-visible:border-2 py-2 Focus-visible:mr-4 rounded-lg border-solid">
								<Image
									alt="sentence builder logo"
									src="/images/sentence-builder.svg"
									width={147}
									height={49}
									priority
									className="cursor-pointer"
								/>
							</a>
						</Link>
					</div>
				</div>
			</nav>
		</div>
	);
}
