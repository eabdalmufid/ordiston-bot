let handler = async(m, { conn, command, usedPrefix, text }) => {
  global.db.data.users[m.sender].catatan = global.db.data.users[m.sender].catatan || []
  if (global.db.data.users[m.sender].catatan.length == 0) return m.reply("Kamu belum punya catatan!")
  let catatan = global.db.data.users[m.sender].catatan
  if (catatan.length == 0) return m.reply("Kamu belum memiliki catatan!")
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
}

handler.help = ["listnote"]
handler.tags = ["tools"]
handler.command = /^(daftar(catatan|note)|list(catatan|note))$/i

export default handler