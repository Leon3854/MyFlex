import { FC } from 'react'

import styles from './Profile.module.scss'
import { IProfileInput } from './profile.interface'
import { useForm } from 'react-hook-form'
import { useProfile } from './useProfile'
import { Meta } from '@/utils/meta/Meta'
import Heading from '@/components/ui/heading/Heading'
import Button from '@/components/ui/form-elements/Button'
import AuthFields from '../auth/AuthField'
import { SkeletonLoader } from '@/components/ui/skeletonLoader/SkeletonLoader'

const Profile: FC = () => {
	const { handleSubmit, register, formState, setValue } =
		useForm<IProfileInput>({
			mode: 'onChange',
		})

	const { isLoading, onSubmit } = useProfile(setValue)

	return (
		<Meta title="Profile">
			<Heading title="Profile" />
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				{isLoading ? (
					<SkeletonLoader count={2} />
				) : (
					<AuthFields register={register} formState={formState} />
				)}

				<Button>Update</Button>
			</form>
		</Meta>
	)
}

export default Profile
