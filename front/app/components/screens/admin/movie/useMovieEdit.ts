import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { IMovieEditInput } from './movie-edit.interface'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from 'react-query'
import { MovieService } from '@/services/movie/movie.service'
import { getKeys } from '@/utils/object/getKeys'
import { toastError } from '@/utils/api/withToastrErrorRedux'
import { toastr } from 'react-redux-toastr'
import { getAdminUrl } from '@/config/url.config'

export const useMovieEdit = (setValue: UseFormSetValue<IMovieEditInput>) => {
	const { query, push } = useRouter()

	const movieId = String(query.id)

	const { isLoading } = useQuery(
		['movie', movieId],
		() => MovieService.getById(movieId),
		{
			onSuccess({ data }) {
				getKeys(data).forEach((key) => {
					setValue(key, data[key])
				})
			},
			onError(error) {
				toastError(error, 'Get movie')
			},
			enabled: !!query.id,
		}
	)

	const { mutateAsync } = useMutation(
		'update movie',
		(data: IMovieEditInput) => MovieService.update(movieId, data),
		{
			onError(error) {
				toastError(error, 'Update movie')
			},
			onSuccess() {
				toastr.success('Update movie', 'update was successful')
				push(getAdminUrl('movies'))
			},
		}
	)

	const onSubmit: SubmitHandler<IMovieEditInput> = async (data) => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
