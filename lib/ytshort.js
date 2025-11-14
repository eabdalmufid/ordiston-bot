import axios from 'axios';
import * as cheerio from 'cheerio';

async function ytshort(Url, type = "mp4") {
  let { data: html } = await axios.post("https://ytdownloadid.herokuapp.com/download", {
    "choices-single-default": format == "mp4" ? "Mp4 / Video" : "Mp3 / Audio",
    "url": Url
  })
  let $ = cheerio.load(html)
  let url = ($("div.s003 > div.first-wrap > button").attr("onclick")).split(" = ")[1].replace(/[\"]/g, "")

  return url
}

export { ytshort }

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