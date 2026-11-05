import type { Post } from '@/app/lib/types';

export function selectRelatedPosts(post: Post, posts: Post[], limit = 2): Post[] {
  const currentSlug = post.slug.join('/');
  const candidates = posts.filter((candidate) => candidate.slug.join('/') !== currentSlug);
  const bySlug = new Map(candidates.map((candidate) => [candidate.slug.join('/'), candidate]));
  const selected = (post.relatedPosts ?? [])
    .map((slug) => bySlug.get(slug))
    .filter((candidate): candidate is Post => candidate !== undefined);
  const tags = new Set((Array.isArray(post.tags) ? post.tags : []).map((tag: string) => tag.toLowerCase()));
  const ranked = candidates
    .filter((candidate) => !selected.includes(candidate))
    .map((candidate, index) => ({
      candidate,
      index,
      score: (post.category && candidate.category === post.category ? 4 : 0) +
        (Array.isArray(candidate.tags) ? candidate.tags.filter((tag: string) => tags.has(tag.toLowerCase())).length * 2 : 0),
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map(({ candidate }) => candidate);

  return [...new Set(selected), ...ranked].slice(0, limit);
}
