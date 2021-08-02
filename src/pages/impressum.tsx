import Image from 'next/image';
import Footer from '~/components/Footer';
import { NavBarImpressum } from '~/components/NavBarImpressum';
export default function Impressum() {
	return (
		<>
			<NavBarImpressum />
			<div className="max-w-7xl h-full bg-[#212123] flex justify-center">
				<div className="p-20">
					<Image
						alt="Impressum"
						src="/images/ImpressumDark.svg"
						height={100}
						width={400}
						priority
					/>
				</div>
			</div>
			<Footer />
		</>
	);
}
