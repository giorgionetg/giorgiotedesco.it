import fs from "fs";
import path from "path";

import * as matter from "gray-matter";

export default async function mdCryptoLoader(filename) {
  let maindir = path.resolve(process.cwd(), "contents/" + filename);
  let data = await fs.readFileSync(maindir, "utf8");
  return matter(data);
}
