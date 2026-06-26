import { NextResponse } from 'next/server'

/**
 * Render webhook (Sanity → render → CDN).
 *
 * Production integration: trigger Remotion Lambda (or @remotion/renderer on a
 * server with headless Chrome) with `compositionId` + platform resolution, then
 * upload the MP4 to the Sanity asset library / CDN and PATCH the
 * `marketingVideo` document's `cdnUrl` + `renderStatus`.
 *
 * Configured in Sanity as a webhook POST to /api/render-video?secret=<REMOTION_SECRET>.
 * Actual rendering is not performed here — see the /marketing route for live
 * in-browser playback, and the Remotion Root (remotion/Root.tsx) for the
 * composition registry used by the render pipeline.
 */
export async function POST(req: Request) {
  const secret = new URL(req.url).searchParams.get('secret')
  if (process.env.REMOTION_SECRET && secret !== process.env.REMOTION_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { compositionId, platform } = (await req.json().catch(() => ({}))) as {
    compositionId?: string
    platform?: string
  }
  if (!compositionId || !platform) {
    return NextResponse.json(
      { error: 'compositionId and platform are required' },
      { status: 400 }
    )
  }

  return NextResponse.json({
    ok: false,
    compositionId,
    platform,
    message:
      'Server-side MP4 rendering requires Remotion Lambda (or @remotion/renderer + headless Chrome). Preview live at /marketing.',
  })
}
