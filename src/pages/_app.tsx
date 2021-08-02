import '../../styles/globals.css';
import { AppProps } from 'next/app';
import { FC } from 'react';
import Footer from '~/components/Footer';

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
	return (
		<div className="max-w-7xl mx-auto h-screen">
			<Component {...pageProps} />
			<Footer />
		</div>
	);
};

export default MyApp;
