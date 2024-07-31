let handler = async (m, { conn, usedPrefix, command }) => {
	let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
	let name = await conn.getName(who)
	let chat = global.db.data.chats[m.chat]
	let msgs = global.db.data.msgs
	let msg = (Object.entries(msgs).map(([nama, isi]) => { return { nama, ...isi} }))
	let listSections = []
	Object.values(msg).map((v, index) => {
	listSections.push([htki + " " + ++index + " " + htka, [
          ["Pesan: " + v.nama, usedPrefix + "getmsg " + v.nama, "\n\n" + htjava + "\n" + dmenub + " *ID:* " + v.key.id + "\n" + dmenub + " *Type:* " + Object.keys(v.message) + "\n" + dmenub + " *Jid:* " + (v.key.remoteJid).replace(/@.+/, "") + "\n" + dmenuf]
        ]])
	})
	if (chat.getmsg === false) return conn.sendButton(m.chat, "kamu harus mengaktifkan getmsg dengan mengklik tombol di bawah", wm, null, [["Nyalakan getmsg", ".on getmsg"]], m)
	if (msg[0]) return conn.sendList(m.chat, htki + " 📺 LIST MESSAGE 🔎 " + htka, "⚡ Hai " + name + "Berikut daftar Menu yg Ada di List store...\nAkses langsung dengan mengetik namanya", author, command + " Klik Disini", listSections, m)
	else throw "Belum ada Menu yg Ada di list store.\nketik *" + usedPrefix + " addlist <teks>* untuk menambahkan daftar menu."
}
handler.help = ["store"].map(v => "list" + v)
handler.tags = ["database"]
handler.command = ["liststore"]

export default handler