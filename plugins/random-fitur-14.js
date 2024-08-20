import fetch from 'node-fetch'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { sticker } from '../lib/sticker.js'
import fs from 'fs'
import jimp from 'jimp'
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'

let handler = async(m, { conn, groupMetadata, usedPrefix, text, args, command, isPrems, isOwner }) => {

let imgr = flaaa
let urut = text.split`|`
  let one = urut[1]
  let two = urut[2]
  let three = urut[3]

if (command == 'getaud') {
  let q = '128kbps'
  let v = args[0]
// Kocak
const yt = await youtubedl(v).catch(async () => await  youtubedlv2(v))
const dl_url = await yt.audio[q].download()
  const ttl = await yt.title
const size = await yt.audio[q].fileSizeH
  
 await m.reply(`${htki} YOUTUBE ${htka}*

*${htjava} Title:* ${ttl}
*${htjava} Type:* mp3
*${htjava} Filesize:* ${size}

*L O A D I N G. . .*`)
  await conn.sendFile(m.chat, dl_url, ttl + '.mp3', wm, m, null, {
    asDocument: false
  })
  }
  
  if (command == 'getvid') {
  let qu = args[1] || '360'
  let q = qu + 'p'
  let v = args[0]

  let _thumb = {}
    try { _thumb = { jpegThumbnail: thumb2 } }
    catch (e) { }

// Kocak
const yt = await youtubedl(v).catch(async () => await  youtubedlv2(v))
const dl_url = await yt.video[q].download()
  const ttl = await yt.title
const size = await yt.video[q].fileSizeH
  
 await m.reply(`${htki} YOUTUBE ${htka}*

*${htjava} Title:* ${ttl}
*${htjava} Type:* mp4
*${htjava} Filesize:* ${size}

*L O A D I N G. . .*`)
  await conn.sendMessage(m.chat, { [/^(?:-|--)doc$/i.test(args[1]) || null ? 'document' : 'video']: { url: dl_url }, fileName: `${wm}.mp4`, mimetype: 'video/mp4', ..._thumb }, { quoted: m, ephemeralExpiration: ephemeral })
}

}
handler.command = handler.help = ['getvid', 'getaud']
handler.tags = ['random']

export default handler
