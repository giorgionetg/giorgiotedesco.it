import { loadLogseqPage } from "@/app/lib/logseq/loader";
import { parseLogseq } from "@/app/lib/logseq/parser";
import { astToMarkdown } from "@/app/lib/logseq/utils";

import { notFound } from "next/navigation";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default async function Page() {

    const title = "About Me";
    const raw = loadLogseqPage(title);

    if (!raw) notFound();

    const ast = parseLogseq(raw);
    const md = astToMarkdown(ast);
    console.log(md);

    return (
        <>
            <h1 className="mt-40">{title}</h1>
            <div className="prose prose-lg dark:prose-invert">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {md}
                </ReactMarkdown>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {md}
                </ReactMarkdown>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {md}
                </ReactMarkdown>
            </div>
        </>
    );
}
