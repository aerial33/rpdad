import { getCachedGlobal } from '@/utilities/getGlobals'
import { HeaderClient } from './Component.client'

import type { HautDePage } from '@/payload-types'

export async function Header() {
  const headerData: HautDePage = await getCachedGlobal('haut-de-page', 1)()

  return <HeaderClient data={headerData} />
}
