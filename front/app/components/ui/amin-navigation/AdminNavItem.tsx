import { FC } from 'react'
import { INavItem } from './admin-navigation.interface'
import { useRouter } from 'next/router'
import Link from 'next/link'
import cn from 'classnames'

import styles from './AdminNavigation.module.scss'

const AdminNavItem: FC<{ item: INavItem }> = ({ item }) => {
	const { asPath } = useRouter()
	return (
		<li>
			<Link
				href={item.link}
				className={cn({ [styles.active]: asPath === item.link })}
			>
				{item.title}
			</Link>
		</li>
	)
}

export default AdminNavItem
