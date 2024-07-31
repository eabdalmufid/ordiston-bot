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
• ${usedPrefix + command} anime
• ${usedPrefix + command} animeget
• ${usedPrefix + command} artinama
• ${usedPrefix + command} blackpink
• ${usedPrefix + command} blood
• ${usedPrefix + command} breakwall
• ${usedPrefix + command} getgore
• ${usedPrefix + command} glow
• ${usedPrefix + command} gore
• ${usedPrefix + command} gores
• ${usedPrefix + command} ig
• ${usedPrefix + command} igstalk
• ${usedPrefix + command} igstory
• ${usedPrefix + command} joker
• ${usedPrefix + command} line
• ${usedPrefix + command} magma
• ${usedPrefix + command} matrix
• ${usedPrefix + command} mediafire
• ${usedPrefix + command} multicolor
• ${usedPrefix + command} neon
• ${usedPrefix + command} papercut
• ${usedPrefix + command} pin
• ${usedPrefix + command} pinterest
• ${usedPrefix + command} podcast
• ${usedPrefix + command} rexdl
• ${usedPrefix + command} rexdlget
• ${usedPrefix + command} shorten
• ${usedPrefix + command} slice
• ${usedPrefix + command} soundcloud
• ${usedPrefix + command} soundclouds
• ${usedPrefix + command} ss
• ${usedPrefix + command} sshp
• ${usedPrefix + command} sticker
• ${usedPrefix + command} stickerget
• ${usedPrefix + command} swiki
• ${usedPrefix + command} swikiget
• ${usedPrefix + command} telesticker
• ${usedPrefix + command} tiktok
• ${usedPrefix + command} tiktokfull
• ${usedPrefix + command} twitter
• ${usedPrefix + command} urban
• ${usedPrefix + command} wallpaper
• ${usedPrefix + command} wallpaper2
• ${usedPrefix + command} whatanime
`
await conn.sendFile(m.chat, logo, '', caption, m)
            }
            
try {
if (command) {
switch (template) {
        
            case 'animeget':
        let ab = await fetch(`https://api.neoxr.my.id/api/anime-get?url=${one}&apikey=5VC9rvNx`)
        let ac = await ab.json()
        m.reply(`${ac.status}
${ac.data.duration}
${ac.data.genre}
${ac.data.score}
${ac.data.sinopsis}
${ac.data.studio}
${ac.data.thumbnail}
${ac.data.title}

${ac.download[0].provider}
${ac.download.url[0]}
${ac.download.url[0].quality}
${ac.download.url[0].url}
${ac.download.url[1]}
${ac.download.url[1].quality}
${ac.download.url[1].url}
${ac.download.url[2]}
${ac.download.url[2].quality}
${ac.download.url[2].url}
${ac.download.url[3]}
${ac.download.url[3].quality}
${ac.download.url[3].url}
${ac.download[1].provider}
${ac.download[1].url}
${ac.download[1].url.quality}
${ac.download[1].url.url}
${ac.download[1].url[1]}
${ac.download[1].url[1].quality}
${ac.download[1].url[1].url}
${ac.download[1].url[2]}
${ac.download[1].url[2].quality}
${ac.download[1].url[2].url}
${ac.download[1].url[3]}
${ac.download[1].url[3].quality}
${ac.download[1].url[3].url}
${ac.download[2].provider}
${ac.download[2].url}
${ac.download[2].url.quality}
${ac.download[2].url.url}
${ac.download[2].url[1]}
${ac.download[2].url[1].quality}
${ac.download[2].url[1].url}
${ac.download[2].url[2]}
${ac.download[2].url[2].quality}
${ac.download[2].url[2].url}
${ac.download[2].url[3]}
${ac.download[2].url[3].quality}
${ac.download[2].url[3].url}
${ac.stream.url[0]}
${ac.stream.url[0].quality}
${ac.stream.url[0].url}
${ac.stream[1].provider}
${ac.stream[1].url}
${ac.stream[1].url.quality}
${ac.stream[1].url.url}
${ac.stream[1].url[1]}
${ac.stream[1].url[1].quality}
${ac.stream[1].url[1].url}
${ac.stream[1].url[2]}
${ac.stream[1].url[2].quality}
${ac.stream[1].url[2].url}
${ac.stream[1].url[3]}
${ac.stream[1].url[3].quality}
${ac.stream[1].url[3].url}
${ac.stream[2].provider}
${ac.stream[2].url}
${ac.stream[2].url.quality}
${ac.stream[2].url.url}
${ac.stream[3].provider}
${ac.stream[3].url}
${ac.stream[3].url.quality}
${ac.stream[3].url.url}`)
            break
            case 'anime':
        let bb = await fetch(`https://api.neoxr.my.id/api/anime?q=${one}&apikey=5VC9rvNx`)
        let bc = await bb.json()
    let bd = bc.data
	let be = Object.values(bd).map((v, index) => ({
		title: index + ': ' + v.title,
		description: '\nup: ' + v.up + '\nlink: ' + v.url,
		rowId: usedPrefix + 'ss ' + v.url
	}))
	let bf = {
		buttonText: `${args[0]} Search Disini`,
		description: `⚡ ${name} Silakan pilih ${args[0]} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
		footerText: wm
	}
	return conn.sendListM(m.chat, bf, be, m)
            break
            case 'artinama':
        let cb = await fetch(`https://api.neoxr.my.id/api/artinama?nama=${one}&apikey=5VC9rvNx`)
        let cc = await cb.json()
        conn.sendButtonVid(m.chat, giflogo, `${cc.data.arti}`, 'Nih.mp4', 'To Sticker', '.s', fakes, adReply)
            break
            case 'blackpink':
case 'blood':
case 'breakwall':
case 'glow':
case 'joker':
case 'magma':
case 'matrix':
case 'multicolor':
case 'neon':
case 'papercut':
case 'slice':
        let nsf = `https://api.neoxr.my.id/api/${args[0]}?text=${one}&apikey=5VC9rvNx`
        conn.sendButtonImg(m.chat, nsf, wm, 'Nih.jpg', 'To Sticker', '.s', fakes, adReply)
            break
            case 'gores':
        let db = await fetch(`https://api.neoxr.my.id/api/gore-search?q=${one}&apikey=5VC9rvNx`)
        let dc = await db.json()
    let dd = dc.data
	let de = Object.values(dd).map((v, index) => ({
		title: `${1 + index} ${v.title}`,
		description: 'Label: ' + v.label,
		rowId: usedPrefix + command + ' getgore |' + v.link
	}))
	let df = {
		buttonText: `${args[0]} Search Disini`,
		description: `⚡ ${name} Silakan pilih ${args[0]} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
		footerText: wm
	}
	return conn.sendListM(m.chat, df, de, m)
            break
            case 'getgore':
        let eb = await fetch(`https://api.neoxr.my.id/api/gore-get?url=${one}&apikey=5VC9rvNx`)
        let ec = await eb.json()
    let ee = `${ec.data.title}
    ${ec.data.author}
    ${ec.data.views}
    ${ec.data.thumb}
    ${ec.data.video}
    `
	conn.sendButtonVid(m.chat, ec.data.video, ee, 'Nih.mp4', 'To Sticker', '.s', fakes, adReply)
            break
            case 'gore':
        let fb = await fetch(`https://api.neoxr.my.id/api/gore?q=${one}&apikey=5VC9rvNx`)
        let fc = await fb.json()
    let fe = `${fc.data.title}
    ${fc.data.author}
    ${fc.data.views}
    ${fc.data.thumb}
    ${fc.data.video}
    `
	conn.sendButtonVid(m.chat, fc.data.video, fe, 'Nih.mp4', 'To Sticker', '.s', fakes, adReply)
            break
          case 'ig':
         if (!one) throw `Contoh penggunaan ${usedPrefix + command} ${args[0]} |query`
        let gb = await fetch(`https://api.neoxr.my.id/api/ig?url=${one}&apikey=5VC9rvNx`)
        let gc = await gb.json()
            conn.sendButtonImg(m.chat, gc.data[0].url, gc.data[0].type, 'Nih.jpg', 'To Sticker', '.s', fakes, adReply)
            break
            case 'igstalk':
        let hb = await fetch(`https://api.neoxr.my.id/api/igstalk?username=${one}&apikey=5VC9rvNx`)
        let hc = await hb.json()
    let he = `${hc.data.about}
${hc.data.follower}
${hc.data.following}
${hc.data.name}
${hc.data.photo}
${hc.data.post}
${hc.data.private}
${hc.data.username}
    `
	conn.sendButtonVid(m.chat, giflogo, he, 'Nih.mp4', 'To Sticker', '.s', fakes, adReply)
            break
            case 'igstory':
         if (!one) throw `Contoh penggunaan ${usedPrefix + command} ${args[0]} |query`
        let ib = await fetch(`https://api.neoxr.my.id/api/igstory?username=${one}&apikey=5VC9rvNx`)
        let ic = await ib.json()
            conn.sendButtonImg(m.chat, ic.data[0].url, ic.data[0].type, 'Nih.jpg', 'To Sticker', '.s', fakes, adReply)
            break
            case 'line':
         if (!one) throw `Contoh penggunaan ${usedPrefix + command} ${args[0]} |query`
        let jb = await fetch(`https://api.neoxr.my.id/api/line?url=${one}&apikey=5VC9rvNx`)
        let jc = await jb.json()
            conn.sendButtonImg(m.chat, jc.data.url, author, 'Nih.jpg', 'To Sticker', '.s', fakes, adReply)
            break
            case 'mediafire':
        let kb = await fetch(`https://api.neoxr.my.id/api/mediafire?url=${one}&apikey=5VC9rvNx`)
        let kc = await kb.json()
    let ke = `${kc.data.extension}
${kc.data.filename}
${kc.data.link}
${kc.data.mime}
${kc.data.size}
${kc.data.uploaded}
    `
	conn.sendButtonVid(m.chat, giflogo, ke, 'Nih', 'Get', '.get ' + kc.data.link, fakes, adReply)
            break
            case 'pin':
         if (!one) throw `Contoh penggunaan ${usedPrefix + command} ${args[0]} |query`
        let lb = await fetch(`https://api.neoxr.my.id/api/pin?url=${one}&apikey=5VC9rvNx`)
        let lc = await lb.json()
            conn.sendButtonVid(m.chat, lc.data.url, lc.data.type, 'Nih', 'Get', '.get ' + lc.data.link, fakes, adReply)
            break
            case 'pinterest':
        let mb = await fetch(`https://api.neoxr.my.id/api/pinterest?q=${one}&apikey=5VC9rvNx`)
        let mc = await mb.json()
    let md = mc.data
	let me = Object.values(md).map((v, index) => ({
		title: `Result ${1 + index}`,
		description: 'By ' + wm,
		rowId: usedPrefix + 'get ' + v.url
	}))
	let mf = {
		buttonText: `${args[0]} Search Disini`,
		description: `⚡ ${name} Silakan pilih ${args[0]} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
		footerText: wm
	}
	return conn.sendListM(m.chat, mf, me, m)
            break
            case 'podcast':
        let nb = await fetch(`https://api.neoxr.my.id/api/podcast?url=${one}&apikey=5VC9rvNx`)
        let nc = await nb.json()
    let ne = `${nc.data.audio}
${nc.data.author}
${nc.data.duration}
${nc.data.title}
    `
	conn.sendButtonVid(m.chat, giflogo, ne, 'Nih', 'Get', '.get ' + nc.data.audio, fakes, adReply)
            break
            case 'rexdlget':
        let ob = await fetch(`https://api.neoxr.my.id/api/rexdl-get?url=${one}&apikey=5VC9rvNx`)
        let oc = await ob.json()
    let oe = `${oc.name}
${oc.password}
${oc.size}
${oc.status}
${oc.thumb}
${oc.update}
${oc.version}
${oc.data.filename}
${oc.data.url}
    `
	conn.sendButtonVid(m.chat, giflogo, oe, 'Nih', 'Get', '.get ' + oc.data.url, fakes, adReply)
            break
            
            case 'rexdl':
        let pb = await fetch(`https://api.neoxr.my.id/api/rexdl?q=${one}&apikey=5VC9rvNx`)
        let pc = await pb.json()
    let pd = pc.data
	let pe = Object.values(pd).map((v, index) => ({
		title: `${1 + index} ${v.name}`,
		description: '\ncategory: ' + v.category + '\npublish: ' + v.publish + '\ndesc: ' + v.desc + '\nurl: ' + v.url, 
		rowId: usedPrefix + command + ' rexdlget |' + v.url
	}))
	let pf = {
		buttonText: `${args[0]} Search Disini`,
		description: `⚡ ${name} Silakan pilih ${args[0]} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
		footerText: wm
	}
	return conn.sendListM(m.chat, pf, pe, m)
            break
            
            case 'shorten':
        let qb = await fetch(`https://api.neoxr.my.id/api/shorten?url=${one}&apikey=5VC9rvNx`)
        let qc = await qb.json()
        m.reply('Result: ' + qc.data.url)
                break
                case 'soundclouds':
        let rb = await fetch(`https://api.neoxr.my.id/api/soundcloud-search?q=${one}&apikey=5VC9rvNx`)
        let rc = await rb.json()
    let rd = rc.data
	let re = Object.values(rd).map((v, index) => ({
		title: `${1 + index} ${v.title}`,
		description: '\nartist: ' + v.artist + '\ngenre: ' + v.genre + '\nduration: ' + v.duration + '\nplays: ' + v.plays + '\nlikes: ' + v.likes + '\ncomments: ' + v.comments + '\nurl: ' + v.url,
		rowId: usedPrefix + command + ' soundcloud |' + v.url
	}))
	let rf = {
		buttonText: `${args[0]} Search Disini`,
		description: `⚡ ${name} Silakan pilih ${args[0]} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
		footerText: wm
	}
	return conn.sendListM(m.chat, rf, re, m)
            break
            
            case 'soundcloud':
        let sb = await fetch(`https://api.neoxr.my.id/api/soundcloud?url=${one}&apikey=5VC9rvNx`)
        let sc = await sb.json()
    let se = `${sc.data.imageURL}
${sc.data.title}
${sc.data.url}
${sc.data.author.avatar_url}
${sc.data.author.city}
${sc.data.author.comments_count}
${sc.data.author.country_code}
${sc.data.author.created_at}
${sc.data.author.description}
${sc.data.author.first_name}
${sc.data.author.followers_count}
${sc.data.author.followings_count}
${sc.data.author.id}
${sc.data.author.kind}
${sc.data.author.last_name}
${sc.data.author.likes_count}
${sc.data.author.permalink_url}
${sc.data.author.playlist_likes_count}
${sc.data.author.uri}
${sc.data.author.username}
${sc.data.author.verified}`
	conn.sendButtonVid(m.chat, sc.data.imageURL, se, 'Nih', 'Get', '.get ' + sc.data.url, fakes, adReply)
            break
            
            case 'ss':
         if (!one) throw `Contoh penggunaan ${usedPrefix + command} ${args[0]} |query`
        let tb = `https://api.neoxr.my.id/api/ss?url=${one}&apikey=5VC9rvNx`
            conn.sendButtonImg(m.chat, tb, wm, 'Nih.jpg', 'To Sticker', '.s', fakes, adReply)
            break
            case 'sshp':
         if (!one) throw `Contoh penggunaan ${usedPrefix + command} ${args[0]} |query`
        let ub = `https://api.neoxr.my.id/api/sshp?url=${one}&apikey=5VC9rvNx`
            conn.sendButtonImg(m.chat, ub, wm, 'Nih.jpg', 'To Sticker', '.s', fakes, adReply)
            break
            
            case 'sticker':
        let vb = await fetch(`https://api.neoxr.my.id/api/sticker?q=${one}&apikey=5VC9rvNx`)
        let vc = await vb.json()
    let vd = vc.data
	let ve = Object.values(vd).map((v, index) => ({
		title: `${1 + index} ${v.name}`,
		description: '\ncreator: ' + v.creator + '\nurl: ' + v.url,
		rowId: usedPrefix + command + ' stickerget |' + v.url
	}))
	let vf = {
		buttonText: `${args[0]} Search Disini`,
		description: `⚡ ${name} Silakan pilih ${args[0]} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
		footerText: wm
	}
	return conn.sendListM(m.chat, vf, ve, m)
            break
            
            case 'stickerget':
        let wb = await fetch(`https://api.neoxr.my.id/api/sticker-get?url=${one}&apikey=5VC9rvNx`)
        let wc = await wb.json()
    let wd = wc.data
	let we = Object.values(wd).map((v, index) => ({
		title: `Result ${1 + index}`,
		description: '\nurl: ' + v.url,
		rowId: usedPrefix + 'fetchsticker ' + v.url + ' wsf'
	}))
	let wf = {
		buttonText: `${args[0]} Search Disini`,
		description: `⚡ ${name} Silakan pilih ${args[0]} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
		footerText: wm
	}
	return conn.sendListM(m.chat, wf, we, m)
            break
            
            case 'swiki':
        let xb = await fetch(`https://api.neoxr.my.id/api/swiki?q=${one}&apikey=5VC9rvNx`)
        let xc = await xb.json()
    let xd = xc.data
	let xe = Object.values(xd).map((v, index) => ({
		title: `${1 + index} ${v.name}`,
		description: '\ntotal: ' + v.total + '\nurl: ' + v.url,
		rowId: usedPrefix + command + ' swikiget |' + v.url
	}))
	let xf = {
		buttonText: `${args[0]} Search Disini`,
		description: `⚡ ${name} Silakan pilih ${args[0]} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
		footerText: wm
	}
	return conn.sendListM(m.chat, xf, xe, m)
            break
            case 'swikiget':
        let yb = await fetch(`https://api.neoxr.my.id/api/swiki-get?url=${one}&apikey=5VC9rvNx`)
        let yc = await yb.json()
    let yd = yc.data
	let ye = Object.values(yd).map((v, index) => ({
		title: `Result ${1 + index}`,
		description: '\nurl: ' + v.url,
		rowId: usedPrefix + 'fetchsticker ' + v.url + ' wsf'
	}))
	let yf = {
		buttonText: `${args[0]} Search Disini`,
		description: `⚡ ${name} Silakan pilih ${args[0]} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
		footerText: wm
	}
	return conn.sendListM(m.chat, yf, ye, m)
            break
            
            case 'telesticker':
        let zb = await fetch(`https://api.neoxr.my.id/api/telesticker?url=${one}&apikey=5VC9rvNx`)
        let zc = await zb.json()
    let zd = zc.data
	let ze = Object.values(zd).map((v, index) => ({
		title: `Result ${1 + index}`,
		description: '\nurl: ' + v.url,
		rowId: usedPrefix + 'fetchsticker ' + v.url + ' wsf'
	}))
	let zf = {
		buttonText: `${args[0]} Search Disini`,
		description: `⚡ ${name} Silakan pilih ${args[0]} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
		footerText: wm
	}
	return conn.sendListM(m.chat, zf, ze, m)
            break
            
            case 'tiktok':
        let Ab = await fetch(`https://api.neoxr.my.id/api/tiktok?url=${one}&apikey=5VC9rvNx`)
        let Ac = await Ab.json()
    let Ae = `${Ac.data.author}
${Ac.data.caption}`
	conn.send2ButtonVid(m.chat, Ac.data.videoWM, Ae, 'Nih', 'No WM', '.get ' + Ac.data.video, 'MP3', '.get ' + Ac.data.audio, fakes, adReply)
            break
            
            case 'tiktokfull':
        let Bb = await fetch(`https://api.neoxr.my.id/api/tiktokfull?url=${one}&apikey=5VC9rvNx`)
        let Bc = await Bb.json()
    let Be = `${Bc.data.commentCount}
${Bc.data.createTime}
${Bc.data.diggCount}
${Bc.data.downloaded}
${Bc.data.id}
${Bc.data.imageUrl}
${Bc.data.playCount}
${Bc.data.secretID}
${Bc.data.shareCount}
${Bc.data.text}
${Bc.data.videoApiUrlNoWaterMark}
${Bc.data.videoUrl}
${Bc.data.videoUrlNoWaterMark}
${Bc.data.authorMeta.avatar}
${Bc.data.authorMeta.digg}
${Bc.data.authorMeta.fans}
${Bc.data.authorMeta.following}
${Bc.data.authorMeta.heart}
${Bc.data.authorMeta.id}
${Bc.data.authorMeta.name}
${Bc.data.authorMeta.nickName}
${Bc.data.authorMeta.private}
${Bc.data.authorMeta.secUid}
${Bc.data.authorMeta.signature}
${Bc.data.authorMeta.verified}
${Bc.data.authorMeta.video}
${Bc.data.covers.default}
${Bc.data.covers.origin}
${Bc.data.musicMeta.coverLarge}
${Bc.data.musicMeta.coverMedium}
${Bc.data.musicMeta.coverThumb}
${Bc.data.musicMeta.duration}
${Bc.data.musicMeta.musicAuthor}
${Bc.data.musicMeta.musicId}
${Bc.data.musicMeta.musicName}
${Bc.data.musicMeta.musicOriginal}
${Bc.data.videoMeta.duetEnabled}
${Bc.data.videoMeta.duration}
${Bc.data.videoMeta.height}
${Bc.data.videoMeta.ratio}
${Bc.data.videoMeta.stitchEnabled}
${Bc.data.videoMeta.width}
${Bc.data.videoMeta.duetInfo}
${Bc.data.videoMeta.duetInfo.duetFromId}
${Bc.downloads[0].extension}
${Bc.downloads[0].size}
${Bc.downloads[0].type}
${Bc.downloads[0].url}
${Bc.downloads[1].extension}
${Bc.downloads[1].size}
${Bc.downloads[1].type}
${Bc.downloads[1].url}
${Bc.downloads[2].extension}
${Bc.downloads[2].size}
${Bc.downloads[2].type}
${Bc.downloads[2].url}`
	conn.send2ButtonVid(m.chat, Bc.downloads.url, Be, 'Nih', 'No WM', '.get ' + Bc.downloads[1].url, 'MP3', '.get ' + Bc.downloads[2].url, fakes, adReply)
            break
            case 'twitter':
        let Cb = await fetch(`https://api.neoxr.my.id/api/twitter?url=${one}&apikey=5VC9rvNx`)
        let Cc = await Cb.json()
    let Ce = `${Cb.author}
${Cb.like}
${Cb.retweet}
${Cb.reply}
${Cb.caption}
${Cb.data[0].type}
${Cb.data[0].url}`
	conn.sendButtonVid(m.chat, Cc.data[0].url, Ce, 'Nih', 'Get', '.get ' + Cb.data[0].url, fakes, adReply)
            break
            
            case 'urban':
        let Db = await fetch(`https://api.neoxr.my.id/api/urban?q=${one}&apikey=5VC9rvNx`)
        let Dc = await Db.json()
        m.reply('Result:\n' + Dc.data.content + '\n' + Dc.data.author)
                break
                
                case 'wallpaper':
        let Eb = await fetch(`https://api.neoxr.my.id/api/wallpaper?q=${one}&apikey=5VC9rvNx`)
        let Ec = await Eb.json()
    let Ed = Ec.data
	let Ee = Object.values(Ed).map((v, index) => ({
		title: `Result ${1 + index} by ${v.author}`,
		description: '\nlikes: ' + v.likes + '\ndesc: ' + v.desc + '\ndimension: ' + v.dimension + '\nurl: ' + v.url,
		rowId: usedPrefix + 'get ' + v.url
	}))
	let Ef = {
		buttonText: `${args[0]} Search Disini`,
		description: `⚡ ${name} Silakan pilih ${args[0]} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
		footerText: wm
	}
	return conn.sendListM(m.chat, Ef, Ee, m)
            break
            case 'wallpaper2':
        let Fb = await fetch(`https://api.neoxr.my.id/api/wallpaper2?q=${one}&apikey=5VC9rvNx`)
        let Fc = await Fb.json()
    let Fd = Fc.data
	let Fe = Object.values(Fd).map((v, index) => ({
		title: `Result ${1 + index} size ${v.size}`,
		description: '\ndimension: ' + v.dimension + '\nurl: ' + v.url,
		rowId: usedPrefix + 'get ' + v.url
	}))
	let Ff = {
		buttonText: `${args[0]} Search Disini`,
		description: `⚡ ${name} Silakan pilih ${args[0]} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
		footerText: wm
	}
	return conn.sendListM(m.chat, Ff, Fe, m)
            break
            
            case 'whatanime':
            let a_ = m.quoted ? m.quoted : m
  let b_ = (a_.msg || a_).mimetype || ''
  if (!b_) throw 'No media found'
  let c_ = await a_.download()
  let e_ = new Sticker(c_, { pack: packname, author: author, type: StickerTypes.FULL })
  let d_
  try {
  if (/webp/g.test(b_)) d_ = await webp2png(c_)
        else if (/image/g.test(b_)) d_ = await uploadImage(c_)
        else if (/video/g.test(b_)) d_ = await uploadFile(c_)
        else if (/viewOnce/g.test(b_)) d_ = await uploadFile(c_)
        if (typeof d_ !== 'string') d_ = await uploadImage(c_)
        else if (/gif/g.test(b_)) d_ = e_
        } catch (e) {
        throw eror
        }
        let wnt = `https://api.neoxr.my.id/api/whatanime?url=${d_}&apikey=5VC9rvNx`
        let Gb = await fetch(wnt)
        let Gc = await Gb.json()
    let Gd = Gc.data
   let Ge = `${Gd.anilist}
${Gd.filename}
${Gd.episode}
${Gd.from}
${Gd.to}
${Gd.similarity}`
        conn.sendButtonImg(m.chat, Gd.image, Ge, 'Nih.jpg', 'VIDEO', '.get ' + Gd.video, fakes, adReply)
            break
            
}
}
} catch (e) {
throw eror
}
}
handler.help = ['neo <command> <teks>']
handler.tags = ['tools'] 
handler.command = /^neo$/i
export default handler

