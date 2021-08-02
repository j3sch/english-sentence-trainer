import Image from 'next/image';
import GoBackBtn from '~/components/GoBackBtn';
import NavBarImpressum from '~/components/NavBarImpressum';

export default function Impressum(): JSX.Element {
	return (
		<>
			<NavBarImpressum />
			<div className="max-w-7xl min-h-[85%] bg-[#212123] flex flex-col items-center">
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
		</>
	);
}
