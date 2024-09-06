import { FC, PropsWithChildren } from 'react'
import { Favicons } from './Favicons'
import NextNProgress from 'nextjs-progressbar'
import { accentColor } from '@/config/constats'
import Head from 'next/head'
export const HeaderProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<NextNProgress
				color={accentColor}
				startPosition={0.3}
				stopDelayMs={200}
				height={13}
			/>
			<Head>
				<meta charSet="UTF-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1.0"
				/>

				<Favicons />

				<meta name="theme-color" content={'#181B1E'} />
				<meta name="msapplication-navbutton-color" content={'#181B1E'} />
				<meta
					name="apple-mobile-web-app-status-bar-style"
					content={'#181B1E'}
				/>
				{/* <link rel="manifest" href="/manifest.json" /> */}
			</Head>
			{children}
		</>
	)
}
