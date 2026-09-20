import type { Metadata } from 'next';

export const siteUrl = 'https://giorgiotedesco.it';

export const siteIdentity = {
  name: 'Giorgio Tedesco',
  title: 'Giorgio Tedesco | Senior Solution Architect & Tech Lead',
  description:
    'Senior Solution Architect with 16+ years of experience in designing scalable Cloud Native systems, Enterprise Modernization, and Secure Web Architectures. Specializing in bridging legacy infrastructure with modern Next.js, Kubernetes, and Web3 technologies.',
  personId: `${siteUrl}/#person`,
  websiteId: `${siteUrl}/#website`,
  personImage: `${siteUrl}/images/giorgiotedesco-ai-clone.png`,
  sameAs: [
    'https://www.linkedin.com/in/giorgiotedesco',
    'https://github.com/giorgionetg',
    'https://x.com/giorgionetg',
    'https://registry.jsonresume.org/giorgionetg',
  ],
} as const;

export function absoluteUrl(path = '/') {
  if (path.startsWith('http')) return path;
  if (path === '/') return `${siteUrl}/`;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const isAsset = /\.[a-z0-9]+$/i.test(normalizedPath);
  return `${siteUrl}${normalizedPath}${isAsset || normalizedPath.endsWith('/') ? '' : '/'}`;
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  locale?: string;
  image?: string;
  publishedTime?: string;
  robots?: Metadata['robots'];
};

export function pageMetadata({
  title,
  description,
  path,
  type = 'website',
  locale = 'en_US',
  image,
  publishedTime,
  robots,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = image ? absoluteUrl(image) : undefined;

  return {
    title,
    description,
    ...(robots ? { robots } : {}),
    alternates: { canonical: url },
    openGraph: {
      type,
      title,
      description,
      url,
      siteName: siteIdentity.name,
      locale,
      ...(publishedTime ? { publishedTime } : {}),
      ...(imageUrl ? { images: [{ url: imageUrl }] } : {}),
    },
    twitter: {
      card: imageUrl ? 'summary_large_image' : 'summary',
      title,
      description,
      creator: '@giorgionetg',
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  };
}

export function postImage(post: { coverImage?: string; image?: string }) {
  return post.coverImage || post.image;
}
