import cheerio from 'cheerio'
import fetch from 'node-fetch'

const getTikPornData = async () => {
    try {
        const response = await fetch('https://tikporntok.com/?random=1')
        const htmlText = await response.text()
        const $ = cheerio.load(htmlText)

        const hasil = []
        $('.swiper-slide').each(function(index, element) {
            const title = $(element).attr('data-title')
            const video = $(element).find('source').attr('src') || $(element).find('video').attr('src')
            const thumb = $(element).find('img').attr('src')
            const desc = $(element).find('.shorts_events > p').text().trim()
            const views = $(element).find('#video-views-count-' + index).text()

            hasil.push({
                title,
                video,
                thumb,
                desc,
                views,
            })
        })

        return hasil
    } catch (error) {
        throw new Error('Error fetching data from TikPornTok: ' + error.message)
    }
}

const getCaption = (obj) => `
📝 *Title:* ${obj.title}
🔗 *Link:* ${obj.video}
📢 *Description:* ${obj.desc}
👀 *Views Count:* ${obj.views}
`

const handler = async (m, {
    conn
}) => {
    conn.tikPorntok = conn.tikPorntok ? conn.tikPorntok : {}
    const list = await getTikPornData()
    if (!list) return m.reply(eror)
    const teks = list.map((obj, index) => `*${index + 1}.* ${obj.title}`).join('\n')
    const {
        key
    } = await conn.reply(m.chat, `🔧 Daftar Video TikPorn:\n\n${teks}\n\nBalas pesan ini dengan nomor video yang ingin ditampilkan.`, m)
    conn.tikPorntok[m.chat] = {
        list,
        key,
        timeout: setTimeout(() => {
            conn.sendMessage(m.chat, {
                delete: key
            })
            delete conn.tikPorntok[m.chat]
        }, 60 * 1000)
    }
}

handler.before = async (m, {
    conn
}) => {
    conn.tikPorntok = conn.tikPorntok ? conn.tikPorntok : {}

    if (m.isBaileys || !(m.chat in conn.tikPorntok)) return

    const {
        list,
        key,
        timeout
    } = conn.tikPorntok[m.chat]
    if (!m.quoted || m.quoted.id !== key.id || !m.text) return

    const choice = m.text.trim()
    const numChoice = Number(choice)

    if (isNaN(numChoice) || numChoice < 1 || numChoice > list.length) {
        await conn.reply(m.chat, "⚠️ Masukkan nomor video yang valid.", m)
    } else {
        const position = list[numChoice - 1]
        conn.sendFile(m.chat, position.video, '', getCaption(position), m)
        conn.sendMessage(m.chat, {
                delete: key
            })
        clearTimeout(timeout)
        delete conn.tikPorntok[m.chat]
    }
}

handler.help = ["tikporn", "tikporntok", "tiktokporn"]
handler.tags = ["search"]
handler.command = /^(tikporn|tikporntok|tiktokporn)$/i
handler.premium = true

export default handler