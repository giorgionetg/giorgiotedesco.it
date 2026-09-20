import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/app/lib/markdown/posts'

export const dynamic = 'force-static' // utile per static export

const SITE = 'https://giorgiotedesco.it'

function url(path: string) {
    if (path === '/') return `${SITE}/`
    return `${SITE}${path.endsWith('/') ? path : `${path}/`}`
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const lastModified = new Date()
    const posts = await getAllPosts()

    return [
        { url: url('/'), lastModified },

        { url: url('/about-me/'), lastModified },
        { url: url('/blog/'), lastModified },
        ...posts.map((post) => ({
            url: url(`/blog/${post.slug.join('/')}`),
            lastModified: post.dateModified || post.datePublished || post.date || lastModified,
        })),
    ]
}
