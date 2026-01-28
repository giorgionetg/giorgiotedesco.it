// app/page.tsx
import { loadLogseqPage } from "@/app/lib/logseq/loader";
import { parseLogseq } from "@/app/lib/logseq/parser";
import { astToMarkdown } from "@/app/lib/logseq/utils";
import { notFound } from "next/navigation";
import DigitalGardenView from "./DigitalGardenView";

export default function Page() {

  const title = "Digital Giorgio's Garden";
  const raw = loadLogseqPage(title);

  if (!raw) notFound();

  const ast = parseLogseq(raw);
  const md = astToMarkdown(ast);

  return <DigitalGardenView initialMarkdown={md} />;
}
