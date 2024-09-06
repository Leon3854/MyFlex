import { FC } from 'react'
import styles from '../Admin.module.scss'
import { MovieService } from '@/services/movie/movie.service'

import cn from 'classnames'
import SubHeading from '@/components/ui/heading/SubHeading'
import { SkeletonLoader } from '@/components/ui/skeletonLoader/SkeletonLoader'
import Link from 'next/link'
import { getMovieUrl } from '@/config/url.config'
import Image from 'next/image'
import { useQuery } from 'react-query'
import { IMovie } from '@/shared/types/movie.types'

const PopularMovie: FC = () => {
	const { isLoading, data: movie } = useQuery(
		'Most popular movie in admin',
		() => MovieService.getMostPopularMovies(),
		{
			select: (data): IMovie => data[0],
		}
	)

	return (
		<div className={cn(styles.block, styles.popular)}>
			<SubHeading title="The most popular movie" />
			{isLoading ? (
				<SkeletonLoader className="h-48" />
			) : (
				movie && (
					<>
						<h3>Opened {movie.countOpened}times</h3>
						<Link href={getMovieUrl(movie.slug)}>
							<Image
								width={275}
								height={176}
								src={movie.bigPoster}
								alt={movie.title}
								className={styles.image}
								unoptimized
							/>
						</Link>
					</>
				)
			)}
		</div>
	)
}

export default PopularMovie
