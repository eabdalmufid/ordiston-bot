import axios from 'axios'
import fetch from 'node-fetch'
import fs from 'fs'
import * as cheerio from 'cheerio'

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
	if (command == 'nicecerpen') {
	let cer = await ngecerpen(text)
	let pen = `
	*Title:* ${cer.title}
	*Author:* ${cer.author}
	*Kategori:* ${cer.kategori}
	*Lolos:* ${cer.lolos}
	
	*Cerita:*
	${cer.cerita}
	`
	conn.sendFile(m.chat, logo, '', pen, m)
	}
	if (command == 'nicetiktok') {
	let cer = await ngetiktok(text)
	let cap = `*「 T I K T O K 」*
*📛Author:* ${cer.author}
*📒Title:* ${cer.desc}

`.trim()
conn.sendFile(m.chat, cer.watermark, '', cap, m)
	}
	if (command == 'nicewiki') {
	let cer = await ngewiki(text)
	let listSections = []
	Object.values(cer).map((v, index) => {
	listSections.push([index + ' ' + cmenub + ' ' + v.judul, [
          ['Get Image', usedPrefix + 'get ' + v.thumb, '\n' + v.wiki + '\n *Link:* ' + v.thumb]
        ]])
	})
	return conn.sendList(m.chat, htki + ' 📺 Wiki Search 🔎 ' + htka, `⚡ Silakan pilih Wiki Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, `Wiki Search Disini`, listSections, m)
	}
    }
handler.help = ['nice']
handler.tags = ['internet']
handler.command = /^nice(cerpen|tiktok|wiki)$/i

export default handler

/* New Line */
async function ngecerpen(category) {
    return new Promise((resolve, reject) => {
        let title = category.toLowerCase().replace(/[()*]/g, "")
        let judul = title.replace(/\s/g, "-")
        let page = Math.floor(Math.random() * 5)
        axios.get('http://cerpenmu.com/category/cerpen-'+judul+'/page/'+page)
        .then((get) => {
            let $ = cheerio.load(get.data)
            let link = []
            $('article.post').each(function (a, b) {
                link.push($(b).find('a').attr('href'))
            })
            let random = link[Math.floor(Math.random() * link.length)]
            axios.get(random)
            .then((res) => {
                let $$ = cheerio.load(res.data)
                let hasil = {
                    title: $$('#content > article > h1').text(),
                    author: $$('#content > article').text().split('Cerpen Karangan: ')[1].split('Kategori: ')[0],
                    kategori: $$('#content > article').text().split('Kategori: ')[1].split('\n')[0],
                    lolos: $$('#content > article').text().split('Lolos moderasi pada: ')[1].split('\n')[0],
                    cerita: $$('#content > article > p').text()
                }
                resolve(hasil)
            })
        })
    })
}

async function ngetiktok(query) {
  let response = await axios("https://lovetik.com/api/ajax/search", {
    method: "POST",
    data: new URLSearchParams(Object.entries({ query })),
  });
  
   let desc = response.data.desc
   let author = response.data.author
   let nowm = (response.data.links[0].a || "").replace("https", "http")
   let watermark = (response.data.links[1].a || "").replace("https", "http")
   let audio = (response.data.links[2].a || "").replace("https", "http")
   let thumbnail = response.data.cover
  return { desc, author, nowm, watermark, audio, thumbnail }
}

async function ngewiki(query) {
const res = await axios.get(`https://id.m.wikipedia.org/w/index.php?search=${query}`)
const $ = cheerio.load(res.data)
const hasil = []
let wiki = $('#mf-section-0').find('p').text()
let thumb = $('#mf-section-0').find('div > div > a > img').attr('src')
thumb = thumb ? thumb : '//pngimg.com/uploads/wikipedia/wikipedia_PNG35.png'
thumb = 'https:' + thumb
let judul = $('h1#section_0').text()
hasil.push({ wiki, thumb, judul })
return hasil
}

