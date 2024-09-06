import { FC } from 'react'
import { ICollection } from './collections.interface'
import { Meta } from '@/utils/meta/Meta'
import Heading from '@/components/ui/heading/Heading'
import Description from '@/components/ui/heading/Description'
import CollectionItem from './CollectionItem'
import styles from './Collections.module.scss'
const title = 'Discovery'
const description = 'In this section you will find all genres on our site'

const Collections: FC<{ collections: ICollection[] }> = ({ collections }) => {
	return (
		<Meta title={title} description={description}>
			<Heading title={title} className={styles.heading} />
			<Description text={description} className={styles.description} />

			<section className={styles.collections}>
				{collections.map((collection) => (
					<CollectionItem key={collection._id} collection={collection} />
				))}
			</section>
		</Meta>
	)
}

export default Collections
