import { NextRequest, NextResponse } from 'next/server'

import { getServerSideURL } from '@/utilities/getURL'

// ── Cloudflare Turnstile (décommenter quand TURNSTILE_SECRET_KEY est défini) ──
// async function verifyTurnstile(token: string): Promise<boolean> {
//   const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       secret: process.env.TURNSTILE_SECRET_KEY,
//       response: token,
//     }),
//   })
//   const data = await res.json()
//   return data.success === true
// }

export async function POST(req: NextRequest) {
  const body = await req.json()

  const { _honeypot, submissionData, ...rest } = body

  // Honeypot : si le champ est rempli, c'est un bot → on feint le succès
  if (_honeypot) {
    return NextResponse.json({ message: 'ok' }, { status: 200 })
  }

  // ── Validation Turnstile (décommenter quand prêt) ──────────────────────────
  // const { _turnstileToken, ...restClean } = rest
  // if (!_turnstileToken || !(await verifyTurnstile(_turnstileToken))) {
  //   return NextResponse.json({ message: 'Vérification échouée.' }, { status: 400 })
  // }
  // ──────────────────────────────────────────────────────────────────────────

  // Filtrer _honeypot des champs de soumission (au cas où react-hook-form l'inclut)
  const cleanedSubmissionData =
    (submissionData as Array<{ field: string; value: string }> | undefined)?.filter(
      (item) => item.field !== '_honeypot',
    ) ?? []

  const payloadRes = await fetch(`${getServerSideURL()}/api/form-submissions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Préserver l'IP réelle du client pour Payload
      'x-forwarded-for': req.headers.get('x-forwarded-for') ?? '',
    },
    body: JSON.stringify({ ...rest, submissionData: cleanedSubmissionData }),
  })

  const data = await payloadRes.json()

  return NextResponse.json(data, { status: payloadRes.status })
}
