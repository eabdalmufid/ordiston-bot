let handler = async(m, { conn, command, usedPrefix, text }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let name = await conn.getName(who)
  let fail = "*Format salah, example:*\n" + usedPrefix + command + " " + name + "|1. Masak\n2. Makan"
  global.db.data.users[m.sender].catatan = global.db.data.users[m.sender].catatan || []
  let catatan = global.db.data.users[m.sender].catatan
  let split = text.split("|")
  let title = split[0]
  let isi 
  if (!m.quoted) {
  isi = split[1]
  } else if (m.quoted && m.quoted.text) {
		isi = m.quoted.text
	} else throw fail
  if (catatan.includes(title)) return m.reply("*[ Judul tidak tersedia! ]*\n\n*Alasan:* Sudah digunakan")
  if (!title || !isi) return m.reply(fail)
  let cttn = {
    "title": title,
    "isi": isi
  }
  global.db.data.users[m.sender].catatan.push(cttn)
  await conn.sendButton(m.chat, `*[ Notes Created! ]*\n\nUntuk melihat Note yang sudah dibuat.\nKetik: *${usedPrefix}lihatnote*`, author, "https://telegra.ph/file/7989b4e60a9dedfcdbbec.jpg", [
  ["[ 🗒️ List Notes ]", ".listnote"]
  ], m)
}

handler.help = ["buatnote"]
handler.tags = ["tools"]
handler.command = /^(buat(catatan|note)|add(catatan|note))$/i

export default handler