import fs from "fs";
import path from "path";

export default async function mdLoader(category) {
  let maindir = path.resolve(process.cwd(), "contents/" + category);
  return await fs.readdirSync(maindir);
}
