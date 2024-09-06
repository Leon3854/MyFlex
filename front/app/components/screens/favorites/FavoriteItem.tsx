import { FC } from 'react'
import styles from './Favorites.module.scss'
import { IMovie } from '@/shared/types/movie.types'
import FavoriteButton from '../single-movie/FavoriteButton/FavoriteButton'
import Link from 'next/link'
import { getMovieUrl } from '@/config/url.config'
import Image from 'next/image'

const FavoriteItem: FC<{ movie: IMovie }> = ({ movie }) => {
	return (
		<div className={styles.itemWrapper}>
			<FavoriteButton movieId={movie._id} />
			<Link className={styles.item} href={getMovieUrl(movie.slug)}>
				<Image
					alt={movie.title}
					src={movie.bigPoster}
					fill
					draggable={false}
					priority
				/>

				<div className={styles.title}>{movie.title}</div>
			</Link>
		</div>
	)
}

export default FavoriteItem
