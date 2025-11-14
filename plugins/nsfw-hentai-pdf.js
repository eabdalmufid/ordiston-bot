
import PDFDocument from "pdfkit";
import request from "request";
import fs from "fs";
import fetch from "node-fetch";
import * as cheerio from 'cheerio';;

let handler = async (m, { conn, command, usedPrefix, args, text }) => {
	
	if (command == "ehsearch") {
	if (!text) return m.reply("Cari apa?\n *" + usedPrefix + command + "* sakura")
	await m.reply(wait)
	let res = await EhSearch(text)
	let list = res.map((item, index) => `*${htki} 📺 H E N T A I 🔎 ${htka}*

*Title:* ${item.title}
*Url:* ${item.url}
`).join("\n")
	await m.reply(list)
	await m.reply("Untuk mengambil data, ketik *" + usedPrefix + command + "* url diatas")
	}
	if (command == "ehgmdata") {
	if (!text) return m.reply("Cari apa?\n *" + usedPrefix + command + "* url")
	await m.reply(wait)
	let res = await EhGmdata(text)
	let list = res.map((item, index) => `*${htki} 📺 H E N T A I 🔎 ${htka}*

*Title:* ${item.title}
*Thumb:* ${item.thumb}
*GID:* ${item.gid}
*Token:* ${item.token}
*Key:* ${item.archiver_key}
`).join("\n")
	await m.reply(list)
	await m.reply("Untuk mengambil link torrent, ketik *" + usedPrefix + command + "* GID TOKEN")
	}
	if (command == "ehtorrent") {
	if (!(args[0] && args[1])) return m.reply("Cari apa?\n .ehsearch sakura")
	await m.reply(wait)
	let res = await EhGallery(args[0], args[1])
	let list = res.map((item, index) => `*${htki} 📺 H E N T A I 🔎 ${htka}*

*Title:* ${item.title}
*Url:* ${item.url}
`).join("\n")
	await m.reply(list)
	await m.reply("Download uttorrent di playstore, dan input url diatas")
	}
}
handler.help = ["ehsearch <input>"]
handler.tags = ["nsfw"]
handler.command = /^eh(torrent|gmdata|search)$/i
export default handler

async function generatePDF(ObjArr) {
  const data = ObjArr;

  function addImageToPDF(doc, url) {
    return new Promise((resolve, reject) => {
      request.get(url)
        .on("error", err => {
          reject(err);
        })
        .on("response", response => {
          if (response.statusCode !== 200) {
            reject(new Error(`Failed to download image: ${response.statusMessage}`));
          }
          else {
            resolve();
          }
        })
        .pipe(doc.image(url));
    });
  }

  const doc = new PDFDocument();

  for (const item of data) {
    doc.addPage();
    await addImageToPDF(doc, item.image);
  }

  doc.pipe(fs.createWriteStream("./images/images.pdf"));
  doc.end();
}

async function EhSearch(input, page = "") {
    const res = await fetch("https://e-hentai.org/?page=" + page + "&f_search=" + input);
    const html = await res.text();
    const $ = cheerio.load(html);
    const results = [];
    $("a").each((i, link) => {
      const title = $(link).text();
      const url = $(link).attr("href");
      if (url.includes("/g/")) { // check if URL contains "/g/"
        results.push({title, url});
      }
    });
    return results;
}

async function EhGmdata(input) {
const infk = input
const url = infk.replace(/^.*hentai.org/, "https://e-hentai.org");
const pram = url.split("/");

const response = await fetch("https://e-hentai.org/api.php", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    method: "gdata",
    gidlist: [[pram[4] * 1, pram[5]]],
    namespace: 1,
  }),
});

const json = await response.json();
return json.gmetadata
}

async function EhGallery(id, token) {
  const res = await fetch("https://e-hentai.org/gallerytorrents.php?gid=" + id + "&t=" + token);
  const html = await res.text();
  const $ = cheerio.load(html);
  const results = [];
  $("td > a").each((i, link) => {
    const title = $(link).text();
    const url = $(link).attr("href");
    if (url.endsWith(".torrent")) { // check if URL contains "/g/"
      results.push({title, url});
    }
  });
  return results;
}
