import { fetchSanity } from '@/lib/sanity/fetch'
import { allMaterialsQuery } from '@/lib/sanity/queries'
import type { MaterialListItem } from '@/lib/sanity/types'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import { ResponsiveImage } from '@/components/ResponsiveImage'

const FALLBACK_MATERIALS: MaterialListItem[] = [
  { title: 'Cotton', slug: 'cotton', texturePreviewUrl: null, shaderConfig: { baseColor: '#f5f5f0', roughness: 0.9, metallic: 0 }, properties: ['Soft', 'Natural', 'Breathable'] },
  { title: 'Satin', slug: 'satin', texturePreviewUrl: null, shaderConfig: { baseColor: '#e8e0d4', roughness: 0.3, metallic: 0.1 }, properties: ['Sheen', 'Smooth', 'Premium'] },
  { title: 'Damask', slug: 'damask', texturePreviewUrl: null, shaderConfig: { baseColor: '#d9c9a3', roughness: 0.5, metallic: 0.2 }, properties: ['Detailed weave', 'High-thread'] },
  { title: 'Taffeta', slug: 'taffeta', texturePreviewUrl: null, shaderConfig: { baseColor: '#eaeaea', roughness: 0.4, metallic: 0.05 }, properties: ['Crisp', 'Structured'] },
  { title: 'RPET', slug: 'rpet', texturePreviewUrl: null, shaderConfig: { baseColor: '#cfe0cf', roughness: 0.7, metallic: 0 }, properties: ['Recycled', 'Eco-friendly'] },
  { title: 'Leather', slug: 'leather', texturePreviewUrl: null, shaderConfig: { baseColor: '#6b4f3a', roughness: 0.6, metallic: 0 }, properties: ['Premium', 'Embossable'] },
  { title: 'PVC', slug: 'pvc', texturePreviewUrl: null, shaderConfig: { baseColor: '#d8d8d8', roughness: 0.2, metallic: 0 }, properties: ['Durable', 'Transparent'] },
  { title: 'Silicone', slug: 'silicone', texturePreviewUrl: null, shaderConfig: { baseColor: '#3a3a3a', roughness: 0.5, metallic: 0 }, properties: ['Soft-touch', 'Flexible'] },
]

export const revalidate = 60

export default async function MaterialsPage() {
  const materials = await fetchSanity<MaterialListItem[]>(allMaterialsQuery).catch(() => [])
  const data = materials.length > 0 ? materials : FALLBACK_MATERIALS

  return (
    <>
      <SectionHeading
        center
        eyebrow="Material Library"
        title="Materials & finishes"
        subtitle="The substrates behind every label, tag, and patch. (Interactive 3D swatches arrive in Phase 2.)"
        className="mt-8"
      />
      <Container className="mt-10 grid grid-cols-2 gap-4 pb-24 md:grid-cols-3 lg:grid-cols-4">
        {data.map((m, i) => (
          <Reveal key={m.slug} delay={i * 0.04}>
            <div className="group overflow-hidden rounded-2xl border border-border-subtle bg-surface">
              <div className="relative aspect-square">
                {m.texturePreviewUrl ? (
                  <ResponsiveImage
                    src={m.texturePreviewUrl}
                    alt={m.title}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                ) : (
                  <div
                    className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${m.shaderConfig?.baseColor ?? '#eef0f2'}, ${m.shaderConfig?.baseColor ?? '#eef0f2'}cc)`,
                    }}
                  />
                )}
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg font-medium">{m.title}</h3>
                {m.properties && m.properties.length > 0 && (
                  <p className="mt-1 text-xs text-text-muted">{m.properties.join(' · ')}</p>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </Container>
    </>
  )
}
