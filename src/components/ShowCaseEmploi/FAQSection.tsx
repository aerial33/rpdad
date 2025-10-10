'use client'

import { ChevronDown } from 'lucide-react'

import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

const faqData = [
  {
    question: 'En quoi consiste le travail d’aide à domicile ?',
    answer:
      'Vous accompagnez des personnes âgées et/ou en situation de handicap afin qu’elles puissent continuer à vivre chez elles dans de bonnes conditions. Concrètement, vous pouvez :• les accompagner dans les gestes du quotidien (toilette, habillage, repas)  • réaliser des tâches ménagères (entretien du logement, linge, courses) • leur apporter un soutien social (discussions, écoute, présence bienveillante) Votre rôle est à la fois pratique, humain et rassurant pour les personnes que vous aidez.',
  },
  {
    question: 'Quels types de contrats proposez-vous ?',
    answer:
      "Nous proposons différents types de contrats : CDI, CDD, temps partiel, temps complet, contrats d'apprentissage et stages. Nos offres s'adaptent aux besoins et disponibilités de chacun.",
  },
  {
    question: "Quelles sont les possibilités d'évolution de carrière ?",
    answer:
      "Le RPDAD offre de nombreuses perspectives d'évolution : responsable de secteur, coordinateur, formateur, ou spécialisation dans l'accompagnement de publics spécifiques. Nous encourageons la formation continue et l'évolution professionnelle.",
  },
  {
    question: "Quel est le secteur géographique d'intervention ?",
    answer:
      "Nous intervenons sur l'ensemble du département de la Gironde, avec des secteurs urbains et ruraux. Chaque agent est affecté à un secteur géographique défini pour optimiser les déplacements.",
  },
  {
    question: 'Quels sont les avantages du service public ?',
    answer:
      "En tant qu'agents de la fonction publique territoriale, nos employés bénéficient d'une sécurité de l'emploi, d'un régime de retraite avantageux, de congés spécifiques, et d'un accompagnement professionnel continu.",
  },
  {
    question: 'Comment se déroule le processus de recrutement ?',
    answer:
      "Le processus comprend l'envoi de candidature, un entretien avec le responsable du secteur, une visite médicale et une période d'intégration avec accompagnement personnalisé.",
  },
]

export function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    )
  }

  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <Badge className="mb-4" variant="outline">
            F.A.Q
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-700 md:text-4xl lg:text-5xl">
            Questions Fréquentes
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Trouvez les réponses aux questions les plus courantes sur nos offres d'emploi et notre
            organisation.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="space-y-4">
            {faqData.map((faq, index) => {
              const isOpen = openItems.includes(index)
              return (
                <Card
                  key={index}
                  className={`border-0 bg-white/80 shadow-sm backdrop-blur-sm transition-all duration-300 ${
                    isOpen ? 'ring-primary/10 shadow-lg ring-2' : 'hover:shadow-md'
                  }`}
                >
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleItem(index)}
                      className="hover:bg-muted/20 focus:ring-primary/20 group w-full rounded-lg p-6 text-left transition-all duration-200 focus:ring-2 focus:outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <h3
                          className={`pr-8 text-lg font-semibold transition-colors duration-200 ${
                            isOpen ? 'text-primary' : 'text-foreground group-hover:text-primary'
                          }`}
                        >
                          {faq.question}
                        </h3>
                        <div
                          className={`transition-transform duration-300 ease-in-out ${
                            isOpen ? 'rotate-180' : 'rotate-0'
                          }`}
                        >
                          <ChevronDown
                            className={`h-5 w-5 flex-shrink-0 transition-colors duration-200 ${
                              isOpen
                                ? 'text-primary'
                                : 'text-muted-foreground group-hover:text-primary'
                            }`}
                          />
                        </div>
                      </div>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-6 pb-6">
                        <div
                          className={`border-t pt-4 transition-all duration-200 ${
                            isOpen ? 'delay-150' : ''
                          }`}
                        >
                          <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
