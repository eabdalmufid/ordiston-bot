function handler(m, { text }) {
    let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
    m.reply(teks.replace(/[aiueo]/gi, '$&ve'))
}
handler.help = ['purba'].map(v => v + ' <teks>')
handler.tags = ['fun']
handler.command =  /^(purba)$/i


export default handler