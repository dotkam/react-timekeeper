import React, { memo } from 'react'
import { animated } from 'react-spring'

import { MINUTES, CLOCK_VALUES, MODE } from '../helpers/constants'
import { transform } from '../helpers/math'
import { numbersStyle, numbersWrapperStyle } from './styles/numbers'

interface MinuteProps {
	anim: {
		// TODO - fix types... typescript is hard
		opacity: any
		translate: any
		translateInner: any
	}
}

interface HourProps extends MinuteProps {
	mode: MODE.HOURS_12 | MODE.HOURS_24
	hour24Mode: boolean
}

/*
	can memoize components since `anim` object doesn't actually change
*/

function hours({ anim, mode, hour24Mode }: HourProps) {
	const { opacity, translate: translateOuter, translateInner } = anim
	const { numbers: numbersOuter, numbersInner } = CLOCK_VALUES[mode]

	return (
		<animated.div
			style={{ opacity: opacity }}
			css={numbersWrapperStyle}
			className="react-timekeeper__clock-hours"
		>
			{numbersOuter.map((val, i) => {
				return (
					<animated.span
						css={numbersStyle({ hour24Mode })}
						key={val}
						style={{
							transform: translateOuter.interpolate((v) => transform(i + 1, v)),
						}}
					>
						{val}
					</animated.span>
				)
			})}

			{hour24Mode &&
				numbersInner!.map((val, i) => {
					return (
						<animated.span
							css={numbersStyle({ hour24Mode, inner: true })}
							key={val}
							style={{
								transform: translateInner.interpolate((v) => transform(i + 1, v)),
							}}
						>
							{val}
						</animated.span>
					)
				})}
		</animated.div>
	)
}

export const HourNumbers = memo(hours, (prev, next) => {
	return prev.mode === next.mode && prev.hour24Mode === next.hour24Mode
})

function minutes({ anim }: MinuteProps) {
	const { opacity, translate } = anim
	return (
		<animated.div
			style={{ opacity: opacity }}
			css={numbersWrapperStyle}
			className="react-timekeeper__clock-minutes"
		>
			{MINUTES.map((val, i) => {
				return (
					<animated.span
						css={numbersStyle({})}
						key={val}
						style={{
							transform: translate.interpolate((v) => transform(i + 1, v)),
						}}
					>
						{val}
					</animated.span>
				)
			})}
		</animated.div>
	)
}

export const MinuteNumbers = memo(minutes, () => {
	return true
})
