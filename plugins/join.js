import fs from 'fs'
import { randomBytes } from 'crypto'

let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i

let handler = async (m, { conn, text, usedPrefix, command, isOwner, args }) => {
let chat = global.db.data.chats[m.chat]
let imgr = flaaa
let [_, code, expired] = text.match(linkRegex) || []
    if (!code) throw `*Example:* ${usedPrefix + command} ${sgc}`
    
    let res = await conn.groupAcceptInvite(code)
    if (!res) throw res.toString()
    let name = await conn.getName(res).catch(_ => null)
    let caption = `Sukses Join Di Grup 
*${name || res}*

Jangan lupa baca rules ya banh!
    `
    await conn.sendButton(m.chat, caption, wm, imgr + 'join', [
                ['Rules', `${usedPrefix}rules`]
            ], m, adReply)
            
  if (chat.bcjoin) {
  let chats = Object.entries(conn.chats).filter(([_, chat]) => chat.isChats).map(v => v[0])
  let cc = conn.serializeM(text ? m : m.quoted ? await m.getQuotedObj() : false || m)
  let teks = text ? text : cc.text
  conn.reply(m.chat, `Membagikan Link Grup Kamu ke ${chats.length} chat`, m)
  for (let id of chats) {
  await conn.sendHydrated(id, "*「 New Group 」* \n\n" + text, wm, imgr + 'New Group', text, 'LINK GROUP', null, null, [[null, null]], m)
}
}

}
handler.premium = true
handler.command = /^join$/i
export default handler
