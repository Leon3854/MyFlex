import { Meta } from '@/utils/meta/Meta'
import { FC } from 'react'

import Heading from '@/components/ui/heading/Heading'
import AdminNavigation from '@/components/ui/amin-navigation/AdminNavigation'
import Statistics from './Statistics/Statistics'

const Admin: FC = () => {
	return (
		<Meta title="Admin panel">
			<AdminNavigation />
			<Heading title="some statistics" />
			<Statistics />
		</Meta>
	)
}

export default Admin
