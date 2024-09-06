import { SkeletonLoader } from '@/components/ui/skeletonLoader/SkeletonLoader'
import { FC } from 'react'
import { MovieService } from '@/services/movie/movie.service'
import { useQuery } from 'react-query'
import MovieList from '../MovieList'

const PopularMoviesList: FC = () => {
	const { isLoading, data: popularMovies } = useQuery(
		'Popular movies in sidebar',
		() => MovieService.getMostPopularMovies()
	)
	return isLoading ? (
		<div className="mt-11">
			<SkeletonLoader count={3} className="h-28 mb-4" />
		</div>
	) : (
		<MovieList
			link="/trending"
			movies={popularMovies?.slice(0, 3) || []}
			title="Popular Movies"
		/>
	)
}

export default PopularMoviesList
