import axios from "axios"
  import cheerio from "cheerio"
  import request from "request"
async function listsurah() {
  return new Promise((t, a) => {
    axios
      .get("https://litequran.net/")
      .then(({ data: a }) => {
        const e = cheerio.load(a);
        let i = [];
        let result
        e("body > main > section > ol > li > a").each(function (t, a) {
          i.push(e(a).text());
        }),
          (result = { status: !0, listsurah: i }),
          t(result);
      })
      .catch(a);
  });
}
async function surah(t) {
  return new Promise((a, e) => {
    axios
      .get(`https://litequran.net/${t}`)
      .then(({ data: t }) => {
        const e = cheerio.load(t),
          i = [];
          let result
        e("body > main > article > ol > li").each(function (t, a) {
          (result = {
            status: !0,
            arab: e(a).find("> span.ayat").text(),
            latin: e(a).find("> span.bacaan").text(),
            translate: e(a).find("> span.arti").text(),
          }),
            i.push(result);
        }),
          a(i);
      })
      .catch(e);
  });
}
async function tafsirsurah(t) {
  return new Promise((a, e) => {
    axios
      .get(`https://tafsirq.com/topik/${t}`)
      .then(({ data: t }) => {
        const e = cheerio.load(t),
         i = [];
         let result
        e("body > div:nth-child(4) > div > div.col-md-6 > div ").each(function (
          t,
          a
        ) {
          (result = {
            status: !0,
            surah: e(a)
              .find("> div.panel-heading.panel-choco > div > div > a")
              .text(),
            tafsir: e(a).find("> div.panel-body.excerpt").text().trim(),
            type: e(a)
              .find("> div.panel-heading.panel-choco > div > div > span")
              .text(),
            source: e(a)
              .find("> div.panel-heading.panel-choco > div > div > a")
              .attr("href"),
          }),
            i.push(result);
        }),
          a(i);
      })
      .catch(e);
  });
}
export {
  listsurah,
  surah,
  tafsirsurah
};

import {
    fileURLToPath,
    URL
} from 'url'
import chalk from 'chalk'
import fs from 'fs'
const __filename = new URL('', import.meta.url).pathname
const __dirname = new URL('.', import.meta.url).pathname
let file = fileURLToPath(import.meta.url)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.bgGreen(chalk.black("[  UPDATE ]")), chalk.white(`${__filename}`))
    import(`${file}?update=${Date.now()}`)
})