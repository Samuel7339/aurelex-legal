import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import configPromise from '@payload-config'

const allowedPaths = [
  '/',
  '/about',
  '/practice-areas',
  '/our-attorneys',
  '/articles',
  '/contact',
]

export async function GET(req: Request): Promise<Response> {
  const payload = await getPayload({ config: configPromise })
  const { searchParams } = new URL(req.url)
  

  const path = searchParams.get('path')
  const collection = searchParams.get('collection')
  const slug = searchParams.get('slug')

  if (
    collection !== 'pages' ||
    !slug ||
    !path ||
    !allowedPaths.includes(path)
  ) {
    return new Response('Invalid preview request', { status: 400 })
  }

  
  

  const authResult = await payload.auth({
    headers: new Headers(req.headers),
  })

  
  const user = authResult.user

  if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
    const draft = await draftMode()
    draft.disable()

    return new Response('You are not allowed to preview this page', {
      status: 403,
    })
  }

  const draft = await draftMode()
  draft.enable()

  redirect(path)
}