import type { Metadata } from 'next'

import { CookieSettingsButton } from '@/components/consent/cookie-settings-button'

export const metadata: Metadata = {
  title: 'Politique de confidentialité et cookies',
  description: 'Politique de confidentialité et gestion des cookies du RPDAD',
}

export default function ConfidentialitePage() {
  return (
    <main className="container mx-auto flex-1 px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold">Politique de confidentialité et cookies</h1>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Utilisation des cookies</h2>
          <p className="text-muted-foreground mb-4">
            Le site du RPDAD utilise des cookies pour améliorer votre expérience de navigation et
            analyser l'utilisation du site. Vous pouvez à tout moment modifier vos préférences en
            matière de cookies.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Types de cookies utilisés</h2>

          <div className="mb-6">
            <h3 className="mb-2 text-xl font-medium">Cookies nécessaires</h3>
            <p className="text-muted-foreground">
              Ces cookies sont essentiels au fonctionnement du site. Ils permettent l'utilisation
              des fonctionnalités de base comme la navigation et l'accès aux zones sécurisées.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="mb-2 text-xl font-medium">Cookies de mesure d'audience</h3>
            <p className="text-muted-foreground">
              Ces cookies nous permettent de comprendre comment les visiteurs utilisent notre site
              en collectant des informations anonymes sur les pages visitées et les interactions.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Gérer vos préférences</h2>
          <p className="text-muted-foreground mb-6">
            Vous pouvez à tout moment modifier vos préférences de cookies en cliquant sur le bouton
            ci-dessous :
          </p>

          <CookieSettingsButton className="hover:bg-primary/90 bg-primary rounded-lg px-6 py-3 font-semibold text-white transition-colors">
            Modifier mes préférences de cookies
          </CookieSettingsButton>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Protection des données personnelles</h2>
          <p className="text-muted-foreground mb-4">
            Le RPDAD s'engage à protéger vos données personnelles conformément au RGPD. Les
            informations collectées via les cookies sont traitées de manière sécurisée et ne sont
            jamais vendues à des tiers.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Contact</h2>
          <p className="text-muted-foreground">
            Pour toute question concernant notre politique de confidentialité ou l'utilisation de
            vos données personnelles, vous pouvez nous contacter à :{' '}
            <a href="mailto:rpdad@udccas33.org" className="text-primary hover:underline">
              rpdad@udccas33.org
            </a>
          </p>
        </section>
      </div>
    </main>
  )
}
