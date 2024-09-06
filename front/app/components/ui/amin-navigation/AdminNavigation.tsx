import { FC } from 'react'
import styles from './AdminNavigation.module.scss'
import { navItems } from './admin-navigation.data'
import AdminNavItem from './AdminNavItem'
const AdminNavigation: FC = () => {
	return (
		<nav className={styles.nav}>
			<ul>
				{navItems.map((item) => (
					<AdminNavItem item={item} key={item.link} />
				))}
			</ul>
		</nav>
	)
}
export default AdminNavigation
