// import PageTemplate, { generateMetadata } from './[slug]/page'
// export default PageTemplate
// export { generateMetadata }
import Countdown from '@/components/Countdown'
import { Card, CardContent } from '@/components/ui/card'

export default function Component() {
  return (
    <div className="flex h-full flex-1 items-center justify-center py-32">
      <Card className="m-4 mx-auto max-w-md flex-1 overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl">
        <CardContent className="p-8">
          <div className="text-primary-dark text-center text-2xl font-semibold tracking-wide uppercase">
            Nouveau Site Bientôt Disponible
          </div>
          <Countdown
            className="mt-4"
            targetDate={
              new Date(
                Date.now() + 1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 12 + 1000 * 34 + 1000 * 27,
              )
            }
            labels={{ days: 'Jours', hours: 'Heures', minutes: 'Minutes', seconds: 'Secondes' }}
          />
        </CardContent>
      </Card>
    </div>
  )
}
