import type { Media, VideoEmbed } from '@/payload-types'

/**
 * Extrait le média sélectionné (image ou vidéo embed) selon mediaType
 * @param mediaItem - Objet contenant mediaType, image, et videoEmbed
 * @returns Le média sélectionné (Media | VideoEmbed) ou null
 */
export function getSelectedMedia(mediaItem: {
  mediaType?: 'media' | 'video-embed' | null
  image?: Media | number | string | null
  videoEmbed?: VideoEmbed | number | string | null
}): Media | VideoEmbed | number | string | null {
  if (!mediaItem) return null

  // Si mediaType est 'video-embed', retourner videoEmbed
  if (mediaItem.mediaType === 'video-embed') {
    return mediaItem.videoEmbed || null
  }

  // Par défaut, retourner image
  return mediaItem.image || null
}
