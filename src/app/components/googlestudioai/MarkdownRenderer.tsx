import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

const supersplatEmbedPattern = /<iframe\s+src="https:\/\/superspl\.at\/s\?id=([a-zA-Z0-9_-]+)"\s+width="100%"\s+height="(\d{2,4})"\s+allow="fullscreen; xr-spatial-tracking"\s*\/?\s*>/g;

function renderSupersplatEmbeds(content: string) {
  return content.replace(supersplatEmbedPattern, (_match, id: string, height: string) => `\n\n![supersplat:${id}:${height}](https://superspl.at/s?id=${id})\n\n`);
}

export function MarkdownRenderer({ content }: { content: string }) {
  return <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeHighlight]}
    components={{
      // Render only validated SuperSplat placeholders; arbitrary raw HTML remains disabled.
      img({ alt, src }) {
        const embed = typeof alt === 'string' ? alt.match(/^supersplat:([a-zA-Z0-9_-]+):(\d{2,4})$/) : null;
        if (embed && src === `https://superspl.at/s?id=${embed[1]}`) {
          const [, id, height] = embed;
          const parsedHeight = Number(height);
          const safeHeight = Number.isFinite(parsedHeight) ? Math.min(Math.max(parsedHeight, 200), 1200) : 500;
          return (
            <iframe
              src={`https://superspl.at/s?id=${encodeURIComponent(id)}`}
              title="Modello 3D interattivo su SuperSplat"
              width="100%"
              height={safeHeight}
              allow="fullscreen; xr-spatial-tracking"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="my-8 block w-full rounded-xl border border-slate-200 bg-slate-950 shadow-lg"
            />
          );
        }
        return <img alt={alt ?? ''} src={src ?? undefined} />;
      },
      pre({ children, ...props }) {
        return <pre {...props} className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 shadow-lg">{children}</pre>;
      },
      code({ className, children, ...props }) {
        const isBlockCode = className?.includes('language-') || className?.includes('hljs');
        return <code {...props} className={isBlockCode ? `${className ?? ''} font-mono text-sm` : 'rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-slate-900'}>{children}</code>;
      },
      a({ children, href, ...props }) {
        const external = href?.startsWith('http');
        const isAiSitterArticleCta = href?.startsWith('/it/servizi/ai-sitter/');
        return <a {...props} href={href} data-umami-event={isAiSitterArticleCta ? 'ai_sitter_article_click' : undefined} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className="font-medium text-brand-blue underline underline-offset-4">{children}</a>;
      },
      table({ children, ...props }) {
        return <div className="not-prose my-8 overflow-x-auto"><table {...props} className="w-full border-collapse rounded-lg text-left text-sm">{children}</table></div>;
      },
      th({ children, ...props }) {
        return <th {...props} className="border border-slate-200 bg-slate-100 px-4 py-2 font-semibold text-slate-900">{children}</th>;
      },
      td({ children, ...props }) {
        return <td {...props} className="border border-slate-200 px-4 py-2 align-top text-slate-700">{children}</td>;
      },
    }}
  >{renderSupersplatEmbeds(content)}</ReactMarkdown>;
}
