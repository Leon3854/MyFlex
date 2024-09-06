import { IOption } from '@/components/ui/select/select.interface'
import { ActorService } from '@/services/actor/actor.service'
import { toastError } from '@/utils/api/withToastrErrorRedux'
import { useQuery } from 'react-query'

export const useAdminActors = () => {
	const queryData = useQuery('list of actor', () => ActorService.getAll(), {
		select: ({ data }) =>
			data.map(
				(actor): IOption => ({
					label: actor.name,
					value: actor._id,
				})
			),
		onError: (error) => {
			toastError(error, 'actor list')
		},
	})

	return queryData
}
