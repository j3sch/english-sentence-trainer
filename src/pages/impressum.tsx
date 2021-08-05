import Image from 'next/image';
import GoBackBtn from '~/components/GoBackBtn';
import NavBarImpressum from '~/components/NavBarImpressum';
import Footer from '~/components/Footer';

export default function Impressum(): JSX.Element {
	return (
		<>
			<NavBarImpressum />
			<div className="max-w-7xl flex flex-col items-center">
				<div className="mt-20">
					<Image
						alt="Impressum"
						src="/images/ImpressumDark.svg"
						height={100}
						width={400}
						priority
					/>
				</div>
				<div className="absolute bottom-32">
					<GoBackBtn />
				</div>
			</div>
			<div className="fixed bottom-0  w-full max-w-7xl">
				<Footer />
			</div>
		</>
	);
}
