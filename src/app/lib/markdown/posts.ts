import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

import { Post } from '@/app/lib/types';



export async function getAllPosts(): Promise<Post[]> {
    // Recursively find all markdown files in contentDirectory
    const getFiles = async (dir: string): Promise<string[]> => {
        if (!existsSync(dir)) return [];

        const dirents = await fs.readdir(dir, { withFileTypes: true });
        const files = await Promise.all(dirents.map(async (dirent) => {
            const res = path.resolve(dir, dirent.name);
            if (dirent.isDirectory()) {
                if (dirent.name === 'draft') return [];
                return getFiles(res);
            }
            return res;
        }));

        // Flatten the array of files and nested arrays
        return Array.prototype.concat(...files).filter(f => f.endsWith('.md'));
    };

    const files = await getFiles(contentDirectory);

    const posts: Post[] = await Promise.all(files.map(async (filePath) => {
        const fileContents = await fs.readFile(filePath, 'utf8');
        const { data, content } = matter(fileContents);

        // Create slug from relative path
        const relativePath = path.relative(contentDirectory, filePath);
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

export async function getPostBySlug(slug: string[]): Promise<Post | null> {
    try {
        const relativePath = slug.join(path.sep) + '.md';
        const filePath = path.join(contentDirectory, relativePath);

        if (!existsSync(filePath)) {
            return null;
        }

        const fileContents = await fs.readFile(filePath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            ...data,
            slug,
            title: data.title || slug[slug.length - 1],
            content,
        };
    } catch (error) {
        console.log(error);
        return null;
    }
}
