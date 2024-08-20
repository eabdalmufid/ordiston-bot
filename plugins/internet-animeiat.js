import fetch from "node-fetch"
let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {

    let lister = [
        "search",
        "video",
        "slugeps",
        "slugvid",
        "getvid"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.animeiat search|naruto\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join('\n'))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query anime")
            await m.reply(wait)
            try {
            let outs = await searchAnime(inputs)
            let teks = outs.map((anime, index) => {
                return `*[ ${index + 1} ]*
*Judul:* ${anime.anime_name}
*ID:* ${anime.id}
*Slug:* ${anime.slug}
*Cerita:* ${anime.story}
*Nama lain:* ${anime.other_names}
*Total episode:* ${anime.total_episodes}
*Usia:* ${anime.age}
*Tipe:* ${anime.type}
*Status:* ${anime.status}
*Path poster:* ${anime.poster_path}
*Dipublikasikan oleh:* ${anime.published}
*Tanggal publikasi:* ${anime.published_at}
*Tahun:* ${anime.year_id}
*Dibuat pada:* ${anime.created_at}
*Diperbarui pada:* ${anime.updated_at}
   `.trim()
            }).filter(v => v).join("\n\n________________________\n\n")
            await m.reply(teks)
            } catch (e) {
            await m.reply(eror)
            }
        }

        if (feature == "video") {
            if (!inputs) return m.reply("Input query anime")
            await m.reply(wait)
            try {
            let outs = await fetchAnime(inputs, inputs_)
            const teks = outs.map((anime, index) => {
      return `*[ ${index + 1} ]*
*Quality:* ${anime.quality}
*Label:* ${anime.label}
*Link:* ${anime.file}
   `.trim()
    }).filter(v => v).join("\n\n________________________\n\n")
            await m.reply(teks)
            } catch (e) {
            await m.reply(eror)
            }
        }
        
        if (feature == "slugeps") {
            if (!inputs) return m.reply("Input query anime")
            await m.reply(wait)
            try {
            let outs = await slugEpisode(inputs)
            const teks = outs.map((anime, index) => {
      return `*[ ${index + 1} ]*
*Judul:* ${anime.anime_name}
*Slug:* ${anime.slug}
   `.trim()
    }).filter(v => v).join("\n\n________________________\n\n")
            await m.reply(teks)
            } catch (e) {
            await m.reply(eror)
            }
        }
        
        if (feature == "slugvid") {
            if (!inputs) return m.reply("Input query episode slug")
            await m.reply(wait)
            try {
            let outs = await slugVideo(inputs, inputs_)
            const teks = `*Slug:* ${outs.slug}\n*Episode:* 1 sampai ${outs.total}`
            await m.reply(teks)
            } catch (e) {
            await m.reply(eror + "\nEpisode yang anda masukkan kebanyakan!")
            }
        }
        
        if (feature == "getvid") {
            if (!inputs) return m.reply("Input query video slug")
            await m.reply(wait)
            try {
            let outs = await getVideo(inputs)
            const teks = outs.map((anime, index) => {
      return `*[ ${index + 1} ]*
*Quality:* ${anime.quality}
*Label:* ${anime.label}
*Link:* ${anime.file}
   `.trim()
    }).filter(v => v).join("\n\n________________________\n\n")
            await m.reply(teks)
            } catch (e) {
            await m.reply(eror)
            }
        }

    }
}
handler.help = ["animeiat type query"]
handler.tags = ["internet"]
handler.command = /^(animeiat)$/i
export default handler

async function searchAnime(query) {
    try {
        const response = await fetch(`https://api.animeiat.co/v1/anime?q=${query}`)
        const data = await response.json()
        return data.data
    } catch (error) {
        console.error('Terjadi kesalahan:', error)
        return null
    }
}

async function fetchAnime(query, episodes = 1) {
  try {
    const response = await fetch("https://api.animeiat.co/v1/anime?q=" + query)
    const sear = await response.json()
    const response1 = await fetch("https://api.animeiat.co/v1/episode/" + sear.data[0].slug + "-episode-" + episodes)
    const data = await response1.json()
    const slug = data.data.video.slug
    const response2 = await fetch("https://api.animeiat.co/v1/video/" + slug)
    const data2 = await response2.json()
    const source = data2.data.sources
    return source
  } catch (error) {
    console.error(error)
    return null
  }
}

async function slugEpisode(query) {
  try {
    const response = await fetch("https://api.animeiat.co/v1/anime?q=" + query)
    const sear = await response.json()
    return sear.data
  } catch (error) {
    console.error(error)
    return null
  }
}

async function slugVideo(query, episode = 1) {
  try {
    const response1 = await fetch("https://api.animeiat.co/v1/episode/" + query + "-episode-" + episode)
    const data = await response1.json()
    const slug = data.data.video.slug
    const total = data.data.anime.total_episodes
    return  { slug: slug, total: total }
  } catch (error) {
    console.error(error)
    return null
  }
}

async function getVideo(query) {
  try {
    const response2 = await fetch("https://api.animeiat.co/v1/video/" + query)
    const data2 = await response2.json()
    const source = data2.data.sources
    return source
  } catch (error) {
    console.error(error)
    return null
  }
}