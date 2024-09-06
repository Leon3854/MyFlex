import { FC } from 'react'

import styles from './Sidebar.module.scss'
import Search from './Search/Search'
import MoviesContainer from './MoviesContainer/MovieContainer'

const Sidebar: FC = () => {
	return (
		<div className={styles.sidebar}>
			<Search />
			<MoviesContainer />
		</div>
	)
}

export default Sidebar
