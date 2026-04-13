import { MDXProvider } from '@mdx-js/react'
import type { ComponentType } from 'react'
import { mdxComponents } from './mdxComponents'

type MdxRendererProps = {
  Component: ComponentType
}

export function MdxRenderer({ Component }: MdxRendererProps) {
  return (
    <MDXProvider components={mdxComponents}>
      <div className="mdx-content">
        <Component />
      </div>
    </MDXProvider>
  )
}
