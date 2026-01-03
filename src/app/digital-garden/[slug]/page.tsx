// app/page.tsx
import { getAllPages, loadLogseqPage } from "@/lib/logseq/loader";
import { parseLogseq } from "@/lib/logseq/parser";
import { deslugify } from "@/lib/logseq/utils";

import { astToMarkdown } from "@/lib/logseq/utils";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};


export function getAllSlugs(): string[] {
  return getAllPages().map(p => p.slug);
}

export function generateStaticParams() {
  return getAllSlugs().map(slug => ({
    slug
  }));
}

export default async function Page({ params }: PageProps) {

  const { slug } = await params;
  const raw = loadLogseqPage(deslugify(slug));

  if (!raw) {
    notFound(); 
  }

  const ast = parseLogseq(raw);
  const md = astToMarkdown(ast);


  return (
    <>
      <h1>{deslugify(slug)}</h1>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {md}
      </ReactMarkdown>
    </>
  );
}
