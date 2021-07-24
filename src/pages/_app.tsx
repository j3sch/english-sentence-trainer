import '../../styles/globals.css';
import { AppProps } from 'next/app';
import { FC } from 'react';
import { NavBar } from '~/components/NavBar';

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
	return (
		<div className="max-w-7xl mx-auto h-screen overflow-hidden">
			<NavBar />
			<Component {...pageProps} />
		</div>
	);
};

export default MyApp;
