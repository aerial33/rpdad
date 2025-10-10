import { Quote } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

export function TestimonialSection() {
  return (
    <section className="from-flamingo-lighter/50 to-flamingo-lightest/10 bg-gradient-to-br py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-700 md:text-4xl lg:text-5xl">
            Nos témoignages
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Découvrez les expériences de nos professionnels et bénéficiaires
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
            <CardContent className="p-8">
              <Quote className="text-primary mb-4 h-8 w-8" />
              <blockquote className="mb-6 text-lg leading-relaxed">
                {
                  " Je souhaite apporter de la sérénité et du bien-être au quotidien. Venir chez eux c'est leur permettre le maintien à domicile et de les sortir de l'isolement, la solitude."
                }
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
                  <span className="text-primary font-semibold">M</span>
                </div>
                <div>
                  <p className="font-semibold">Espérence</p>
                  <p className="text-muted-foreground text-sm">24 ans • Aide à domicile</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
            <CardContent className="p-8">
              <Quote className="text-primary mb-4 h-8 w-8" />
              <blockquote className="mb-6 text-lg leading-relaxed">
                {
                  'Je suis heureuse d’aider nos bénéficiaires pour les tâches qu’ils ne peuvent plus réaliser eux-mêmes. J’aime les accompagner et les voir sourire'
                }
              </blockquote>
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-semibold">Véroniqua</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
            <CardContent className="p-8">
              <Quote className="text-primary mb-4 h-8 w-8" />
              <blockquote className="mb-6 text-lg leading-relaxed">
                {
                  'J’ai commencé à travailler en parallèle de mes études et j’ai trouvé du sens dans ce métier, j’ai donc continué à temps partiel même après avoir terminé mon parcours'
                }
              </blockquote>
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-semibold">David</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
            <CardContent className="p-8">
              <Quote className="text-primary mb-4 h-8 w-8" />
              <blockquote className="mb-6 text-lg leading-relaxed">
                {
                  'Je voulais m’orienter vers un secteur plus humain et plus gratifiant. Ce que j’aime dans mon travail avec les bénéficiaires c’est le sourire du matin, les anecdotes que l’on partage, la complicité, la confiance qui s’installes'
                }
              </blockquote>
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-semibold">Christine</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
