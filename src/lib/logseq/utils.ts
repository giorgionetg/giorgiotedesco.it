

export type LogLink = {
  type: 'page' | 'tag';
  value: string;
};

export type LogBlock = {
  content: string;
  children: LogBlock[];
  level: number;
  links?: LogLink[];
};


export const pageLinkRegex = /\[\[([^\]]+)\]\]/g;
export const tagRegex = /#([a-zA-Z0-9_-]+)|#\[\[([^\]]+)\]\]/g;

export function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
}

export function deslugify(slug: string) {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

function pageToUrl(page: string) {
  return `/digital-garden/${slugify(page)}`;
}

function tagToUrl(tag: string) {
  return `/digital-garden/tags/${slugify(tag)}`;
}

export function convertLogseqLinksToMarkdown(text: string): string {
  return text
    // [[Page]]
    .replace(/\[\[([^\]]+)\]\]/g, (_, page) => {
      return `[${page}](${pageToUrl(page)})`;
    })

    // #[[multi word]]
    .replace(/#\[\[([^\]]+)\]\]/g, (_, tag) => {
      return `[#${tag}](${tagToUrl(tag)})`;
    })

    // #tag
    .replace(/#([a-zA-Z0-9_-]+)/g, (_, tag) => {
      return `[#${tag}](${tagToUrl(tag)})`;
    });
}

export function astToMarkdown(
  blocks: LogBlock[],
  depth = 0
): string {
  let out = '';

  for (const block of blocks) {
    const indent = '  '.repeat(depth);
    const content = convertLogseqLinksToMarkdown(block.content);

    out += `${indent}- ${content}\n`;

    if (block.children?.length) {
      out += astToMarkdown(block.children, depth + 1);
    }
  }

  return out;
}