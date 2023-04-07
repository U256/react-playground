import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import styles from 'common/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	const [val, setVal] = useState('')
	const [val2, setVal2] = useState('')

	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={`${styles.main} ${inter.className}`}>
				<h1>test</h1>
				<div className={styles.card}>
					<input type="text" value={val} onChange={(e) => setVal(e.target.value)} />
				</div>
				<div className={styles.card}>
					<input type="text" value={val2} onChange={(e) => setVal2(e.target.value)} />
				</div>
				<div>val: {val}</div>
				<div>val2: {val2}</div>
			</main>
		</>
	)
}
