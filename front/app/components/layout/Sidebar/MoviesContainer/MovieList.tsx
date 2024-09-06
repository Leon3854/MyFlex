import { FC } from 'react'
import { IMovieList } from './movie-list.interface'
import MovieItem from './MovieItem'
import Link from 'next/link'

import styles from './MovieList.module.scss'

const MovieList: FC<IMovieList> = ({ title, movies, link }) => {
	return (
		<div className={styles.list}>
			<div className={styles.heading}>{title}</div>
			{movies.map((movie) => (
				<MovieItem key={movie._id} movie={movie} />
			))}
			<Link href={link}>
				<div className={styles.button}>See more</div>
			</Link>
		</div>
	)
}

export default MovieList
