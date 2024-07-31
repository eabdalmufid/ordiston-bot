import fs from 'fs'
let handler = async (m, { conn, args }) => {
 let groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map(v => v[0])
 let text
 let imgr = flaaa
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw "Input Teks"
 for (let id of groups) {
 let member = (await conn.groupMetadata(id)).participants.map(v => v.jid)
 await conn.sendFile(id, imgr + 'BROADCAST', '', '────━┅ *BROADCAST* ┅━────' + '\n\n*Pesan:*\n' + text, m)
  }
}
handler.command = ['bcgcb']
handler.tags = ['host']
handler.help = ['bcgcb']
export default handler