'use client'

import { useEffect, useState } from 'react'

import { Analytics } from '@vercel/analytics/next'
import { useConsentManager } from '@c15t/nextjs'

export function ConditionalAnalytics() {
  const { consents } = useConsentManager()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return consents.measurement ? <Analytics /> : null
}
