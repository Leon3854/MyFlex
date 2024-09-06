import { FC } from 'react'
import { IMovie } from '@/shared/types/movie.types'
import { getMovieUrl } from '@/config/url.config'
import Link from 'next/link'
import Image from 'next/image'
import styles from './SearchList.module.scss'

const SearchList: FC<{ movies: IMovie[] }> = ({ movies }) => {
	return (
		<div className={styles.list}>
			{movies.length ? (
				movies.map((movie) => (
					<Link key={movie._id} href={getMovieUrl(movie.slug)}>
						<Image
							src={movie.poster || ''}
							width={50}
							height={40}
							alt={movie.title}
							draggable={false}
						/>
						<span>{movie.title}</span>
					</Link>
				))
			) : (
				<div className={styles.notFound}>
					<p>Movies not found</p>
				</div>
			)}
		</div>
	)
}

export default SearchList
