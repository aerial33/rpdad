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
      <div className="flex justify-center">
        <div className="flex flex-col items-center">
          <div className="text-5xl font-bold tabular-nums">{timeLeft.days}</div>
          <div className="mt-2 text-sm text-gray-600">{labels.days}</div>
        </div>
        <div className="mx-4 text-5xl font-bold">:</div>
        <div className="flex flex-col items-center">
          <div className="text-5xl font-bold tabular-nums">
            {timeLeft.hours.toString().padStart(2, '0')}
          </div>
          <div className="mt-2 text-sm text-gray-600">{labels.hours}</div>
        </div>
        <div className="mx-4 text-5xl font-bold">:</div>
        <div className="flex flex-col items-center">
          <div className="text-5xl font-bold tabular-nums">
            {timeLeft.minutes.toString().padStart(2, '0')}
          </div>
          <div className="mt-2 text-sm text-gray-600">{labels.minutes}</div>
        </div>
        <div className="mx-4 text-5xl font-bold">:</div>
        <div className="flex flex-col items-center">
          <div className="text-5xl font-bold tabular-nums">
            {timeLeft.seconds.toString().padStart(2, '0')}
          </div>
          <div className="mt-2 text-sm text-gray-600">{labels.seconds}</div>
        </div>
      </div>
    </div>
  )
}

export default Countdown
