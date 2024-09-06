import { useFavorites } from '@/components/screens/favorites/useFavorites'
import { useAuth } from '@/hooks/useAuth'
import { FC } from 'react'
import NotAuthFavorites from './NotAuthFavorites'
import { SkeletonLoader } from '@/components/ui/skeletonLoader/SkeletonLoader'
import MovieList from '../MovieList'

const FavoriteMovies: FC = () => {
	//
	const { favoriteMovies, isLoading } = useFavorites()

	const { user } = useAuth()

	if (!user) return <NotAuthFavorites />

	return isLoading ? (
		<div className="mt-11">
			<SkeletonLoader count={3} className="h-28 mb-4" />
		</div>
	) : (
		<MovieList
			link="/favorites"
			movies={favoriteMovies?.slice(0, 3) || []}
			title="Favorites"
		/>
	)
}

export default FavoriteMovies
