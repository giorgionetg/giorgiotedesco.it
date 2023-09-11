const sitemap = require('nextjs-sitemap-generator');
const fs = require("fs");

const BUILD_ID = fs.readFileSync(".next/BUILD_ID").toString();

sitemap({
  baseUrl: 'https://www.giorgiotedesco.it',
  pagesDirectory: __dirname + "/pages",
  targetDirectory : 'out/',
  sitemapFilename: 'sitemap.xml',
  nextConfigPath: __dirname + "/next.config.js",
  ignoredExtensions: [
        'png',
        'jpg'
  ]
});

console.log(`sitemap.xml generated!`);
