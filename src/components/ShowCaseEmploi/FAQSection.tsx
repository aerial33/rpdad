'use client'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const faqData = [
  {
    question: 'Quelles sont les conditions pour rejoindre le RPDAD ?',
    answer:
      "Pour rejoindre notre équipe, nous recherchons des personnes motivées, avec ou sans expérience. Une formation dans le secteur social ou médico-social est appréciée mais pas obligatoire. Nous proposons des formations d'accompagnement pour tous nos nouveaux collaborateurs.",
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
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="outline">
            F.A.Q
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Questions Fréquentes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trouvez les réponses aux questions les plus courantes sur nos offres d'emploi et notre
            organisation.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqData.map((faq, index) => {
              const isOpen = openItems.includes(index)
              return (
                <Card
                  key={index}
                  className={`border-0 bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-300 ${
                    isOpen ? 'shadow-lg ring-2 ring-primary/10' : 'hover:shadow-md'
                  }`}
                >
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full text-left p-6 hover:bg-muted/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg group"
                    >
                      <div className="flex items-center justify-between">
                        <h3
                          className={`text-lg font-semibold pr-8 transition-colors duration-200 ${
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
