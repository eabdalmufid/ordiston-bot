// import db from '../lib/database.js'
const moneyperlimit = 1000000
let handler = async (m, { conn, command, args }) => {
  let count = command.replace(/^buylimit/i, '')
  count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].money / moneyperlimit) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
  count = Math.max(1, count)
  if (isNaN(count)) throw `hanya angka!\n\ncontoh: .buylimit5`
  if (global.db.data.users[m.sender].money >= moneyperlimit * count) {
    global.db.data.users[m.sender].money -= moneyperlimit * count
    global.db.data.users[m.sender].limit += count
    conn.reply(m.chat, `-${moneyperlimit * count} Money\n+ ${count} Limit`, m)
  } else conn.reply(m.chat, `Money tidak mencukupi untuk membeli ${count} limit`, m)
}
handler.help = ['buylimit', 'buylimit', 'buylimitall'].map(v => v + ' <total>')
handler.tags = ['main']
handler.command = /^buylimit([0-9]+)|buylimit|buylimitall$/i
handler.owner = false

export default handler