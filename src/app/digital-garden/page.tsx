// app/page.tsx
import { loadLogseqPage } from "@/lib/logseq/loader";
import { parseLogseq } from "@/lib/logseq/parser";
import { astToMarkdown } from "@/lib/logseq/utils";

import { notFound } from "next/navigation";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default async function Page() {

  const title = "Digital Giorgio's Garden";
  const raw = loadLogseqPage(title);

  if (!raw) notFound();

  const ast = parseLogseq(raw);
  const md = astToMarkdown(ast);

  return (
    <>
      <h1>{title}</h1>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {md}
      </ReactMarkdown>
    </>
  );
}
