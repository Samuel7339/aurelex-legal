import { getPayloadClient } from "./getPayloadClient"

export async function getHeaderData() {
    const payload = await getPayloadClient()

    return payload.findGlobal({
        slug: 'header',
        depth: 1
    })
}

export async function getFooterData() {
    const payload = await getPayloadClient()

    return payload.findGlobal({
        slug: 'footer',
        depth: 1,
    })
}

export async function getSiteSettings() {
    const payload = await getPayloadClient()

    return payload.findGlobal({
        slug: 'site-settings',
        depth: 1
    })
}