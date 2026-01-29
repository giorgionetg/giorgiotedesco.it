import fs from "fs";
import path from "path";

function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
}

export function loadLogseqPage(slug: string) {

  if (!slug) return null;

  const filePath = path.join(
    process.cwd(),
    "logseq",
    "pages",
    `${slug}.md`
  );

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return fs.readFileSync(filePath, "utf8");
}

type PageIndex = {
  slug: string;
  title: string;
  file: string;
};

const filePath = path.join(
  process.cwd(),
  "logseq",
  "pages"
);

export function getAllPages(): PageIndex[] {

  if (!fs.existsSync(filePath)) {
    return [];
  }

  const files = fs.readdirSync(filePath);

  return files
    .filter(f => f.endsWith('.md'))
    .map(file => {
      const title = file.replace(/\.md$/, '');

      return {
        title,
        slug: slugify(title),
        file
      };
    });
}

export function getAllTagsPages() {

  if (!fs.existsSync(filePath)) {
    return [];
  }

  const files = fs.readdirSync(filePath);

  return [];

}
