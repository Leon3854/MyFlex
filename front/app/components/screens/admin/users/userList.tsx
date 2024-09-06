import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader'
import AdminNavigation from '@/components/ui/amin-navigation/AdminNavigation'
import Heading from '@/components/ui/heading/Heading'

import { Meta } from '@/utils/meta/Meta'

import { useUsers } from './useUsers'
import AdminTable from '@/components/ui/admin-table/AdminTable/AdminTable'
import { FC } from 'react'

const UserList: FC = () => {
	const { handleSearch, isLoading, searchTerm, data, deleteAsync } = useUsers()
	return (
		<Meta title="Users">
			<AdminNavigation />
			<Heading title="users" />
			<AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} />
			<AdminTable
				tableItems={data || []}
				headerItems={['Email', 'Date register']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</Meta>
	)
}

export default UserList
