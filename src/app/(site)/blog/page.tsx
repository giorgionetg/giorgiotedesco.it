import Link from 'next/link';
import { getAllPosts } from '@/app/lib/markdown/posts';

export default async function BlogIndex() {
    const posts = await getAllPosts();
    console.log(posts);
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Blog & Appunti</h1>
            <div className="grid gap-6">
                {posts.map((post) => (
                    <article key={post.slug.join('/')} className="card bg-base-100 shadow-xl border border-base-200">
                        <div className="card-body">
                            <h2 className="card-title text-2xl">
                                <Link href={`/blog/${post.slug.join('/')}`} className="hover:text-primary transition-colors">
                                    {post.title}
                                </Link>
                            </h2>
                            {post.date && (
                                <div className="text-sm text-base-content/60">
                                    {new Date(post.date).toLocaleDateString()}
                                </div>
                            )}
                            {post.excerpt && (
                                <p className="text-base-content/80 mt-2">{post.excerpt}</p>
                            )}
                            <div className="card-actions justify-end mt-4">
                                <Link href={`/blog/${post.slug.join('/')}`} className="btn btn-primary btn-sm">
                                    Leggi
                                </Link>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
