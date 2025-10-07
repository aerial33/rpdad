import Link from 'next/link'

interface MembresContentProps {
  service?: string
  // Futurs props à définir...
}

export const MembresContent = ({ service }: MembresContentProps) => {
  return (
    <section>
      <div className="container mx-auto flex max-w-7xl flex-col items-center pt-4 pb-8 md:flex-row md:pt-8 md:pb-10 lg:pb-16">
        <aside className="top-20 mb-8 w-full self-start pt-8 md:sticky md:mr-8 md:w-fit md:min-w-[16rem] md:flex-1 lg:max-w-[18rem] lg:shrink-0 2xl:w-full">
          <div className="mb-8 flex w-full max-w-fit shrink-0 flex-col md:mb-10">
            <div className="hidden w-full md:mt-1 md:block">
              {/* Liens sociaux - à garder si nécessaire */}
            </div>
          </div>
          <div className="border-border theme-dark:border-zinc-700 theme-dark:bg-zinc-600 flex flex-col rounded-xl border bg-zinc-100 py-6 md:py-8">
            <div className="theme-dark:text-zinc-100 mb-6 px-6 leading-5 font-medium md:mb-4.5">
              {service}
            </div>
            <div className="mb-5 px-6 last:mb-0">
              <div className="theme-dark:text-zinc-400 overflow-hidden text-xs text-zinc-600 md:text-sm">
                Une plateforme d&apos;astreinte téléphonique prend le relai en dehors des heures
                d&apos;ouverture au public, ainsi que les week-end et jours fériés
              </div>
            </div>
            <div className="mb-5 px-6 last:mb-0">
              <div className="theme-dark:text-zinc-200 mb-2 text-xs font-semibold">
                Horaire d&apos;accueil
              </div>
              <div className="theme-dark:text-zinc-400 overflow-hidden text-xs text-zinc-600 md:text-sm">
                Du lundi au vendredi de 8h00 à 12h00 et de 14h00 à 18h00
                <br />
                Le vendredi de 8h00 à 12h00 et de 14h00 à 17h00
              </div>
            </div>
            <div className="border-border theme-dark:border-zinc-700 mb-5 border-t px-6 pt-5 last:mb-0">
              <div className="theme-dark:text-zinc-200 mb-2 text-xs font-semibold">Adresse</div>
              <div className="theme-dark:text-zinc-400 overflow-hidden text-xs text-zinc-600 md:text-sm">
                {service}, Gironde
              </div>
            </div>
            <div className="mb-5 px-6 last:mb-0">
              <div className="theme-dark:text-zinc-200 mb-2 text-xs font-semibold">
                Hôtel de ville
              </div>
              <div className="theme-dark:text-zinc-400 overflow-hidden text-xs text-zinc-600 md:text-sm">
                7 rue Pierre Pauilhac – 33740 ARES
              </div>
            </div>
            <div className="mb-5 px-6 last:mb-0">
              <div className="theme-dark:text-zinc-200 mb-2 text-xs font-semibold">
                Site Internet
              </div>
              <div className="theme-dark:text-zinc-400 overflow-hidden text-xs text-zinc-600 md:text-sm">
                <Link
                  href="#"
                  className="hover:text-foreground theme-dark:hover:text-zinc-300 underline"
                >
                  www.ville-ares.fr
                </Link>
              </div>
            </div>
          </div>
        </aside>
        <article className="prose prose-sm theme-dark:prose-invert mx-auto pt-8">
          <h1>Service d&apos;Aide et d&apos;Accompagnement à Domicile du {service}</h1>
          <h2>Le mot d&apos;accueil</h2>
          <p>
            Vous venez de rejoindre le Service d&apos;Aide et d&apos;Accompagnement à Domicile
            d&apos;Arès. Vous allez ainsi bénéficier des services de nos agents qualifiés. Nous vous
            remercions de la confiance que vous nous accordez et vous souhaitons la bienvenue !
          </p>
          <p>
            Rester chez soi le plus longtemps et dans les meilleures conditions possible est le vœu
            le plus cher de chacun d&apos;entre-nous. Pour répondre à ce besoin, avec beaucoup de
            dévouement les dix aides à domicile de notre service sont en mesure d&apos;apporter leur
            soutien aussi bien pratique que psychologique à toutes personnes pouvant bénéficier de
            ce service : retraités, et (ou) personnes en situation de handicap, bénéficiaires de
            l&apos;ARDH (Aide au Retour à Domicile après Hospitalisation). Compenser la perte
            d&apos;autonomie, maintenir le lien social, préserver les repères de la personne, tels
            sont les objectifs essentiels de notre service afin d&apos;assurer un maintien à
            domicile de qualité et le plus pérenne possible.
          </p>
          <h2>Le service</h2>
          <p>
            Ce service intervient auprès de personnes retraitées ou en situation de handicap qui
            rencontrent des difficultés dans l&apos;accomplissement des actes essentiels de la vie
            courante. Dix aides à domicile apportent soutien aussi bien pratique que psychologique
            aux personnes bénéficiant de ce service et ce afin d&apos;assurer le plus longtemps
            possible leur maintien à domicile.
          </p>

          <h3>Vos interlocuteurs</h3>
          <p>Une responsable de service est à votre écoute pour répondre à toutes vos questions.</p>
          <ul>
            <li>Une responsable équipe administrative...</li>
            <li>Un agent qualifié est à votre écoute pour répondre à toutes vos questions.</li>
          </ul>

          <h3>Le champ d&apos;intervention</h3>
          <p>
            Selon les plans d&apos;aide définis, et à l&apos;exception d&apos;actes relevant de
            soins médicaux :
          </p>
          <ul>
            <li>Entretien du logement et travaux ménagers</li>
            <li>Entretien du linge et repassage</li>
            <li>Courses de proximité (uniquement sur la commune)</li>
            <li>
              Aide à la promenade et transports de personnes ayant des difficultés de déplacement
              vers les lieux de vie sociale
            </li>
            <li>Activités de stimulation de la mémoire, temps de parole et d&apos;écoute</li>
            <li>Soutien à l&apos;aidant</li>
          </ul>
          <p>
            Organisme de service à la personne enregistré sous le numéro SAP263300113 auprès de la
            DIRRECTE
          </p>
          <h3>Le mode d&apos;intervention</h3>
          <p>
            Le service est assuré par des aides à domicile qualifiées et expérimentées. Elles sont
            accompagnées dans leur travail par un responsable de service.
          </p>
          <p>
            Besoin d&apos;informations complémentaires ? Consultez la page du service sur la
            plateforme SAAD du Département de la Gironde CLIQUER ICI
          </p>
        </article>
      </div>
    </section>
  )
}

export default MembresContent
