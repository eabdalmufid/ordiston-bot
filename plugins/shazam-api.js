import * as cheerio from 'cheerio';
import axios from 'axios';
import request from 'request';
import got from 'got';

let handler = async (m, { text, args, usedPrefix, command }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom())
let name = await conn.getName(who)
let q = m.quoted ? m.quoted : m

if (!args[0]) {
let hasil = [
'search',
'event',
'auto',
'detectv2',
'detect',
'detail',
'detailv2'
]
	let row = Object.keys(hasil).map((v, index) => ({
		title: 'Scraper ' + hasil[v],
		description: '\nNo. ' + index,
		rowId: usedPrefix + 'shazam ' + hasil[v] + ' |naruto'
	}))
	let button = {
		buttonText: `Scraper Disini`,
		description: `⚡ Silakan pilih Scraper di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
		footerText: wm
	}
	return await conn.sendListM(m.chat, button, row, m)
	}
let blum = 'Fitur Ini Belum ditambahkan'
let kueri =  'Masukkan Query\nEx. ' + usedPrefix + command + ' anime |naruto'
let urut = text.split`|`
  let one = urut[1]
  let two = urut[2]
  let three = urut[3]


  //BATAS
  if (args[0] == 'search') {
  if (!one) return m.reply('input song name')
  let res = await shazam_search(one)
  let sul = res.tracks.hits
  let listSections = []
        Object.values(sul).map((v, index) => {
            listSections.push(["Num. " + ++index, [
                ['Detail ' + v.track.title, usedPrefix + command + " detail |" + v.track.key, v.track.hub.type],
                ['Detail (v2) ' + v.track.title, usedPrefix + command + " detailv2 |" + v.track.hub.actions[0].id, v.track.hub.type],
                ['Music ' + v.track.title, usedPrefix + "get " + v.track.hub.actions[1].uri, v.track.hub.type]
            ]])
        })
        return conn.sendList(m.chat, htki + " 🗒️ List Effect " + htka, "⚡ Silakan pilih efek yang anda mau.", author, "[ Effect ]", listSections, m)
  }
  
  if (args[0] == 'event') {
  if (!one) return m.reply('input artist id')
  let res = await shazam_event(one)
  throw await clean(JSON.stringify(res, null, 4))
  }
  
   if (args[0] == 'auto') {
   if (!one) return m.reply('input query')
  let res = await shazam_auto(one)
  throw await clean(JSON.stringify(res, null, 4))
  }
  
   if (args[0] == 'detectv2') {
   if (!q) return m.reply('reply audio')
   let media = await q.download()
  let res = await shazam_detectv2(await bufferToBase64(media))
  throw await clean(JSON.stringify(res, null, 4))
  }
  
  if (args[0] == 'detect') {
  if (!q) return m.reply('reply audio')
   let media = await q.download()
  let res = await shazam_detect(await bufferToBase64(media))
  throw await clean(JSON.stringify(res, null, 4))
  }
  
  if (args[0] == 'detailv2') {
  if (!one) return m.reply('input id')
  let res = await shazam_detailv2(one)
  let cap = `
${res.data[0].attributes.albumName}
${res.data[0].attributes.releaseDate}
${res.data[0].attributes.composerName}
${res.data[0].attributes.url}
${res.data[0].attributes.name}
${res.data[0].attributes.artistName}
`
  conn.reply(m.chat, cap, m)
		conn.sendFile(m.chat, res.data[0].attributes.previews[0].url, '', '', m)
  }
   if (args[0] == 'detail') {
   if (!one) return m.reply('input key')
  let res = await shazam_detail(one)
  let cap = `
${res.title}
${res.sections[1].type}
${res.sections[1].text.join(' ')}
${res.sections[1].footer}
`
		conn.reply(m.chat, cap, m)
		conn.sendFile(m.chat, res.hub.actions[1].uri, '', '', m)
  }
  
  
  
}
handler.tags = ["tools"]
handler.help = ["shazam <args> |query"]
handler.command = ["shazam"]
export default handler

async function shazam_search(query) {
const options = {
  method: 'GET',
  url: 'https://shazam.p.rapidapi.com/search',
  params: {term: query, locale: 'id-ID', offset: '0', limit: '5'},
  headers: {
    'X-RapidAPI-Key': '35c9046f7cmshd2db25369e25f75p1cf84ejsn4d95e7ba9240',
    'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
  }
};
var res = await axios.request(options)
return res.data
}

async function shazam_event(query) {
const options = {
  method: 'GET',
  url: 'https://shazam.p.rapidapi.com/shazam-events/list',
  params: {artistId: query, l: 'id-ID', from: '2022-12-31', limit: '50', offset: '0'},
  headers: {
    'X-RapidAPI-Key': '35c9046f7cmshd2db25369e25f75p1cf84ejsn4d95e7ba9240',
    'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
  }
};
var res = await axios.request(options)
return res.data
}

async function shazam_auto(query) {
const options = {
  method: 'GET',
  url: 'https://shazam.p.rapidapi.com/auto-complete',
  params: {term: query, locale: 'id-ID'},
  headers: {
    'X-RapidAPI-Key': '35c9046f7cmshd2db25369e25f75p1cf84ejsn4d95e7ba9240',
    'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
  }
};

var res = await axios.request(options)
return res.data
}

async function shazam_detectv2(query) {
const options = {
  method: 'POST',
  url: 'https://shazam.p.rapidapi.com/songs/v2/detect',
  params: {timezone: 'America/Chicago', locale: 'id-ID'},
  headers: {
    'content-type': 'text/plain',
    'X-RapidAPI-Key': '35c9046f7cmshd2db25369e25f75p1cf84ejsn4d95e7ba9240',
    'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
  },
  data: ''+query+''
};
var res = await axios.request(options)
return res.data
}

async function shazam_detect(query) {
const options = {
  method: 'POST',
  url: 'https://shazam.p.rapidapi.com/songs/detect',
  headers: {
    'content-type': 'text/plain',
    'X-RapidAPI-Key': '35c9046f7cmshd2db25369e25f75p1cf84ejsn4d95e7ba9240',
    'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
  },
  data: ''+query+''
};
var res = await axios.request(options)
return res.data
}

async function shazam_detailv2(query) {
const options = {
  method: 'GET',
  url: 'https://shazam.p.rapidapi.com/songs/v2/get-details',
  params: {id: query, l: 'id-ID'},
  headers: {
    'X-RapidAPI-Key': '35c9046f7cmshd2db25369e25f75p1cf84ejsn4d95e7ba9240',
    'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
  }
};
var res = await axios.request(options)
return res.data
}

async function shazam_detail(query) {
const options = {
  method: 'GET',
  url: 'https://shazam.p.rapidapi.com/songs/get-details',
  params: {key: query, locale: 'id-ID'},
  headers: {
    'X-RapidAPI-Key': '35c9046f7cmshd2db25369e25f75p1cf84ejsn4d95e7ba9240',
    'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
  }
};
var res = await axios.request(options)
return res.data
}

function clean(string) {
    return string
}

function bufferToBase64(buffer) {
  return Buffer.from(buffer).toString('base64');
}