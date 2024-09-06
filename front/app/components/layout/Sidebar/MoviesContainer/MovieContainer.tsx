import { FC } from 'react'
import PopularMoviesList from './PopularMoviesList/PopularMoviesList'
import dynamic from 'next/dynamic'

const DynamicFavoriteMovies = dynamic(
	() =>
		import(
			'@/components/layout/Sidebar/MoviesContainer/FavoriteMovies/FavoriteMovies'
		),
	{ ssr: false }
)

const MoviesContainer: FC = () => {
	return (
		<>
			<PopularMoviesList />
			<DynamicFavoriteMovies />
		</>
	)
}

export default MoviesContainer
