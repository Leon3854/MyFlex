import { FC } from 'react'
import { useActors } from './useActors'
import { Meta } from '@/utils/meta/Meta'
import AdminNavigation from '@/components/ui/amin-navigation/AdminNavigation'
import Heading from '@/components/ui/heading/Heading'
import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '@/components/ui/admin-table/AdminTable/AdminTable'

const ActorList: FC = () => {
	const {
		data,
		isLoading,
		deleteAsync,
		searchTerm,
		handleSearch,
		createAsync,
	} = useActors()

	return (
		<Meta title="Actors">
			<AdminNavigation />
			<Heading title="Actors" />
			<AdminHeader
				handleSearch={handleSearch}
				searchTerm={searchTerm}
				onClick={createAsync}
			/>
			<AdminTable
				tableItems={data || []}
				headerItems={['Name', 'Count movies']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</Meta>
	)
}

export default ActorList
