import type { MetadataRoute } from 'next'

export const dynamic = 'force-static' // utile per static export

const SITE = 'https://www.giorgiotedesco.it'

function url(path: string) {
    if (path === '/') return `${SITE}/`
    return `${SITE}${path.endsWith('/') ? path : `${path}/`}`
}

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date()

    return [
        { url: url('/'), lastModified },

        { url: url('/about-me'), lastModified },
        { url: url('/blog'), lastModified },
        //{ url: url('/credits'), lastModified },
        //{ url: url('/privacy'), lastModified },
        { url: url('/blog/on-web-development/how-this-website-is-made'), lastModified },
        { url: url('/blog/on-web-development/on-my-job-in-wonderland'), lastModified },
        { url: url('/blog/on-cryptocurrencies/how-bitcoin-works'), lastModified },

        // niente 404 in sitemap
    ]
}
