import { AdminService } from '@/services/admin/admin.service'
import { FC } from 'react'
import { useQuery } from 'react-query'
import cn from 'classnames'

import styles from '../Admin.module.scss'
import { SkeletonLoader } from '@/components/ui/skeletonLoader/SkeletonLoader'

const CountUsers: FC = () => {
	const { isLoading, data: response } = useQuery('Count users', () =>
		AdminService.getCountUsers()
	)

	return (
		<>
			<div className={cn(styles.block, styles.countUsers)}>
				<div>
					{isLoading ? (
						<SkeletonLoader />
					) : (
						<div className={styles.number}>{response?.data}</div>
					)}
					<div className={styles.description}>user</div>
				</div>
			</div>
		</>
	)
}
export default CountUsers
