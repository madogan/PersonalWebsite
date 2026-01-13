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

  // useMDXComponents is not a React hook, it's a regular function despite the naming
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const components = useMDXComponents({})

  return <MDXComponent components={components} />
}

