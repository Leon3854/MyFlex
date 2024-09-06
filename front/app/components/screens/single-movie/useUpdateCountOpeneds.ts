import { MovieService } from '@/services/movie/movie.service'
import { useEffect } from 'react'
import { useMutation } from 'react-query'
import { IUserEditInput } from '../admin/user/user-edit.interface'

export const useUpdateCountOpened = (slug: string) => {
	//
	const { mutateAsync } = useMutation('update count opened', () =>
		MovieService.updateCountOpened(slug)
	)

	useEffect(() => {
		mutateAsync()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}
