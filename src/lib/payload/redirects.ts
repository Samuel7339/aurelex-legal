import 'server-only'

import { getPayloadClient } from '@/lib/payload/getPayloadClient'
import { permanentRedirect, redirect } from 'next/navigation'

export async function handleRedirect(path: string) {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'redirects',
    where: {
      from: { equals: path },
    },
    limit: 1,
    depth: 1,
  })

  const rule = result.docs[0]

  if (!rule?.to) return false

  let destination: string | undefined

  if (rule.to.type === 'custom') {
    destination = rule.to.url || undefined
  }

  if (rule.to.type === 'reference') {
    const relation = rule.to.reference

    if (relation && typeof relation === 'object') {
      const relationData = relation as {
        relationTo?: string
        value?: {
          slug?: string
        } | string | number
      }

      const collection = relationData.relationTo
      const document = relationData.value

      if (document && typeof document === 'object' && document.slug) {
        switch (collection) {
          case 'attorneys':
            destination = `/our-attorneys/${document.slug}`
            break

          case 'practice-areas':
            destination = `/practice-areas/${document.slug}`
            break

          case 'posts':
            destination = `/articles/${document.slug}`
            break

          case 'pages':
            destination =
              document.slug === 'home' ? '/' : `/${document.slug}`
            break
        }
      }
    }
  }

  if (!destination) return false

  if (rule.type === '301') {
    permanentRedirect(destination)
  }

  redirect(destination)
}