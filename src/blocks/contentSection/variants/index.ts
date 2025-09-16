import type { Field } from 'payload'

// Import des configurations de champs des variants
import { basicContentFields } from './BasicContent/config'
import { imageGridFields } from './ImageGrid/config'

// Import des composants des variants
import { BasicContentSection } from './BasicContent'
import { ImageGridSection } from './ImageGrid'

export { BasicContentSection, ImageGridSection }

export interface VariantConfig {
  label: string
  value: string
  fields: Field[]
  component: React.ComponentType<any>
}

export const variantRegistry: Record<string, VariantConfig> = {
  basicContent: {
    label: 'Contenu Basique',
    value: 'basicContent',
    fields: basicContentFields,
    component: BasicContentSection,
  },
  imageGrid: {
    label: 'Galerie d\'Images',
    value: 'imageGrid',
    fields: imageGridFields,
    component: ImageGridSection,
  },
}

// Fonction utilitaire pour obtenir les options du select
export const getVariantOptions = () => {
  return Object.entries(variantRegistry).map(([, config]) => ({
    label: config.label,
    value: config.value,
  }))
}

// Fonction utilitaire pour obtenir les champs d'un variant
export const getFieldsForVariant = (variantType: string): Field[] => {
  const variant = variantRegistry[variantType]
  return variant ? variant.fields : []
}

// Fonction utilitaire pour obtenir le composant d'un variant
export const getComponentForVariant = (variantType: string) => {
  const variant = variantRegistry[variantType]
  return variant ? variant.component : null
}