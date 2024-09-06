import { FC } from 'react'
import { ICollection } from './collections.interface'
import Link from 'next/link'
import { getGenreUrl } from '@/config/url.config'
import CollectionImage from './CollectionImage'
import styles from './Collections.module.scss'
import cn from 'classnames'

const CollectionItem: FC<{ collection: ICollection }> = ({ collection }) => {
	return (
		<Link href={getGenreUrl(collection.slug)}>
			<div className={styles.collection}>
				<CollectionImage collection={collection} />

				<div className={styles.content}>
					<div className={styles.title}>{collection.title}</div>
				</div>

				<div className={cn(styles.behind, styles.second)}>
					<CollectionImage collection={collection} />
				</div>

				<div className={cn(styles.behind, styles.third)}>
					<CollectionImage collection={collection} />
				</div>
			</div>
		</Link>
	)
}

export default CollectionItem
