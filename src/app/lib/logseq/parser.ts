
import type { LogLink, LogBlock } from "./utils";
import { pageLinkRegex, tagRegex } from "./utils";


function extractLinks(content: string): LogLink[] {
  const links: LogLink[] = [];

  let match;

  while ((match = pageLinkRegex.exec(content))) {
    links.push({ type: 'page', value: match[1] });
  }

  while ((match = tagRegex.exec(content))) {
    // not now
    /*links.push({
      type: 'tag',
      value: match[1] ?? match[2]
    });*/
  }

  return links;
}



export function parseLogseq(content: string): LogBlock[] {
  const lines = content.split(/\r?\n/);

  const root: LogBlock = { content: '__root__', children: [], level: -1 };
  const stack: LogBlock[] = [root];

  for (const line of lines) {
    if (!line.trim()) continue;

    const match = line.match(/^(\s*)- (.*)$/);
    if (!match) continue;

    const indent = match[1].length;
    const level = Math.floor(indent / 2);
    const text = match[2];

    const node: LogBlock = {
      content: text,
      children: [],
      level,
      links: extractLinks(text)
    };

    // Risali lo stack fino al padre corretto
    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop();
    }

    stack[stack.length - 1].children.push(node);
    stack.push(node);
  }

  return root.children;
}
