import MaterialIcon from '@/components/ui/icon/MaterialIcon'
import { getGenreUrl, getMovieUrl } from '@/config/url.config'
import { IMovie } from '@/shared/types/movie.types'
import Link from 'next/link'
import { FC } from 'react'
import Image from 'next/image'
import { GetGenresListEach } from '@/utils/movie/getGenreslListEach'
//
import styles from './MovieList.module.scss'

//
const MovieItem: FC<{ movie: IMovie }> = ({ movie }) => {
	return (
		<div className={styles.item}>
			<Link href={getMovieUrl(movie.slug)}>
				<>
					<Image
						width={65}
						height={87}
						src={movie.poster}
						alt={movie.title}
						draggable={false}
						priority
					/>
				</>
			</Link>
			<div className={styles.info}>
				<div>
					<div className={styles.title}>{movie.title}</div>
					<div className={styles.genres}>
						{movie.genres.map((genre, idx) => (
							<Link key={genre._id} href={getGenreUrl(genre.slug)}>
								<div>
									{GetGenresListEach(idx, movie.genres.length, genre.name)}
								</div>
							</Link>
						))}
					</div>
				</div>
				<div className={styles.rating}>
					<MaterialIcon name="MdStarRate" />
					<span>{movie.rating.toFixed()}</span>
				</div>
			</div>
		</div>
	)
}

export default MovieItem
