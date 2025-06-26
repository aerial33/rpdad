# ContentSection Block

Bloc PayloadCMS pour créer des sections de contenu avec images, informations en carte, et motifs décoratifs.

## Structure des fichiers

```
contenSection/
├── Component.tsx       # Wrapper PayloadCMS
├── ContentSection.tsx  # Composant UI réutilisable
├── config.ts          # Configuration PayloadCMS
├── types.ts           # Définitions TypeScript
├── utils.ts           # Fonctions utilitaires
├── index.ts           # Exports centralisés
└── README.md          # Documentation
```

## Usage

### Dans PayloadCMS

Le bloc est automatiquement disponible dans l'éditeur de blocs grâce à la configuration dans `config.ts`.

### Utilisation directe du composant

```tsx
import { ContentSection } from './ContentSection'
;<ContentSection
  images={[
    { src: '/image1.jpg', alt: 'Description 1' },
    { src: '/image2.jpg', alt: 'Description 2' },
  ]}
  cardInfo={{ value: '+5000', label: 'Personnes accompagnées' }}
  title="Notre Mission"
  content={richTextContent}
  buttonText="En savoir plus"
  buttonHref="/about"
/>
```

## Configuration

### Images

- Minimum : 1 image
- Maximum : 2 images
- Formats supportés : via le système Media de PayloadCMS

### Motifs décoratifs (DotPatterns)

- Position : Haut et/ou bas
- Personnalisables : taille, couleur, espacement
- Optionnels

### Bouton d'action

- Texte personnalisable
- Lien interne ou externe
- Icônes disponibles : arrow-right, arrow-left, external-link, download

## Types principaux

```typescript
interface ContentSectionProps {
  images: ImageInfo[]
  cardInfo: CardInfo
  title: string
  content: DefaultTypedEditorState
  buttonText?: string
  buttonHref?: string
  dotPatternTop?: ReactNode
  dotPatternBottom?: ReactNode
}
```
