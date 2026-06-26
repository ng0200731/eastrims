export type CapabilityTier = 1 | 2 | 3

/**
 * Detect the device's 3D capability tier.
 * 1 = desktop / capable GPU (full 3D)
 * 2 = mobile / weak GPU (simplified 3D)
 * 3 = no WebGL (fallback to 2D/video)
 *
 * Runs client-side only; returns 3 during SSR.
 */
export function detectCapabilityTier(): CapabilityTier {
  if (typeof window === 'undefined') return 3
  try {
    const canvas = document.createElement('canvas')
    const gl = (canvas.getContext('webgl2') ||
      canvas.getContext('webgl')) as WebGL2RenderingContext | null
    if (!gl) return 3

    const debug = gl.getExtension('WEBGL_debug_renderer_info')
    const renderer = debug
      ? String(gl.getParameter(debug.UNMASKED_RENDERER_WEBGL))
      : ''
    const isLowEnd = /mobile|intel hd|mali|adreno 5|apple g/i.test(renderer)
    const isSmall = window.innerWidth < 768
    if (isSmall || isLowEnd) return 2
    return 1
  } catch {
    return 3
  }
}
