'use client'

import React from 'react'

type CountdownProps = {
  targetDate: Date | string | number
  className?: string
  onComplete?: () => void
  labels?: {
    days: string
    hours: string
    minutes: string
    seconds: string
  }
}

function getTimeRemaining(target: number) {
  const totalMs = Math.max(0, target - Date.now())
  const totalSeconds = Math.floor(totalMs / 1000)

  const days = Math.floor(totalSeconds / (60 * 60 * 24))
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60))
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
  const seconds = Math.floor(totalSeconds % 60)

  return { totalMs, days, hours, minutes, seconds }
}

export function Countdown({
  targetDate,
  className,
  onComplete,
  labels = { days: 'Jours', hours: 'Heures', minutes: 'Minutes', seconds: 'Secondes' },
}: CountdownProps) {
  const targetTs = React.useMemo(() => new Date(targetDate).getTime(), [targetDate])

  const [timeLeft, setTimeLeft] = React.useState(() => getTimeRemaining(targetTs))

  React.useEffect(() => {
    setTimeLeft(getTimeRemaining(targetTs))

    if (targetTs <= Date.now()) {
      if (onComplete) onComplete()
      return
    }

    const intervalId = window.setInterval(() => {
      setTimeLeft((prev) => {
        const next = getTimeRemaining(targetTs)
        if (prev.totalMs !== 0 && next.totalMs === 0 && onComplete) onComplete()
        return next
      })
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [targetTs, onComplete])

  return (
    <div className={className} aria-live="polite" role="timer">
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold tabular-nums sm:text-3xl md:text-4xl lg:text-5xl">
            {timeLeft.days}
          </div>
          <div className="mt-1 text-xs text-gray-600 sm:mt-2 sm:text-sm">{labels.days}</div>
        </div>
        <div className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">:</div>
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold tabular-nums sm:text-3xl md:text-4xl lg:text-5xl">
            {timeLeft.hours.toString().padStart(2, '0')}
          </div>
          <div className="mt-1 text-xs text-gray-600 sm:mt-2 sm:text-sm">{labels.hours}</div>
        </div>
        <div className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">:</div>
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold tabular-nums sm:text-3xl md:text-4xl lg:text-5xl">
            {timeLeft.minutes.toString().padStart(2, '0')}
          </div>
          <div className="mt-1 text-xs text-gray-600 sm:mt-2 sm:text-sm">{labels.minutes}</div>
        </div>
        <div className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">:</div>
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold tabular-nums sm:text-3xl md:text-4xl lg:text-5xl">
            {timeLeft.seconds.toString().padStart(2, '0')}
          </div>
          <div className="mt-1 text-xs text-gray-600 sm:mt-2 sm:text-sm">{labels.seconds}</div>
        </div>
      </div>
    </div>
  )
}

export default Countdown
