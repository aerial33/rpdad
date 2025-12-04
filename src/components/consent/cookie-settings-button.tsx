'use client'

import { useConsentManager } from '@c15t/nextjs'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface CookieSettingsButtonProps {
  className?: string
  children?: React.ReactNode
}

export function CookieSettingsButton({ className, children }: CookieSettingsButtonProps) {
  const { setIsPrivacyDialogOpen } = useConsentManager()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => setIsPrivacyDialogOpen(true)}
            className={className}
            aria-label="Paramètres des cookies"
          >
            {children || '🍪'}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Gérer mes préférences cookies</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
