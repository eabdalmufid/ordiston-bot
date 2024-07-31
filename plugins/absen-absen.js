
let handler = async (m, { conn, usedPrefix }) => {
    let id = m.chat
    conn.absen = conn.absen ? conn.absen : {}
    if (!(id in conn.absen)) {
        await conn.reply(m.chat, `Mohon maaf, Tidak ada absen berlangsung!\n\n_Ketik *.mulaiabsen* untuk mulai absen_`, m)
        throw false
    }
    
    let absen = conn.absen[id][1]
    if (absen.includes(m.sender)) throw '*Kamu sudah absen bang！🙄*'
    absen.push(m.sender)
    m.reply(`Done!`)
    let d = new Date
    let date = d.toLocaleDateString('id', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    
    let list = absen.map((v, i) => `├ ${i + 1}.  @${v.split`@`[0]}`).join('\n')
    let caption = `
Tanggal: ${date}
${conn.absen[id][2]}
┌「 *Absen* 」  
├ Total: ${absen.length}
${list} 
└────

Ketik:
_*.absen* untuk ambil absen_
_*.cekabsen* untuk list absen_`.trim()

    await conn.reply(m.chat, caption, m, { mentions: conn.parseMention(caption) })
}
handler.help = ['absen']
handler.tags = ['absen']
handler.command = /^(absen|hadir)$/i

export default handler
