import Collections from '@/components/screens/collections/Collections'
import { ICollection } from '@/components/screens/collections/collections.interface'
import { GenreService } from '@/services/genre/genre.service'
import { GetStaticProps, NextPage } from 'next'
import Error404 from './404'

const GenresPage: NextPage<{ collections: ICollection[] }> = ({
	collections,
}) => {
	return collections ? (
		<Collections collections={collections || []} />
	) : (
		<Error404 />
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: collections } = await GenreService.getCollections()

		console.log(collections)

		return {
			props: { collections },
			revalidate: 60,
		}
	} catch (error) {
		return {
			props: {},
			// notFound: true,
		}
	}
}

export default GenresPage
