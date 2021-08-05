import '../../styles/globals.css';
import { AppProps } from 'next/app';
import { FC } from 'react';

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
	return (
		<div className="max-w-7xl mx-auto h-screen bg-[#212123]">
			<Component {...pageProps} />
		</div>
	);
};

export default MyApp;
