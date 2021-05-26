import '../../styles/globals.css';
import { AppProps } from 'next/app';
import { FC } from 'react';
import NavBar from '~/components/NavBar';

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
	return (
		<div>
			<NavBar />
			<Component {...pageProps} />
		</div>
	);
};

export default MyApp;
