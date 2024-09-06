import { FC } from 'react'
import { ISlide } from './slider.interface'
import { useSlider } from './useSlider'
import SlideItem from './SlideItem'
import SlideArrow from './SlideArrow/SlideArrow'
import styles from './Slider.module.scss'
import { CSSTransition } from 'react-transition-group'

interface ISlider {
	buttonTitle?: string
	slides: ISlide[]
}

const Slider: FC<ISlider> = ({ buttonTitle, slides }) => {
	const { handleClick, index, isNext, isPrev, slideIn } = useSlider(
		slides.length
	)

	return (
		<div className={styles.slider}>
			{isPrev && (
				<SlideArrow variant="left" clickHandler={() => handleClick('prev')} />
			)}

			<CSSTransition
				in={slideIn}
				timeout={300}
				classNames="slide-animation"
				unmountOnExit
			>
				<SlideItem slide={slides[index]} buttonTitle={buttonTitle} />
			</CSSTransition>

			{isNext && (
				<SlideArrow variant="right" clickHandler={() => handleClick('next')} />
			)}
		</div>
	)
}

export default Slider
