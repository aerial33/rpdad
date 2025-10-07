import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Quote } from 'lucide-react'

export function TestimonialSection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="outline">
            Témoignages
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Ils nous font confiance
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez les expériences de nos professionnels et bénéficiaires
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-8">
              <Quote className="h-8 w-8 text-primary mb-4" />
              <blockquote className="text-lg mb-6 leading-relaxed">
                "Être aide à domicile, c'est avoir le sens de l'écoute et des responsabilités,
                prendre des initiatives et agir avec autonomie."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold">M</span>
                </div>
                <div>
                  <p className="font-semibold">Marion</p>
                  <p className="text-sm text-muted-foreground">24 ans • Aide à domicile</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-8">
              <Quote className="h-8 w-8 text-primary mb-4" />
              <blockquote className="text-lg mb-6 leading-relaxed">
                "Ce métier me permet de donner du sens à ma carrière tout en aidant des personnes
                qui en ont vraiment besoin."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold">P</span>
                </div>
                <div>
                  <p className="font-semibold">Pierre</p>
                  <p className="text-sm text-muted-foreground">32 ans • Auxiliaire de vie</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-8">
              <Quote className="h-8 w-8 text-primary mb-4" />
              <blockquote className="text-lg mb-6 leading-relaxed">
                "L'équipe du RPDAD nous accompagne au quotidien et nous offre de vraies perspectives
                d'évolution."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold">S</span>
                </div>
                <div>
                  <p className="font-semibold">Sophie</p>
                  <p className="text-sm text-muted-foreground">28 ans • Responsable secteur</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
