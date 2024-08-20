let handler = async(m, { conn, command, usedPrefix, text }) => {
  global.db.data.users[m.sender].catatan = global.db.data.users[m.sender].catatan || []
  if (global.db.data.users[m.sender].catatan.length == 0) return m.reply("Kamu belum punya catatan!")
  let catatan = global.db.data.users[m.sender].catatan
    let numd = 0
    let numo = 0
    let listSections = []
    Object.values(catatan).map((v, index) => {
        listSections.push(["Num. " + ++index, [
            ["Delete " + v.title, usedPrefix + "hapusnote " + ++numd, v.isi],
            ["Open " + v.title, usedPrefix + "lihatnote " + ++numo, v.isi]
        ]])
    })
  if (text.length == 0) return conn.sendList(m.chat, htki + " 🗒️ List Notes " + htka, "⚡ Silakan pilih Notes yang anda mau.", author, "[ 🔍 Lihat ]", listSections, m)
  let split = text.split("|")
  if (catatan.length == 0) return m.reply("Kamu belum memiliki catatan!")
  let n = Number(split[0]) - 1

  let isi = global.db.data.users[m.sender].catatan[n] != undefined ? global.db.data.users[m.sender].catatan[n].isi : "Catatan tidak ditemukan!"
conn.reply(m.chat, `${isi}`, m, false, {
    contextInfo: {
      mentionedJid: conn.parseMention(text)
    }
  })
}

handler.help = ["lihatnote"]
handler.tags = ["tools"]
handler.command = /^(lihat(catatan|note)|open(catatan|note))$/i

export default handler