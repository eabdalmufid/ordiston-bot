import fetch from 'node-fetch'
import { JSDOM } from 'jsdom'

let handler = async (m, { conn, text }) => {
    let teks = text ? text.trim() : m.quoted && m.quoted.text ? m.quoted.text : m.text

    if (teks.includes('|')) {
        let [nama, urutan] = teks.split('|')
        if (urutan && /^\d+$/.test(urutan)) {
            let caption = await stylizeText(nama.trim())
            let msg = Object.entries(caption).map(([key, value]) => ({ key, value }))
            let selectedObj = msg[parseInt(urutan) - 1]
            if (selectedObj) {
                let list = `🎨 *Gaya Terpilih* 🎨\n\n` +
                           `🔢 *Nomor:* [${urutan}]\n` +
                           `📛 *Nama:* ${selectedObj.key}\n` +
                           `📋 *Isi:* ${selectedObj.value}\n\n` +
                           `🎉 Nikmati gaya tersebut! 🎉`
                return m.reply(list)
            } else {
                return m.reply('Nomor gaya tidak valid. Silakan coba nomor gaya lain.')
            }
        }
    }

    let caption = await stylizeText(teks)
    let msg = Object.entries(caption).map(([nama, isi], index) => 
        `🔢 *Nomor:* [${index + 1}]\n` +
        `📛 *Nama:* ${nama}\n` +
        `📋 *Isi:* ${isi}\n\n`
    );
    
    let list = `📜 *Daftar Gaya* 📜\n\n` +
               `⚡ Berikut adalah daftar gaya yang tersedia:\n\n` +
               `${msg.join('')}` +
               `🌟 Pilih gaya dengan menggunakan perintah *style [teks]|[nomor]* 🌟`
    
    return m.reply(list)
}

handler.help = ['style'].map(v => v + ' <teks>')
handler.tags = ['tools']
handler.command = /^(style(text)?)$/i
handler.exp = 0

export default handler

async function stylizeText(text) {
    let res = await fetch('http://qaz.wtf/u/convert.cgi?text=' + encodeURIComponent(text))
    let html = await res.text()
    let dom = new JSDOM(html)
    let table = dom.window.document.querySelector('table').children[0].children
    let obj = {}
    for (let tr of table) {
        let name = tr.querySelector('.aname').innerHTML
        let content = tr.children[1].textContent.replace(/^\n/, '').replace(/\n$/, '')
        obj[name + (obj[name] ? ' Terbalik' : '')] = content
    }
    return obj
}