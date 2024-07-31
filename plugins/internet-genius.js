import axios from "axios"
import fetch from "node-fetch"
import cheerio from "cheerio"
import Genius from "genius-lyrics"

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
let key = "h6fTn1BYNjYi5VTszhyAFTcM3WWtk2E4hqrXCcutfObE4jVFnJ3LVyewHKIYTli7"
// GaXTYV3DtHSYpUqMrNjOO7sgHm-dFUmYRLWY2Pg4UPhD4gvYLkXS28EoAV0SUeje
// 6ggSONbH0WJb2wy9gkzjE80kWTpPn5N_CeKVQoAcSdfrGaMXQHFZ4ocksApJGdCY
let Client = new Genius.Client(key)


    let lister = [
        "search",
        "module",
        "lyrics",
        "lyricsv2",
        "getartist",
        "getsong",
        "annotation",
        "referent"
    ]
    
    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.genius search|adel\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "module") {
            if (!inputs) return m.reply("Input query link\nExample: .genius search|hello")
            await m.reply(wait)
            try {
                // Contoh penggunaan:
                let res = await Client.songs.search(inputs)
                let teks = res.map((v, index) => {
                    return `Result: ${index + 1}
*fullTitle:* ${v.fullTitle}
*featuredTitle:* ${v.featuredTitle}
*thumbnail:* ${v.thumbnail}
*id:* ${v.id}
*title:* ${v.title}
*url:* ${v.url}
`.trim()
                }).filter(v => v).join("\n\n________________________\n\n")
                await conn.reply(m.chat, teks, m, adReply)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .genius search|hello")
            await m.reply(wait)
            try {
                let res = await search(inputs)
                let teks = Object.values(res.response.hits).map((v, index) => {
                    return `Result: ${index + 1}
*annotation_count:* ${v.result.annotation_count}
*api_path:* ${v.result.api_path}
*artist_names:* ${v.result.artist_names}
*full_title:* ${v.result.full_title}
*header_image_thumbnail_url:* ${v.result.header_image_thumbnail_url}
*header_image_url:* ${v.result.header_image_url}
*id:* ${v.result.id}
*language:* ${v.result.language}
*lyrics_owner_id:* ${v.result.lyrics_owner_id}
*lyrics_state:* ${v.result.lyrics_state}
*path:* ${v.result.path}
*pyongs_count:* ${v.result.pyongs_count}
*relationships_index_url:* ${v.result.relationships_index_url}
*release_date_for_display:* ${v.result.release_date_for_display}
*release_date_with_abbreviated_month_for_display:* ${v.result.release_date_with_abbreviated_month_for_display}
*song_art_image_thumbnail_url:* ${v.result.song_art_image_thumbnail_url}
*song_art_image_url:* ${v.result.song_art_image_url}
*title:* ${v.result.title}
*title_with_featured:* ${v.result.title_with_featured}
	`.trim()
                }).filter(v => v).join("\n\n________________________\n\n")
                await conn.reply(m.chat, teks, m, adReply)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "lyrics") {
            if (!inputs) return m.reply("Input query link\nExample: .genius search|hello")
            if (!inputs_) return m.reply("Input query link\nExample: .genius search|hello")
            await m.reply(wait)
            try {
                let song = await Client.songs.search(inputs)
                let teks = await song[inputs_].lyrics()
                await conn.reply(m.chat, teks, m, adReply)
            } catch (e) {
                await m.reply(eror)
            }
        }
        if (feature == "lyricsv2") {
            if (!inputs) return m.reply("Input query link\nExample: .genius search|hello")
            await m.reply(wait)
            try {
                let teks = await getLyrics(inputs)
                await conn.reply(m.chat, teks, m, adReply)
            } catch (e) {
                await m.reply(eror)
            }
        }
        if (feature == "getartist") {
            if (!inputs) return m.reply("Input query link\nExample: .genius search|hello")
            await m.reply(wait)
            try {
                let teks = await getArtist(inputs)
                await conn.reply(m.chat, teks, m, adReply)
            } catch (e) {
                await m.reply(eror)
            }
        }
        if (feature == "getsong") {
            if (!inputs) return m.reply("Input query link\nExample: .genius search|hello")
            
            await m.reply(wait)
            try {
                let teks = await getSong(inputs)
                await conn.reply(m.chat, teks, m, adReply)
            } catch (e) {
                await m.reply(eror)
            }
        }
        if (feature == "annotation") {
            if (!inputs) return m.reply("Input query link\nExample: .genius search|hello")
            
            await m.reply(wait)
            try {
                let teks = await getAnnotation(inputs)
                await conn.reply(m.chat, teks, m, adReply)
            } catch (e) {
                await m.reply(eror)
            }
        }
        if (feature == "referent") {
            if (!inputs) return m.reply("Input query link\nExample: .genius search|hello")
            
            await m.reply(wait)
            try {
                let teks = await getSongReferents(inputs)
                await conn.reply(m.chat, teks, m, adReply)
            } catch (e) {
                await m.reply(eror)
            }
        }

    }
}
handler.help = ["genius type query"]
handler.tags = ["internet"]
handler.command = /^(genius)$/i
export default handler

/* New Line */
const BASE_URL = "https://api.genius.com";
const ACCESS_TOKEN = "5A3jmNtHiCmWSmKZYfoM_T5seFaHnZiTwzIxCsHJqF7JXauBIDLocGmo9wFFzLNX";

async function search(query) {
  const response = await fetch(`${BASE_URL}/search?access_token=${ACCESS_TOKEN}&q=${query}`);
  return await response.json();
}

async function getArtist(artistId) {
  const response = await fetch(`${BASE_URL}/artists/${artistId}?access_token=${ACCESS_TOKEN}`);
  return await response.json();
}

async function getSong(songId) {
  const response = await fetch(`${BASE_URL}/songs/${songId}?access_token=${ACCESS_TOKEN}`);
  return await response.json();
}

async function getAnnotation(annotationId) {
  const response = await fetch(`${BASE_URL}/annotations/${annotationId}?access_token=${ACCESS_TOKEN}`);
  return await response.json();
}

async function getSongReferents(songId) {
  const response = await fetch(`${BASE_URL}/referents/?song_id=${songId}&access_token=${ACCESS_TOKEN}`);
  return await response.json();
}

async function getLyrics(url) {
    const response = await fetch("https://files.xianqiao.wang/" + url)
    const html = await response.text()
    const $ = cheerio.load(html);
  let lyrics = '';
  $('div[class^="Lyrics__Container"]').each((i, elem) => {
    if ($(elem).text().length !== 0) {
      const snippet = $(elem)
          .html()
          .replace(/<br>/g, '\n')
          .replace(/<(?!\s*br\s*\/?)[^>]+>/gi, '');

      lyrics += $('<textarea/>').html(snippet).text().trim() + '\n\n';
    }
  });
  return lyrics;
}