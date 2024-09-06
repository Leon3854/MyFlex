import { IActorEditInput } from './actor-edit.interface'
import { useActorEdit } from './useActorEdit'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import formStyles from '@/components/ui/form-elements/FormElements.module.scss'
import SlugField from '@/components/ui/form-elements/SlugField/SlugField'
import { SkeletonLoader } from '@/components/ui/skeletonLoader/SkeletonLoader'

import { Meta } from '@/utils/meta/Meta'
import AdminNavigation from '@/components/ui/amin-navigation/AdminNavigation'

import { generateSlug } from '@/utils/string/generateSlug'

import UploadField from '@/components/ui/form-elements/UploadField/UploadField'
import Heading from '@/components/ui/heading/Heading'
import Field from '@/components/ui/form-elements/Field'
import Button from '@/components/ui/form-elements/Button'

const ActorEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control,
	} = useForm<IActorEditInput>({
		mode: 'onChange',
	})

	const { isLoading, onSubmit } = useActorEdit(setValue)

	return (
		<Meta title="Edit actor">
			<AdminNavigation />
			<Heading title="Edit actor" />
			{isLoading ? (
				<SkeletonLoader count={3} />
			) : (
				<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
					<div className={formStyles.fields}>
						<Field
							{...register('name', {
								required: 'Name is required!',
							})}
							placeholder="Name"
							error={errors.name}
						/>
						<SlugField
							generate={() => setValue('slug', generateSlug(getValues('name')))}
							register={register}
							error={errors.slug}
						/>
						<Controller
							name="photo"
							control={control}
							defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<UploadField
									placeholder="Photo"
									error={error}
									folder="actors"
									image={value}
									onChange={onChange}
								/>
							)}
							rules={{
								required: 'Photo is required!',
							}}
						/>
					</div>

					<Button>Update</Button>
				</form>
			)}
		</Meta>
	)
}

export default ActorEdit
