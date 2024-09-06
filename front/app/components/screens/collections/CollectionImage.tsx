import { FC } from 'react'
import { ICollection } from './collections.interface'
import Image from 'next/image'

const CollectionImage: FC<{ collection: ICollection }> = ({
	collection: { image, title },
}) => {
	return <Image alt={title} src={image} layout="fill" draggable={false} />
}

export default CollectionImage
