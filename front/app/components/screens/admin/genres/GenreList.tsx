import { FC } from 'react'
import { useGenres } from './useGenres'
import { Meta } from '@/utils/meta/Meta'
import AdminNavigation from '@/components/ui/amin-navigation/AdminNavigation'
import Heading from '@/components/ui/heading/Heading'
import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '@/components/ui/admin-table/AdminTable/AdminTable'

const GenreList: FC = () => {
	const {
		data,
		isLoading,
		deleteAsync,
		searchTerm,
		handleSearch,
		createAsync,
	} = useGenres()

	return (
		<Meta title="Genres">
			<AdminNavigation />
			<Heading title="Genres" />
			<AdminHeader
				searchTerm={searchTerm}
				handleSearch={handleSearch}
				onClick={createAsync}
			/>
			<AdminTable
				tableItems={data || []}
				headerItems={['Name', 'Slug']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</Meta>
	)
}

export default GenreList
