import { FC } from 'react'
import { IGalleryItemProps } from './gallery.interface'
import Link from 'next/link'
import cn from 'classnames'
import Image from 'next/image'
import styles from './Gallery.module.scss'

const GalleryItem: FC<IGalleryItemProps> = ({ item, variant }) => {
	return (
		<Link href={item.link} legacyBehavior>
			<div
				className={cn(styles.item, {
					[styles.withText]: item.content,
					[styles.horizontal]: variant === 'horizontal',
					[styles.vertical]: variant === 'vertical',
				})}
			>
				<Image
					sizes="(max-width: 271px), (max-height: 429px)"
					alt={item.name}
					src={item.posterPath}
					fill
					draggable={false}
					priority={true}
				/>
				{item.content && (
					<div className={styles.content}>
						<div className={styles.title}>{item.content.title}</div>
						{item.content.subTitle && (
							<div className={styles.subTitle}> {item.content.subTitle}</div>
						)}
					</div>
				)}
			</div>
		</Link>
	)
}

export default GalleryItem
