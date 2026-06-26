import { PortableText as PortableTextReact } from '@portabletext/react'

const components = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mt-8 mb-3 font-display text-2xl font-semibold text-text-primary">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mt-6 mb-2 font-display text-xl font-medium text-text-primary">{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 leading-relaxed text-text-muted">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="my-6 border-l-2 border-accent-gold pl-4 italic text-text-primary">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="mb-4 ml-5 list-disc space-y-1 text-text-muted">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="mb-4 ml-5 list-decimal space-y-1 text-text-muted">{children}</ol>
    ),
  },
}

export function PortableText({ value }: { value: unknown[] | null | undefined }) {
  if (!value || value.length === 0) return null
  return (
    <div className="portable-text">
      {/* value is Sanity portable-text blocks; cast for the renderer */}
      <PortableTextReact value={value as never} components={components} />
    </div>
  )
}
