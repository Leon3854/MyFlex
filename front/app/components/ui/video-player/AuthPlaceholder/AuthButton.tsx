import { FC } from 'react'
import styles from './AuthPlaceholder.module.scss'
import Link from 'next/link'
import { getMovieUrl } from '@/config/url.config'

const AuthButton: FC<{ slug: string }> = ({ slug }) => {
	return (
		<Link href={`/auth?redirect=${getMovieUrl(slug)}`}>
			<div className={styles.btn}>Sign in</div>
		</Link>
	)
}

export default AuthButton
