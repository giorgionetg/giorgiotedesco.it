import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import legacyPostRoutes from './legacy-post-routes.json';

const contentDirectory = path.join(process.cwd(), 'content');
const italianContentDirectory = path.join(contentDirectory, 'it');

export function getLegacyPostRoutes(locale: 'en' | 'it' = 'en') {
    return legacyPostRoutes[locale];
}

import type { Post } from '@/app/lib/types';



export async function getAllPosts(locale: 'en' | 'it' = 'en'): Promise<Post[]> {
    const rootDirectory = locale === 'it' ? italianContentDirectory : contentDirectory;
    // Recursively find Markdown files in the selected locale directory.
    const getFiles = async (dir: string): Promise<string[]> => {
        if (!existsSync(dir)) return [];

        const dirents = await fs.readdir(dir, { withFileTypes: true });
        const files = await Promise.all(dirents.map(async (dirent) => {
            const res = path.resolve(dir, dirent.name);
            if (dirent.isDirectory()) {
                if (dirent.name === 'draft' || (locale === 'en' && dir === contentDirectory && dirent.name === 'it')) return [];
                return getFiles(res);
            }
            return res;
        }));

        // Flatten the array of files and nested arrays
        return Array.prototype.concat(...files).filter(f => f.endsWith('.md'));
    };

    const files = await getFiles(rootDirectory);

    const posts: Post[] = await Promise.all(files.map(async (filePath) => {
        const fileContents = await fs.readFile(filePath, 'utf8');
        const { data, content } = matter(fileContents);

        // Create slug from relative path
        const relativePath = path.relative(rootDirectory, filePath);
        const slug = relativePath.replace(/\.md$/, '').split(path.sep);

        return {
            ...data,
            slug,
            title: data.title || slug[slug.length - 1], // Fallback to filename if no title
            date: data.date,
            content,
        };
    }));

    // Sort posts by date if available
    return posts
        .filter((post) => !post.draft)
        .sort((a, b) => {
            const dateA = a.datePublished ? new Date(a.datePublished).getTime() : (a.date ? new Date(a.date).getTime() : 0);
            const dateB = b.datePublished ? new Date(b.datePublished).getTime() : (b.date ? new Date(b.date).getTime() : 0);
            return dateB - dateA;
        });
}

export async function getPostBySlug(slug: string[], locale: 'en' | 'it' = 'en') {
    try {
        const route = legacyPostRoutes[locale].find((candidate) => candidate.from.join('/') === slug.join('/'));
        const resolvedSlug = route ? [...route.to] : [...slug];
        const relativePath = resolvedSlug.join(path.sep) + '.md';
        const rootDirectory = locale === 'it' ? italianContentDirectory : contentDirectory;
        const filePath = path.join(rootDirectory, relativePath);

        if (!existsSync(filePath)) {
            return null;
        }

        const fileContents = await fs.readFile(filePath, 'utf8');
        const { data, content } = matter(fileContents);

        const post: Post = {
            ...data,
            slug: resolvedSlug,
            title: data.title || resolvedSlug[resolvedSlug.length - 1],
            content,
        };
        return { requestedSlug: [...slug], resolvedSlug, post };
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getPostLanguageAlternates(post: Post, locale: 'en' | 'it') {
    if (!post.translationKey) return undefined;
    const otherLocale = locale === 'en' ? 'it' : 'en';
    const translatedPost = (await getAllPosts(otherLocale)).find(
        (candidate) => candidate.translationKey === post.translationKey,
    );
    if (!translatedPost) return undefined;

    const currentPath = locale === 'en'
        ? `/blog/${post.slug.join('/')}/`
        : `/it/blog/${post.slug.join('/')}/`;
    const translatedPath = otherLocale === 'en'
        ? `/blog/${translatedPost.slug.join('/')}/`
        : `/it/blog/${translatedPost.slug.join('/')}/`;

    return locale === 'en'
        ? { en: currentPath, it: translatedPath }
        : { en: translatedPath, it: currentPath };
}
