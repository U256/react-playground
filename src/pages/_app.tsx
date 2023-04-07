import 'common/styles/globals.css'
import { Post } from 'module/PostsList'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />
}
