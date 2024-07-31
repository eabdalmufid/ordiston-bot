import axios from 'axios'

let handler = async (m, { conn, args }) => {
    if (!args[0]) throw 'Input *URL*'
    let xyz = "&apikey=hanum"
    let response = await axios.get(`https://xzn.wtf/api/krakendl?url=`+args[0]+xyz)
    let dataUrl = response.data.url

    let caption = `• upload_date: ${response.data.upload_date}
• last_download_date: ${response.data.last_download_date}
• views: ${response.data.views}
• downloads: ${response.data.downloads}
    ${wm}`

    await m.reply('Sedang diproses...')
    await new Promise(resolve => setTimeout(resolve, 1234))

    await conn.sendFile(m.chat, dataUrl, response.data.file_name, '', m, null, { asDocument: true })
    await new Promise(resolve => setTimeout(resolve, 1234))

    await m.reply(caption)
}

handler.help = ['kraken', 'krn'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(kraken|krn)$/i
handler.limit = true

export default handler