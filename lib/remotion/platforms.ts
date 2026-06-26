// One composition, many outputs. Each platform maps to a render config used by
// both the live preview Player and the server render pipeline.

export interface PlatformConfig {
  id: string
  label: string
  width: number
  height: number
  durationInFrames: number
  fps: number
}

export const PLATFORMS: PlatformConfig[] = [
  { id: 'web-hero', label: 'Homepage hero (16:9)', width: 1280, height: 720, durationInFrames: 300, fps: 30 },
  { id: 'instagram-reel', label: 'Instagram Reel (9:16)', width: 1080, height: 1920, durationInFrames: 900, fps: 30 },
  { id: 'tiktok', label: 'TikTok (9:16)', width: 1080, height: 1920, durationInFrames: 900, fps: 30 },
  { id: 'youtube-short', label: 'YouTube Short (9:16)', width: 1080, height: 1920, durationInFrames: 1800, fps: 30 },
  { id: 'linkedin', label: 'LinkedIn (1:1)', width: 1080, height: 1080, durationInFrames: 900, fps: 30 },
  { id: 'tradeshow', label: 'Trade show loop (16:9)', width: 1920, height: 1080, durationInFrames: 1800, fps: 30 },
]

export function getPlatform(id: string): PlatformConfig {
  return PLATFORMS.find((p) => p.id === id) ?? PLATFORMS[0]
}
