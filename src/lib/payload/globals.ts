import { getPayloadClient } from "./getPayloadClient"

export async function getHeaderData() {
    const payload = await getPayloadClient()

    return payload.findGlobal({
        slug: 'header',
        depth: 0
    })
}

export async function getFooterData() {
    const payload = await getPayloadClient()

    return payload.findGlobal({
        slug: 'footer',
        depth: 0,
    })
}

export async function getSiteSettings() {
    const payload = await getPayloadClient()

    return payload.findGlobal({
        slug: 'site-settings',
        depth: 1
    })
}