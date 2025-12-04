import { ConsentManagerDialog, ConsentManagerProvider, CookieBanner } from '@c15t/nextjs'

import type { ReactNode } from 'react'

export default function ConsentManager({ children }: { children: ReactNode }) {
  return (
    <ConsentManagerProvider
      options={{
        translations: {
          defaultLanguage: 'fr',
          translations: {
            fr: {
              common: {
                acceptAll: 'Tout accepter',
                rejectAll: 'Tout refuser',
                customize: 'Personnaliser',
                save: 'Enregistrer',
              },
              cookieBanner: {
                title: 'Utilisation de cookies',
                description:
                  'Nous utilisons des cookies pour vous offrir la meilleure expérience possible. En continuant à utiliser notre site, vous acceptez notre utilisation de cookies.',
              },
              consentManagerDialog: {
                title: 'Réglages des cookies',
                description:
                  'Vous pouvez modifier vos préférences de cookies en cliquant sur le bouton ci-dessous :',
              },
              consentTypes: {
                necessary: {
                  title: 'Cookies nécessaires',
                  description: 'Essentiels au fonctionnement correct du site web',
                },
                measurement: {
                  title: "Cookies d'analyse",
                  description:
                    'Nous aident à analyser votre utilisation du site et à améliorer votre expérience',
                },
                marketing: {
                  title: 'Cookies Medias',
                  description: 'Interactions avec les contenus multimédias (YouTube, Vimeo, etc.)',
                },
              },
            },
          },
        },
        mode: 'c15t',
        backendURL: '/api/c15t',
        consentCategories: ['necessary', 'measurement', 'marketing'], // Optional: Specify which consent categories to show in the banner.
        ignoreGeoLocation: true, // Useful for development to always view the banner.
      }}
    >
      <CookieBanner />
      <ConsentManagerDialog />
      {children}
    </ConsentManagerProvider>
  )
}
