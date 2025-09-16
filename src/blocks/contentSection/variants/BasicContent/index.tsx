import React from 'react'

// Interface pour les props de la variante BasicContent
interface BasicContentSectionProps {
  images?: Array<{
    image: any
    alt: string
  }>
  cardInfo?: {
    value: string
    label: string
  }
  title?: string
  content?: any
  button?: {
    text: string
    href: string
    icon?: string
  }
  dotPatterns?: {
    enablePatterns?: boolean
    top?: {
      enabled?: boolean
      className?: string
      rows?: number
      cols?: number
      dotSize?: string
      dotColor?: string
      gap?: string
    }
    bottom?: {
      enabled?: boolean
      className?: string
      variant?: string
      rows?: number
      cols?: number
      dotSize?: string
      dotColor?: string
    }
  }
  bgClass?: string
}

// Fonctions supprimées temporairement pour éviter les erreurs d'import

export const BasicContentSection: React.FC<BasicContentSectionProps> = (props) => {
  console.log('BasicContentSection render with props:', props)

  return (
    <div className="p-8 bg-green-100 border border-green-400 rounded">
      <h3 className="text-lg font-bold text-green-800">✅ BasicContent Section Rendu !</h3>
      <p className="text-green-700">Le composant BasicContent fonctionne correctement.</p>
      <div className="mt-4 text-sm">
        <p><strong>Title:</strong> {props.title || 'Non défini'}</p>
        <p><strong>Images:</strong> {props.images?.length || 0} image(s)</p>
        <p><strong>Card Info:</strong> {props.cardInfo ? `${props.cardInfo.value} - ${props.cardInfo.label}` : 'Non défini'}</p>
      </div>
      <details className="mt-4">
        <summary className="cursor-pointer text-green-800 font-medium">Voir toutes les props</summary>
        <pre className="mt-2 text-xs bg-white p-2 rounded overflow-auto max-h-40">
          {JSON.stringify(props, null, 2)}
        </pre>
      </details>
    </div>
  )
}
