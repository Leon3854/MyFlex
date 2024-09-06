import { FC } from 'react'

import LogoImage from '@/assets/images/logo.svg'
import Link from 'next/link'
import Image from 'next/image'

const Logo: FC = () => {
	return (
		<>
			<Link href="/">
				<div className="px-layout mb-10 block">
					<Image
						src={LogoImage}
						width={247}
						height={34}
						alt="Movie app"
						draggable={false}
						priority={true}
					/>
				</div>
			</Link>
		</>
	)
}
export default Logo
