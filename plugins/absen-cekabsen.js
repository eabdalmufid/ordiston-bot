
let handler = async (m, { conn, usedPrefix }) => {
    let id = m.chat
    conn.absen = conn.absen ? conn.absen : {}
    if (!(id in conn.absen)) throw `_*Tidak ada absen berlangsung digrup ini!*_\n\n*${usedPrefix}mulaiabsen* - untuk memulai absen`
            
    let d = new Date
    let date = d.toLocaleDateString('id', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    let absen = conn.absen[id][1]
    let list = absen.map((v, i) => `│ ${i + 1}. @${v.split`@`[0]}`).join('\n')
    let caption = `*「 ABSEN 」*
Tanggal: ${date}
${conn.absen[id][2]}
┌─  *Sudah Absen:*
│ 
│ Total: ${absen.length}
${list}
│ 
└────

Ketik:
_*.absen* untuk ambil absen_
_*.cekabsen* untuk list absen_`

await conn.reply(m.chat, caption, m, { mentions: conn.parseMention(caption) })

}
handler.help = ['cekabsen']
handler.tags = ['absen']
handler.command = /^cekabsen$/i
handler.group = true
handler.admin = true
export default handler
