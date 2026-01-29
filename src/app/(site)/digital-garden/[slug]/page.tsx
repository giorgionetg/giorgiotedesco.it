// app/page.tsx
import { Metadata } from "next";
import { getAllPages, loadLogseqPage } from "@/app/lib/logseq/loader";
import { parseLogseq } from "@/app/lib/logseq/parser";
import { deslugify } from "@/app/lib/logseq/utils";

import { astToMarkdown } from "@/app/lib/logseq/utils";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { notFound } from "next/navigation";
import DigitalGardenView from "@/app/(site)/digital-garden/DigitalGardenView";



type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};


export function getAllSlugs(): string[] {
  return getAllPages().map(p => p.slug);
}

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({
    slug
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = deslugify(slug);
  const raw = loadLogseqPage(title);

  const description = raw
    ? raw.slice(0, 160).replace(/\n/g, ' ') + '...'
    : `Note e appunti su ${title}`;

  return {
    title: `${title} | Giorgio Tedesco`,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: 'article',
    },
  };
}

export default async function Page({ params }: PageProps) {

  const { slug } = await params;
  const title = deslugify(slug);
  const raw = loadLogseqPage(title);

  if (!raw) {
    notFound();
  }

  const ast = parseLogseq(raw);
  console.log(ast);
  const md = astToMarkdown(ast);

  return (
    <>
      <DigitalGardenView initialMarkdown={md} />;
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "headline": title.replace(/-/g, ' '),
            "description": raw ? raw.slice(0, 160).replace(/\n/g, ' ') + '...' : `Note su ${title}`,
            "author": {
              "@type": "Person",
              "name": "Giorgio Tedesco",
              "url": "https://giorgiotedesco.it"
            }
          })
        }}
      />
    </>
  );
}
