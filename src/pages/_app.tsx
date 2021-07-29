import '../../styles/globals.css';
import { AppProps } from 'next/app';
import { FC } from 'react';

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
	return (
		<div className="max-w-7xl mx-auto h-screen overflow-hidden">
			<Component {...pageProps} />
		</div>
	);
};

export default MyApp;
