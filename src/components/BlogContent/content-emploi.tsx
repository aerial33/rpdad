import RichText from '@/components/RichText'
import type { Emplois } from '@/payload-types'
import Link from 'next/link'

export const BlogSection = ({ emploi }: { emploi: Emplois }) => {
  const getWorkTimeLabel = (workTime: string) => {
    const workTimeMap = {
      'full-time': 'Temps plein',
      'part-time': 'Temps partiel',
      flexible: 'Horaires flexibles',
    }
    return workTimeMap[workTime as keyof typeof workTimeMap] || workTime
  }

  return (
    <section>
      <div className="container mx-auto flex max-w-7xl flex-col justify-between items-center pt-4 pb-8 md:flex-row gap-8 border border-red-500 ">
        <article className="prose prose-sm md:prose-base lg:prose-lg theme-dark:prose-invert w-full  pt-8">
          <h2>{emploi.title}</h2>

          {/* Description du poste */}
          {emploi.description && (
            <div className="mb-8 ">
              <RichText data={emploi.description} enableGutter={false} />
            </div>
          )}

          {/* Compétences requises */}
          {emploi.requiredSkills && emploi.requiredSkills.length > 0 && (
            <div className="mb-8">
              <h2>Compétences requises</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
                {emploi.requiredSkills.map((skill, index) => (
                  <div key={index} className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h3 className="font-semibold text-sm mb-1">{skill.skill}</h3>
                    <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                      Niveau{' '}
                      {skill.level === 'beginner'
                        ? 'débutant'
                        : skill.level === 'intermediate'
                          ? 'intermédiaire'
                          : skill.level === 'experienced'
                            ? 'expérimenté'
                            : 'expert'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Qualifications */}
          {emploi.qualifications && (
            <div className="mb-8">
              <h2>Qualifications et expérience</h2>
              <RichText data={emploi.qualifications} enableGutter={false} />
            </div>
          )}

          {/* Processus de candidature */}
          {emploi.applicationProcess && (
            <div className="mb-8">
              <h2>Comment postuler</h2>
              <RichText data={emploi.applicationProcess} enableGutter={false} />
            </div>
          )}

          {/* Bouton principal de candidature */}
          {emploi.contactEmail && (
            <div className="mt-12 flex items-center justify-center not-prose">
              <Link
                href={`mailto:${emploi.contactEmail}?subject=Candidature%20${emploi.title}%20-%20${emploi.organization || ''}`}
                className="bg-primary hover:bg-primary/90 rounded-lg px-6 py-3 text-white font-medium transition-colors"
              >
                Postuler à cette offre
              </Link>
            </div>
          )}
        </article>
        <aside className="mt-12 w-full lg:mt-0 lg:w-2/5 lg:ps-10 xl:w-1/3 xl:ps-0 self-start lg:sticky lg:top-7 ">
          <div className="mb-8 flex w-full max-w-fit flex-col pl-4 md:mb-10">
            <div className="hidden w-full md:mt-1 md:block">
              {/* <div className="flex w-full items-center space-x-6">
                <Link href="#" className="transition-transform hover:-translate-y-0.5">
                  <svg
                    className="theme-dark:text-pink-400 size-5 text-pink-600"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </Link>
                <Link href="#" className="transition-transform hover:-translate-y-0.5">
                  <svg
                    className="theme-dark:text-blue-500 size-5 text-blue-700"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </Link>
              </div> */}
            </div>
          </div>
          <div className=" theme-dark:border-zinc-700 theme-dark:bg-zinc-600 flex flex-col rounded-xl border bg-zinc-100 py-6 md:py-8">
            {/* Organisation */}
            {emploi.organization && (
              <div className="theme-dark:text-zinc-100 mb-6 px-6 leading-5 font-medium md:mb-4.5">
                {emploi.organization}
              </div>
            )}

            {/* Type de contrat et temps de travail */}
            <div className="mb-5 px-6 last:mb-0">
              <div className="theme-dark:text-zinc-400 overflow-hidden text-xs text-zinc-600 md:text-sm">
                {emploi.categories
                  ?.map((category) => (typeof category === 'object' ? category.title : category))
                  .join(', ') || 'Non spécifié'}
                {emploi.workTime && ` - ${getWorkTimeLabel(emploi.workTime)}`}
              </div>
            </div>

            {/* Lieu */}
            {emploi.location && (
              <div className="mb-5 px-6 last:mb-0">
                <div className="theme-dark:text-zinc-200 mb-2 text-xs font-semibold">Lieu</div>
                <div className="theme-dark:text-zinc-400 overflow-hidden text-xs text-zinc-600 md:text-sm">
                  {emploi.location}
                </div>
              </div>
            )}

            {/* Salaire */}
            {emploi.salary && (
              <div className="mb-5 px-6 last:mb-0">
                <div className="theme-dark:text-zinc-200 mb-2 text-xs font-semibold">Salaire</div>
                <div className="theme-dark:text-zinc-400 overflow-hidden text-xs text-zinc-600 md:text-sm">
                  {emploi.salary}
                </div>
              </div>
            )}

            {/* Dates */}
            {(emploi.startDate || emploi.endDate) && (
              <div className="border-border theme-dark:border-zinc-700 mb-5 border-t px-6 pt-5 last:mb-0">
                {emploi.startDate && (
                  <div className="mb-3">
                    <div className="theme-dark:text-zinc-200 mb-2 text-xs font-semibold">
                      Date de début
                    </div>
                    <div className="theme-dark:text-zinc-400 overflow-hidden text-xs text-zinc-600 md:text-sm">
                      {new Date(emploi.startDate).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                )}
                {emploi.endDate && (
                  <div>
                    <div className="theme-dark:text-zinc-200 mb-2 text-xs font-semibold">
                      Date limite candidature
                    </div>
                    <div className="theme-dark:text-zinc-400 overflow-hidden text-xs text-zinc-600 md:text-sm">
                      {new Date(emploi.endDate).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Contact */}
            {(emploi.contactEmail || emploi.contactPhone) && (
              <div className="border-border theme-dark:border-zinc-700 mb-5 border-t px-6 pt-5 last:mb-0">
                <div className="theme-dark:text-zinc-200 mb-2 text-xs font-semibold">Contact</div>
                <div className="theme-dark:text-zinc-400 overflow-hidden text-xs text-zinc-600 md:text-sm">
                  {emploi.contactEmail && (
                    <div className="mb-1">
                      <a
                        href={`mailto:${emploi.contactEmail}`}
                        className="hover:text-foreground theme-dark:hover:text-zinc-300 underline"
                      >
                        {emploi.contactEmail}
                      </a>
                    </div>
                  )}
                  {emploi.contactPhone && (
                    <div>
                      <a
                        href={`tel:${emploi.contactPhone}`}
                        className="hover:text-foreground theme-dark:hover:text-zinc-300"
                      >
                        {emploi.contactPhone}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Avantages */}
            {emploi.benefits && emploi.benefits.length > 0 && (
              <div className="mb-5 px-6 last:mb-0">
                <div className="theme-dark:text-zinc-200 mb-2 text-xs font-semibold">Avantages</div>
                <div className="theme-dark:text-zinc-400 overflow-hidden text-xs text-zinc-600 md:text-sm">
                  <ul className="list-none space-y-1">
                    {emploi.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 text-green-500">•</span>
                        {benefit.benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Bouton postuler */}
            {emploi.contactEmail && (
              <div className="mb-5 px-6 last:mb-0">
                <div className="theme-dark:text-zinc-200 mb-2 text-xs font-semibold">Postuler</div>
                <div className="theme-dark:text-zinc-400 overflow-hidden text-xs text-zinc-600 md:text-sm">
                  <Link
                    href={`mailto:${emploi.contactEmail}?subject=Candidature%20${emploi.title}%20-%20${emploi.organization || ''}`}
                    className="hover:text-foreground theme-dark:hover:text-zinc-300 underline"
                  >
                    Envoyer votre candidature
                  </Link>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </section>
  )
}

export default BlogSection
