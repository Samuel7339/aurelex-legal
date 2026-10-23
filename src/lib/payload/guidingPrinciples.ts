
import { getPayload } from 'payload'
import config from '@payload-config'

export async function getGuidingPrinciples() {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'guiding-principles',
    where: {
      _status: {
        equals: 'published',
      },
    },
    sort: 'sortOrder',
    limit: 100,
  })

  return result.docs
}
