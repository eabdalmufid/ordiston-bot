import cheerio from 'cheerio';
import axios from 'axios';
import request from 'request';
import got from 'got';
import FormData from "form-data"
import fs from 'fs'

let handler = async (m, { text, args, usedPrefix, command }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom())
let name = await conn.getName(who)
let q = m.quoted ? m.quoted : m

if (!args[0]) {
let hasil = [
'list',
'search',
'detail',
'cartoon',
'vidsnap',
'aio',
'stock',
'sms'
]
	let row = Object.keys(hasil).map((v, index) => ({
		title: 'Flight Scraper ' + hasil[v],
		description: '\nNo. ' + index,
		rowId: usedPrefix + 'rapid ' + hasil[v]
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
   if (args[0] == 'list') {
   var arr = ['aircrafts', 'airports', 'airlines']
   if (!arr.includes(one)) return m.reply('input ' + arr.join(' '))
  let res = await list(one)
  throw res
  }
  
  if (args[0] == 'search') {
   if (!one) return m.reply('input text ')
  let res = await search(one.toUpperCase())
  throw res
  }
  
  if (args[0] == 'detail') {
   if (!one) return m.reply('input text ')
  let res = await detail(one.toUpperCase())
  throw res
  }
  
  if (args[0] == 'cartoon') {
   if (!one) return m.reply('input text ')
  let res = await cartoon(one, two)
  throw res
  }
  
  if (args[0] == 'vidsnap') {
   if (!one) return m.reply('input text ')
  let res = await vidsnap(one)
  throw res
  }
  
  if (args[0] == 'aio') {
   if (!one) return m.reply('input text ')
  let res = await aio(one)
  throw res
  }
  
  if (args[0] == 'stock') {
   if (!one) return m.reply('input text ')
  let res = await stock(one)
  throw res
  }
  
  if (args[0] == 'sms') {
   if (!one) return m.reply('input text ')
  let res = await sms(one, two)
  throw res
  }
  
  
  
}
handler.tags = ["rapid"]
handler.help = ["rapid <args> |query"]
handler.command = ["rapid"]
export default handler

async function list(query) {
const options = {
  method: 'GET',
  url: 'https://flight-radar1.p.rapidapi.com/' + query + '/list',
  headers: {
    'X-RapidAPI-Key': '35c9046f7cmshd2db25369e25f75p1cf84ejsn4d95e7ba9240',
    'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
  }
};
var res = await axios.request(options)
return res.data
}

async function search(query) {
const options = {
  method: 'GET',
  url: 'https://flight-radar1.p.rapidapi.com/flights/search',
  params: {query: query, limit: '25'},
  headers: {
    'X-RapidAPI-Key': '35c9046f7cmshd2db25369e25f75p1cf84ejsn4d95e7ba9240',
    'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
  }
};
var res = await axios.request(options)
return res.data
}

async function detail(query) {
const options = {
  method: 'GET',
  url: 'https://flight-radar1.p.rapidapi.com/flights/detail',
  params: {flight: query},
  headers: {
    'X-RapidAPI-Key': '35c9046f7cmshd2db25369e25f75p1cf84ejsn4d95e7ba9240',
    'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
  }
};
var res = await axios.request(options)
return res.data
}

async function cartoon(type, image) {
const data = new FormData();
data.append("image", image);
data.append("type", type);

const options = {
  method: 'POST',
  url: 'https://cartoon-yourself.p.rapidapi.com/facebody/api/portrait-animation/portrait-animation',
  headers: {
    'X-RapidAPI-Key': '35c9046f7cmshd2db25369e25f75p1cf84ejsn4d95e7ba9240',
    'X-RapidAPI-Host': 'cartoon-yourself.p.rapidapi.com',
    ...data.getHeaders()
  },
  data: data
};
var res = await axios.request(options)
return res.data
}

async function vidsnap(url) {
const options = {
  method: 'GET',
  url: 'https://vidsnap.p.rapidapi.com/fetch',
  params: {url: url},
  headers: {
    'X-RapidAPI-Key': '35c9046f7cmshd2db25369e25f75p1cf84ejsn4d95e7ba9240',
    'X-RapidAPI-Host': 'vidsnap.p.rapidapi.com'
  }
};

var res = await axios.request(options)
return res.data
}

async function aio(url) {
const options = {
  method: 'GET',
  url: 'https://massive-downloader.p.rapidapi.com/download_media',
  params: {url: url, cache: 'true'},
  headers: {
    'X-RapidAPI-Key': '35c9046f7cmshd2db25369e25f75p1cf84ejsn4d95e7ba9240',
    'X-RapidAPI-Host': 'massive-downloader.p.rapidapi.com'
  }
};

var res = await axios.request(options)
return res.data
}

async function stock(type, query) {
const encodedParams = new URLSearchParams();
encodedParams.append("type", type);
encodedParams.append("query", query);
encodedParams.append("size", "large");
encodedParams.append("orientation", "landscape");

const options = {
  method: 'POST',
  url: 'https://stock-photos-and-videos.p.rapidapi.com/api/search',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Key': '35c9046f7cmshd2db25369e25f75p1cf84ejsn4d95e7ba9240',
    'X-RapidAPI-Host': 'stock-photos-and-videos.p.rapidapi.com'
  },
  data: encodedParams
};

var res = await axios.request(options)
return res.data
}


async function sms(number, message) {
const options = {
  method: 'POST',
  url: 'https://getitsms-whatsapp-apis.p.rapidapi.com/45',
  params: {your_number: number, your_message: message},
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '35c9046f7cmshd2db25369e25f75p1cf84ejsn4d95e7ba9240',
    'X-RapidAPI-Host': 'getitsms-whatsapp-apis.p.rapidapi.com'
  },
  data: '{"your_number":'+number+',"your_message":'+number+'}'
};

var res = await axios.request(options)
return res.data
}