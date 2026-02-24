import { ConsentManagerDialog, ConsentManagerProvider, CookieBanner } from '@c15t/nextjs'

import type { ReactNode } from 'react'

export default function ConsentManager({ children }: { children: ReactNode }) {
  const description = (
    <>
      <p>
        {`Le site du RPDAD utilise des cookies pour améliorer votre expérience et comprendre comment vous l’utilisez. En les autorisant, vous acceptez le dépôt et la lecture de cookies et l'utilisation de technologies de suivi nécessaires à leur bon fonctionnement.`}
      </p>
      <p>
        {`Nous conservons vos choix pendant une durée de 30 jours. Vous pouvez changer d'avis à tout moment en cliquant sur le bouton ci-dessous.`}
      </p>
      <p>
        {`Pour plus d’informations et exercer vos droits, nous vous recommandons de consulter notre `}
        <a
          href="https://www.rpdad.fr/mentions-legales"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold underline hover:opacity-80"
        >
          politique de confidentialité
        </a>
        {`.`}
      </p>
    </>
  )
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
                  "Le site du RPDAD de la Gironde utilise des cookies pour finalité d’assurer le bon fonctionnement du site, comprendre comment vous l’utilisez, interagir avec les réseaux sociaux. En les autorisant, vous acceptez le dépôt et la lecture de cookies et l'utilisation de technologies de suivi nécessaires à leur bon fonctionnement.",
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
      <CookieBanner description={description} />
      <ConsentManagerDialog />
      {children}
    </ConsentManagerProvider>
  )
}
