import { evaluate } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import { useMDXComponents } from '@/components/blog/mdx-components'

type MDXContentProps = {
  content: string
}

export async function MDXContent({ content }: MDXContentProps) {
  const { default: MDXComponent } = await evaluate(content, {
    ...runtime,
    development: false,
  })

  const components = useMDXComponents({})

  return <MDXComponent components={components} />
}

