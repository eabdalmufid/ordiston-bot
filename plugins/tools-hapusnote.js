let handler = async(m, { conn, command, usedPrefix, text }) => {
  global.db.data.users[m.sender].catatan = global.db.data.users[m.sender].catatan || []
  if (text == "all") {
  global.db.data.users[m.sender].catatan = []
  throw "Berhasil menghapus *semua* catatan!"
  }
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
  if (catatan[n] == undefined) return m.reply("Catatan tidak ditemukan!")
  let tmp = []

  for (let ct in catatan) {
    if(ct != n) {
      tmp.push(catatan[ct])
    } else {
      continue
    }
  }
  global.db.data.users[m.sender].catatan = tmp

conn.reply(m.chat, "Berhasil menghapus catatan!", m, false, {
    contextInfo: {
      mentionedJid: conn.parseMention(text)
    }
  })
}

handler.help = ["hapusnote"]
handler.tags = ["tools"]
handler.command = /^(hapus(catatan|note)|del(catatan|note))$/i

export default handler