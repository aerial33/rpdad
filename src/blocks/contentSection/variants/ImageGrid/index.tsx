import React from 'react'

// Interface pour les props de la variante ImageGrid
interface ImageGridSectionProps {
  galleryTitle?: string
  images?: Array<{
    image: any
    alt: string
    caption?: string
  }>
  displayConfig?: {
    columns?: string
    spacing?: string
  }
  bgClass?: string
}

export const ImageGridSection: React.FC<ImageGridSectionProps> = (props) => {
  console.log('ImageGridSection render with props:', props)

  return (
    <div className="p-8 bg-purple-100 border border-purple-400 rounded">
      <h3 className="text-lg font-bold text-purple-800">🖼️ ImageGrid Section Rendu !</h3>
      <p className="text-purple-700">Le composant ImageGrid fonctionne correctement.</p>
      <div className="mt-4 text-sm">
        <p><strong>Gallery Title:</strong> {props.galleryTitle || 'Non défini'}</p>
        <p><strong>Images:</strong> {props.images?.length || 0} image(s)</p>
        <p><strong>Columns:</strong> {props.displayConfig?.columns || 'Non défini'}</p>
      </div>
      <details className="mt-4">
        <summary className="cursor-pointer text-purple-800 font-medium">Voir toutes les props</summary>
        <pre className="mt-2 text-xs bg-white p-2 rounded overflow-auto max-h-40">
          {JSON.stringify(props, null, 2)}
        </pre>
      </details>
    </div>
  )
}