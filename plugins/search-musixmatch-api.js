import axios from "axios"
import fetch from "node-fetch"
import cheerio from "cheerio"
import got from "got"
const API_KEY = "46a908cae9e6fe663a1fe8ef339f08f6";


let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {

    let lister = [
        "search",
        "top",
        "lyrics",
        "track"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.mm search|adel\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .mm search|hello")
            await m.reply(wait)
            try {
                // Contoh penggunaan:
                let res = await Search(inputs)
                let teks = res.map((v, index) => {
                    return `*乂 Search ${index + 1} 乂*
*track_id:* ${v.track.track_id}
*commontrack_id:* ${v.track.commontrack_id}
*track_name:* ${v.track.track_name}
*track_rating:* ${v.track.track_rating}
*has_lyrics:* ${v.track.has_lyrics}
*artist_name:* ${v.track.artist_name}
*updated_time:* ${v.track.updated_time}
*track_share_url:* ${v.track.track_share_url}
`.trim()
                }).filter(v => v).join("\n\n________________________\n\n")
                await conn.reply(m.chat, teks, m, adReply)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "top") {
            if (!inputs) return m.reply("Input query link\nExample: .mm search|hello")
            await m.reply(wait)
            try {
                let res = await Top()
                let teks = res.map((v, index) => {
                    return `*乂 Top ${index + 1} 乂*
*track_id:* ${v.track.track_id}
*commontrack_id:* ${v.track.commontrack_id}
*track_name:* ${v.track.track_name}
*track_rating:* ${v.track.track_rating}
*has_lyrics:* ${v.track.has_lyrics}
*artist_name:* ${v.track.artist_name}
*updated_time:* ${v.track.updated_time}
*track_share_url:* ${v.track.track_share_url}
`.trim()
                }).filter(v => v).join("\n\n________________________\n\n")
                await conn.reply(m.chat, teks, m, adReply)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "lyrics") {
            if (!inputs) return m.reply("Input query link\nExample: .mm search|hello")

            await m.reply(wait)
            try {
                let res = await Lyrics(inputs)
                let teks = `*乂 Lirik 乂*
${res.lyrics_body ? res.lyrics_body : 'Tidak diketahui'}

*乂 Copyright 乂*
${res.lyrics_copyright ? res.lyrics_copyright : 'Tidak diketahui'}

*乂 Update 乂*
${res.updated_time ? res.updated_time : 'Tidak diketahui'}

_By musixmatch_
`

                await conn.reply(m.chat, teks, m, adReply)
            } catch (e) {
                await m.reply(eror)
            }
        }
        if (feature == "track") {
            if (!inputs) return m.reply("Input query link\nExample: .mm search|hello")
            await m.reply(wait)
            try {
                let res = await Track(inputs)
                let teks = `*乂 Track 乂*
*track_id:* ${res.track_id}
*commontrack_id:* ${res.commontrack_id}
*track_name:* ${res.track_name}
*album_id:* ${res.album_id}
*album_name:* ${res.album_name}
*artist_name:* ${res.artist_name}
*updated_time:* ${res.updated_time}
*track_share_url:* ${res.track_share_url}
`
                await conn.reply(m.chat, teks, m, adReply)
            } catch (e) {
                await m.reply(eror)
            }
        }

    }
}
handler.help = ["mm type query"]
handler.tags = ["internet"]
handler.command = /^(mm)$/i
export default handler

/* New Line */
async function Search(QUERY) {
    const SEARCH_URL = "https://api.musixmatch.com/ws/1.1/track.search?q_track=" + QUERY + "&page_size=10&page=1&s_track_rating=desc&apikey=" + API_KEY;
    const response = await fetch(SEARCH_URL);
    const data = await response.json();
    const {
        track_list
    } = data.message.body;
    return track_list;
}

async function Top() {
    const TOP_TEN_SONGS_URL = "https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=ind&f_has_lyrics=1&apikey=" + API_KEY;
    const response = await fetch(TOP_TEN_SONGS_URL);
    const data = await response.json();
    const {
        track_list
    } = data.message.body;
    return track_list;
}

async function Lyrics(TRACK_ID) {
    const FETCH_LYRICS_URL = "https://api.musixmatch.com/ws/1.1/track.lyrics.get?commontrack_id=" + TRACK_ID + "&apikey=" + API_KEY;
    const response = await fetch(FETCH_LYRICS_URL);
    const data = await response.json();
    const {
        lyrics
    } = data.message.body;
    return lyrics;
}

async function Track(TRACK_ID) {
    const FETCH_TRACK_URL = "https://api.musixmatch.com/ws/1.1/track.get?commontrack_id=" + TRACK_ID + "&apikey=" + API_KEY;
    const response = await fetch(FETCH_TRACK_URL);
    const data = await response.json();
    const {
        track
    } = data.message.body;
    return track;
}