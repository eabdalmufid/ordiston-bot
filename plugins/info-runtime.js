
let handler = async (m, { conn, args, usedPrefix, command }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom())
let name = await conn.getName(who)
	let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    conn.sendButton(m.chat, htki + ' R U N T I M E ' + htka + '\n\n• • • • • • • • • • • •' + muptime + '\n• • • • • • • • • • • •', 
author, knimg, [
['ᴏᴡɴᴇʀ', '.owner'],
['ᴅᴏɴᴀᴛᴇ', '.donate']
], m, adReplyS)
}
handler.help = ['runtime']
handler.tags = ['info']
handler.command = /^r(untime?|t)$/i
export default handler

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return ['\n' + d, ' *Days*\n', h, ' *Hours*\n', m, ' *Minute*\n', s, ' *Second* '].map(v => v.toString().padStart(2, 0)).join('')
}