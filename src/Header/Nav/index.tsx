'use client'

import React from 'react'

import { CMSLink } from '@/components/Link'
import type { HautDePage as HeaderType } from '@/payload-types'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  console.log(navItems.map(({ subNavigation }) => subNavigation?.map(({ link }) => link)))

  return (
    <nav className="flex items-center gap-3">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" />
      })}
    </nav>
  )
}
