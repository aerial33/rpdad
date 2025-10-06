import { BentoCard, BentoGrid } from '@/components/bento/bento-grid'
import { BentoCardBlock } from '@/payload-types'

import { DEFAULT_BENTO_CARDS } from './constants'

// Design fixe : classes CSS pour chaque position (index 0-3)
const DESIGN_CLASSES = [
  'lg:row-start-1 lg:row-end-3 lg:col-start-1 lg:col-end-3 bg-[#E9ACD4] lg:rounded-tl-[100px]  xl:rounded-tl-[300px] text-white xl:row-start-1 xl:row-end-3 xl:col-start-1 xl:col-end-3 flex flex-col items-center justify-center gap-4',
  'xl:col-start-3 xl:col-end-5 xl:row-start-1 xl:row-end-2  bg-flamingo-lighter lg:col-start-1 lg:col-end-5 lg:row-start-3 lg:row-end-4',
  'xl:col-start-3 xl:col-end-4 xl:row-start-2 xl:row-end-3 bg-yellow-lighter lg:col-start-3 lg:col-end-5 lg:row-start-1 lg:row-end-2',
  'xl:col-start-4 xl:col-end-5 xl:row-start-2 xl:row-end-3 bg-chateau-lighter lg:col-start-3 lg:col-end-5 lg:row-start-2 lg:row-end-3',
]

export const BentoGridBlock: React.FC<BentoCardBlock> = (props) => {
  // Merger les données CMS avec les designs fixes
  const features = (props.cards && props.cards.length > 0 ? props.cards : DEFAULT_BENTO_CARDS).map(
    (card, index) => {
      // Récupération de l'image (Media object ou string ID)
      const imageResource = 'image' in card && card.image ? card.image : undefined

      return {
        title: card.title || '',
        description: card.description || '',
        link: card.link, // Passer la structure link directe
        ...(card.tag ? { tag: card.tag } : {}),
        image: imageResource,
        // Design fixe selon la position (index)
        className: DESIGN_CLASSES[index] || '',
      }
    },
  )

  return (
    <>
      <section className="bg-flamingo-lightest rounded-[40px] px-4 py-24 xl:px-0">
        {props.title && (
          <div className="center-element mb-12">
            <h2 className="text-center text-3xl font-bold lg:text-4xl">{props.title}</h2>
          </div>
        )}
        <BentoGrid
          className={
            'mx-auto max-h-[722px] min-h-[345px] max-w-7xl px-0 lg:grid-cols-4 lg:grid-rows-3 xl:grid-rows-2'
          }
        >
          {features?.map((feature, index) => (
            <BentoCard key={`${feature.title}-${index}`} {...feature} />
          ))}
        </BentoGrid>
      </section>
    </>
  )
}
