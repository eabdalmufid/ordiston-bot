import axios from 'axios'
import FormData from 'form-data'
import fetch from 'node-fetch'
import fs from 'fs'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'
import { Sticker, StickerTypes } from 'wa-sticker-formatter'

let handler = async(m, { conn, groupMetadata, usedPrefix, text, args, isPrems, isOwner, command }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom())
let name = await conn.getName(who)

let imgr = flaaa

let urut = text.split`|`
  let one = urut[1]
  let two = urut[2]
  let three = urut[3]
  
let template = (args[0] || '').toLowerCase()
if (!args[0] || !one) {
let caption = `*Contoh Penggunaan Single*
${usedPrefix + command} cecan

*Contoh Penggunaan Multi*
${usedPrefix + command} pinterest |wibu

*List:*

`
await conn.sendFile(m.chat, logo, '', caption, m)
	}
            
try {
if (command) {
switch (template) {
case 'tiktok2':
        let dtik = await fetch(`https://saipulanuar.ga/api/download/tiktok2?url=${one}&apikey=PdcnmDjy`)
        let dlt = await dtik.json()
        let tidl = []
	(dlt.result.video).map((v, index) => {
	tidl.push([htki + ' ' + ++index + ' ' + htka, [
          ['Link1: ', usedPrefix + 'get ' + dlt.result.video.link1, '\n\n' + htjava + '\n' + dmenub + ' *judul:* ' + dlt.result.judul + '\n' + dmenub + ' *Link:* ' + dlt.result.video.link1 + '\n' + dmenuf],
          ['Link2: ', usedPrefix + 'get ' + dlt.result.video.link2, '\n\n' + htjava + '\n' + dmenub + ' *judul:* ' + dlt.result.judul + '\n' + dmenub + ' *Link:* ' + dlt.result.video.link2 + '\n' + dmenuf],
          ['Link3: ', usedPrefix + 'get ' + dlt.result.video.link3, '\n\n' + htjava + '\n' + dmenub + ' *judul:* ' + dlt.result.judul + '\n' + dmenub + ' *Link:* ' + dlt.result.video.link3 + '\n' + dmenuf]
        ]])
	})
	return conn.sendList(m.chat, htki + ' 📺 LIST MESSAGE 🔎 ' + htka, `⚡ Hai ${name} Berikut daftar Menu yg Ada di List...`, author, `Klik Disini`, tidl, m)
            break
            
            case 'allvideo':
        let alld = await fetch(`https://saipulanuar.ga/api/downloader/allvideo?url=${one}&apikey=PdcnmDjy`)
        let allsd = await alld.json()
        let alldd = []
	Object.values(allsd.result).map((v, index) => {
	alldd.push([htki + ' ' + ++index + ' ' + htka, [
          ['Info: ', usedPrefix + 'get ' + v.url, '\n\n' + htjava + '\n' + dmenub + ' *Quality:* ' + v.quality + '\n' + dmenub + ' *Link:* ' + v.url + '\n' + dmenub + ' *Ext:* ' + v.extension + '\n' + dmenub + ' *Size:* ' + v.formattedSize + '\n' + dmenuf]
        ]])
	})
	return conn.sendList(m.chat, htki + ' 📺 LIST MESSAGE 🔎 ' + htka, `⚡ Hai ${name} Berikut daftar Menu yg Ada di List Group...`, author, `Klik Disini`, alldd, m)
            break
            
            case 'emoji':
        let smoj = await fetch(`https://saipulanuar.ga/api/info/emoji?query=${one}&apikey=PdcnmDjy`)
        let smosj = await smoj.json()
        let smojd = []
	Object.values(smosj.result.result).map((v, index) => {
	smojd.push([author, [
          ["Type: " + ++index, usedPrefix + 'get ' + v.url, '\n\n' + htjava + '\n' + dmenub + ' *Link:* ' + v.url + '\n' + dmenub + ' *Nama:* ' + smosj.result.nama + '\n' + dmenuf]
        ]])
	})
	return conn.sendList(m.chat, htki + ' 📺 LIST MESSAGE 🔎 ' + htka, `⚡ Hai ${name} Berikut daftar Menu yg Ada di List Group...`, author, `Klik Disini`, smojd, m)
            break
            
        	case 'linkwa':
        let lwa = await fetch(`https://saipulanuar.ga/api/download/linkwa?query=${one}&apikey=PdcnmDjy`)
        let nice = await lwa.json()
        let linkwa = []
	Object.values(nice.result).map((v, index) => {
	linkwa.push([htki + ' ' + ++index + ' ' + htka, [
          ['Info: ', usedPrefix + 'inspect ' + v.link, '\n\n' + htjava + '\n' + dmenub + ' *Nama:* ' + v.nama + '\n' + dmenub + ' *Link:* ' + v.link + '\n' + dmenuf]
        ]])
	})
	return conn.sendList(m.chat, htki + ' 📺 LIST MESSAGE 🔎 ' + htka, `⚡ Hai ${name} Berikut daftar Menu yg Ada di List Group...`, author, `Klik Disini`, linkwa, m)
            break
            case 'emojimix':
        let emix = await fetch(`https://saipulanuar.ga/api/info/emojimix?emoji1=${one}&emoji2=${two}&apikey=PdcnmDjy`)
        let mox = await emix.json()
        let mix = mox.result.results[0]
        let mixcap = `title: ${mix.title}
        `
        conn.sendButtonImg(m.chat, mix.url, mixcap, 'Nih', 'Download Now', '.fetchsticker ' + mix.url + ' wsf', fakes, adReply)
            break
            case 'mediafire':
        let medf = await fetch(`https://saipulanuar.ga/api/download/mediafire?url=${one}&apikey=PdcnmDjy`)
        let mfr = await medf.json()
        let mfir = mfr.result
        let mfcap = `title: ${mfir.title}
        filesize: ${mfir.filesize}
        mime: ${mfir.mime}
        link: ${mfir.link}
        `
        conn.sendButtonImg(m.chat, logo, mfcap, 'Nih', 'Download Now', '.get ' + mfir.link, fakes, adReply)
            break
            case 'soundcloud':
        let scd = await fetch(`https://saipulanuar.ga/api/download/soundcloud?url=${one}&apikey=PdcnmDjy`)
        let sll = await scd.json()
        let sdl = sll.result
        let scdcap = `title: ${sdl.title}
        duration: ${sdl.duration}
        quality: ${sdl.quality}
        download: ${sdl.download}
        `
        conn.sendButtonImg(m.chat, sdl.thumbnail, scdcap, 'Nih', 'Download Now', '.get ' + sdl.download, fakes, adReply)
            break
            case 'sticker':
        let stk = await fetch(`https://saipulanuar.ga/api/download/stickersearch?text=${one}&apikey=PdcnmDjy`)
        let stiks = await stk.json()
        let stis = stiks.result
        let sticap = `title: ${stis.title}`
        conn.sendButtonImg(m.chat, stis.url, sticap, 'Nih', 'Sticker', '.fetchsticker ' + stis.url + ' lib', fakes, adReply)
            break
            case 'telesticker':
        let tls = await fetch(`https://saipulanuar.ga/api/download/telesticker?url=${one}&apikey=PdcnmDjy`)
        let tlss = await tls.json()
        let tils = tlss.result
        let telcap = `url: ${tils.url}`
        conn.sendButtonImg(m.chat, tils.url, telcap, 'Nih', 'Sticker', '.get ' + tils.url, fakes, adReply)
            break
            case 'ssweb':
        let ssw = `https://saipulanuar.ga/api/download/ssweb?url=${one}&apikey=PdcnmDjy`
        conn.sendButtonImg(m.chat, ssw, wm, 'Nih.jpg', 'To Sticker', '.s', fakes, adReply)
            break
            case 'cerpen':
        let crp = await fetch(`https://saipulanuar.ga/api/cerpen/${one}?apikey=PdcnmDjy`)
        let ppen = await crp.json()
        throw ppen.result
            break
            case 'darkjoke':
            case 'memeh':
        let drk = `https://saipulanuar.ga/api/${template}?apikey=PdcnmDjy`
        conn.sendButtonImg(m.chat, drk, wm, 'Nih.jpg', 'To Sticker', '.s', fakes, adReply)
            break
            case 'bocil':
            case 'gheayubi':
            case 'hijaber':
            case 'rikagusriani':
            case 'santuy':
            case 'ukhty':
        let cb = await fetch(`https://saipulanuar.ga/api/asupan/${template}?apikey=PdcnmDjy`)
        let cc = await cb.json()
        conn.sendButtonVid(m.chat, cc.result.url, wm, 'Nih.mp4', 'To Sticker', '.s', fakes, adReply)
            break
            case 'asupan':
            case 'asupan2':
        let asu = `https://saipulanuar.ga/api/${template}?apikey=PdcnmDjy`
        let osu = await fetch(asu)
        let esu = await osu.json()
        conn.sendButtonVid(m.chat, esu.result.url, wm, 'Nih.mp4', 'To Sticker', '.s', fakes, adReply)
            break
            case 'bokepig':
        let bkig = `https://saipulanuar.ga/api/bokepig?apikey=PdcnmDjy`
        conn.sendButtonVid(m.chat, bkig, wm, 'Nih.mp4', 'To Sticker', '.s', fakes, adReply)
            break
            
            
}
}
} catch (e) {
throw eror
}
}
handler.help = ['pul <command> <teks>']
handler.tags = ['tools'] 
handler.command = /^pul$/i
export default handler

