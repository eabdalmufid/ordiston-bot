import cheerio from 'cheerio'
import fetch from 'node-fetch'

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {

    let lister = [
        "search",
        "list"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.radiobox search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .radiobox search|vpn")
            await m.reply(wait)
            try {
                let res = await searchRadiobox(inputs)
                let teks = res.map((item, index) => {
    return `🔍 *[ RESULT ${index + 1} ]*

📢 *title:* ${item.title}
🌐 *url:* ${item.href}
🖼️ *logo:* ${item.logo}
🔖 *tags:* ${item.tags}
ℹ️ *info:* ${item.info}
🎧 *listeners:* ${item.metric.listeners}
📊 *chart:* ${item.metric.chart}
🌊 *stream:* ${item.stream}
`
}).filter(v => v).join("\n\n________________________\n\n")

await m.reply(teks)

            } catch (e) {
                await m.reply(eror)
            }
        }
        
        if (feature == "list") {
            if (!inputs) return m.reply("Input query link\nExample: .radiobox search|vpn")
            await m.reply(wait)
            try {
                let res = await playlistRadiobox(inputs)
                let teks = res.map((item, index) => {
    return `🔍 *[ RESULT ${index + 1} ]*

📢 *title:* ${item.trackTitle}
🌐 *url:* ${item.trackHref}
🎧 *time:* ${item.time}
`
}).filter(v => v).join("\n\n________________________\n\n")

await m.reply(teks)

            } catch (e) {
                await m.reply(eror)
            }
        }

        
    }
}
handler.help = ["radiobox"]
handler.tags = ["internet"]
handler.command = /^(radiobox)$/i
export default handler

/* New Line */
async function searchRadiobox(q) {
  try {
    const response = await fetch('https://onlineradiobox.com/search?q=' + q)
    const body = await response.text()
    const $ = cheerio.load(body)
    
    const stations = $('#stations .stations__station').map((index, element) => {
      const tags = $(element).find('.stations__station__tags a').map((index, tagElement) => $(tagElement).text()).get()
      
      return {
        href: 'https://onlineradiobox.com' + $(element).find('.stations__station__title a').attr('href'),
        title: $(element).find('.station__title__name').text(),
        logo: 'https:' + $(element).find('.station__title__logo').attr('src'),
        tags: tags,
        info: $(element).find('.stations__station__info').text().trim().split('\n'),
        metric: {
          listeners: parseInt($(element).find('.stations__station__metric .i-listeners').text()),
          chart: parseInt($(element).find('.stations__station__metric .i-chart').text())
        },
        stream: $(element).find('button.b-play').attr('stream')
      }
    }).get()

    return stations
  } catch (error) {
    console.log(error)
    return []
  }
}

async function playlistRadiobox(url) {
  const response = await fetch(url.endsWith('/playlist') ? url : url + '/playlist') // Ganti URL dengan URL sumber data Anda
  const html = await response.text()
  
  const $ = cheerio.load(html)
  
  const results = []
  
  $('section.playlist table.tablelist-schedule tbody tr').each((index, element) => {
    const time = $(element).find('.tablelist-schedule__time .time--schedule').text()
    const trackLink = $(element).find('.track_history_item a.ajax')
    const trackHref = 'https://onlineradiobox.com' + trackLink.attr('href')
    const trackTitle = trackLink.text()
    
    const resultObj = {
      time,
      trackHref,
      trackTitle
    }
    
    // Filter objek untuk menghilangkan properti dengan nilai null, kosong, atau undefined
    const filteredResultObj = Object.fromEntries(
      Object.entries(resultObj).filter(([_, value]) => value !== null && value !== '' && value !== undefined)
    )
    
    if (Object.keys(filteredResultObj).length > 0) {
      results.push(filteredResultObj)
    }
  })
  
  return results
}