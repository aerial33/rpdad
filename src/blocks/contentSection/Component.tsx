import React from 'react'

import type { ContentSectionBlock as ContentSectionBlockType } from '@/payload-types'

// Import des composants variants
import { BasicContentSection } from './variants/BasicContent'
import { ImageGridSection } from './variants/ImageGrid'

export const RenderContentSection: React.FC<ContentSectionBlockType & { type?: string }> = (
  props,
) => {
  const { type } = props || {}

  // Debug pour voir les données
  console.log('ContentSection Debug:', {
    type,
    props
  })

  if (!type) {
    console.log('No type provided, rendering fallback')
    return <div className="p-4 bg-yellow-100 border border-yellow-400 rounded">
      <p>ContentSection: Type non défini</p>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  }

  // Extraire les données du groupe correspondant au type
  const configKey = `${type}Config`
  const variantConfig = (props as any)[configKey] || {}

  console.log('Variant config extracted:', {
    configKey,
    variantConfig
  })

  // Combiner les props de base avec la config du variant
  const componentProps = {
    ...props,
    ...variantConfig,
  }

  // Sélection directe du composant selon le type
  switch (type) {
    case 'basicContent':
      return <BasicContentSection {...componentProps} />
    case 'imageGrid':
      return <ImageGridSection {...componentProps} />
    default:
      console.log('No component found for type:', type)
      return <div className="p-4 bg-red-100 border border-red-400 rounded">
        <p>ContentSection: Composant non trouvé pour le type "{type}"</p>
        <p>Types disponibles: basicContent, imageGrid</p>
      </div>
  }
}

export const ContentSectionBlock = RenderContentSection
