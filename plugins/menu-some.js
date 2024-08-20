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

let btn = [{
                                urlButton: {
                                    displayText: 'Source Code',
                                    url: sgh
                                }
                            }, {
                                callButton: {
                                    displayText: 'Number Phone Owner',
                                    phoneNumber: nomorown
                                }
                            }, {
                                quickReplyButton: {
                                    displayText: 'To Sticker',
                                    id: '.s'
                                }
                            }]
                            
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
• ${usedPrefix + command} animal
• ${usedPrefix + command} animu
• ${usedPrefix + command} binary
• ${usedPrefix + command} token
• ${usedPrefix + command} base64
• ${usedPrefix + command} facts
• ${usedPrefix + command} img
• ${usedPrefix + command} joke
• ${usedPrefix + command} dict
• ${usedPrefix + command} lyrics
• ${usedPrefix + command} filter
`
await conn.sendFile(m.chat, logo, '', caption, m)
            }
            
try {
if (command) {
switch (template) {
case 'animal':
        let cb = await fetch(`https://some-random-api.com/animal/${one}`)
        let cc = await cb.json()
        return conn.sendButtonImg(m.chat, cc.image, cc.fact, 'Nih.jpg', 'To Sticker', '.s', fakes, adReply)
            break
            
case 'animu':
            let db = await fetch(`https://some-random-api.com/animu/${one}`)
        let dc = await db.json()
        return conn.sendButtonGif(m.chat, 'Nihh', wm, { url: dc.link }, btn, knimg)
            break
            case 'binary':
        let eb = await fetch(`https://some-random-api.com/others/binary?text=${one}`)
        let ec = await eb.json()
        return m.reply(ec.binary)
            break
            case 'token':
        let fb = await fetch(`https://some-random-api.com/others/bottoken`)
        let fc = await fb.json()
        return m.reply(fc.token)
            break
            case 'base64':
        let gb = await fetch(`https://some-random-api.com/others/base64?${one}=${two}`)
        let gc = await gb.json()
        return m.reply(gc.base64)
            break
            
            case 'facts':
        let hb = await fetch(`https://some-random-api.com/facts/${one}`)
        let hc = await hb.json()
        return m.reply(hc.fact)
            break
            
            case 'img':
        let ib = await fetch(`https://some-random-api.com/img/${one}`)
        let ic = await ib.json()
        return conn.sendButtonImg(m.chat, ic.link, wm, 'Nih.jpg', 'To Sticker', '.s', fakes, adReply)
            break
            
            case 'joke':
        let jb = await fetch(`https://some-random-api.com/others/joke`)
        let jc = await jb.json()
        return m.reply(jc.joke)
            break
            
            case 'dict':
        let dct = await fetch(`https://some-random-api.com/others/dictionary?word=${one}`)
        let dic = await dct.json()
        return m.reply(dic.definition)
            break
            
            case 'lyrics':
        let kb = await fetch(`https://some-random-api.com/others/lyrics?title=${one}`)
        let kc = await kb.json()
        let kd = `${kc.title}
        ${kc.author}
        ${kc.lyrics}
        `
            return conn.sendButtonImg(m.chat, kc.thumbnail.genius, kd, kc.link.genius, 'To Sticker', '.s', fakes, adReply)
            break
            
            
            case 'filter':
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
        let fil = `https://some-random-api.com/canvas/filter/${one}?avatar=${d_}`
        return conn.sendButtonImg(m.chat, fil, wm, 'Nih.jpg', 'Sticker', '.s', fakes, adReply)
            break
            case 'misc':
            let a__ = m.quoted ? m.quoted : m
  let b__ = (a__.msg || a__).mimetype || ''
  if (!b__) throw 'No media found'
  let c__ = await a__.download()
  let e__ = new Sticker(c__, { pack: packname, author: author, type: StickerTypes.FULL })
  let d__
  try {
  if (/webp/g.test(b__)) d__ = await webp2png(c__)
        else if (/image/g.test(b__)) d__ = await uploadImage(c__)
        else if (/video/g.test(b__)) d__ = await uploadFile(c__)
        else if (/viewOnce/g.test(b__)) d__ = await uploadFile(c__)
        if (typeof d__ !== 'string') d__ = await uploadImage(c__)
        else if (/gif/g.test(b__)) d__ = e__
        } catch (e) {
        throw eror
        }
        let mis = `https://some-random-api.com/canvas/misc/${one}?avatar=${d__}`
        return conn.sendButtonImg(m.chat, mis, wm, 'Nih.jpg', 'Sticker', '.s', fakes, adReply)
            break
            
            case 'overlay':
            let a___ = m.quoted ? m.quoted : m
  let b___ = (a___.msg || a___).mimetype || ''
  if (!b___) throw 'No media found'
  let c___ = await a___.download()
  let e___ = new Sticker(c___, { pack: packname, author: author, type: StickerTypes.FULL })
  let d___
  try {
  if (/webp/g.test(b___)) d___ = await webp2png(c___)
        else if (/image/g.test(b___)) d___ = await uploadImage(c___)
        else if (/video/g.test(b___)) d___ = await uploadFile(c___)
        else if (/viewOnce/g.test(b___)) d___ = await uploadFile(c___)
        if (typeof d___ !== 'string') d___ = await uploadImage(c___)
        else if (/gif/g.test(b___)) d___ = e___
        } catch (e) {
        throw eror
        }
        let ove = `https://some-random-api.com/canvas/overlay/${one}?avatar=${d___}`
        return conn.sendButtonImg(m.chat, ove, wm, 'Nih.jpg', 'Sticker', '.s', fakes, adReply)
            break
            
}
}
} catch (e) {
throw eror
}
}
handler.help = ['some <command> <teks>']
handler.tags = ['tools'] 
handler.command = /^some$/i
export default handler

