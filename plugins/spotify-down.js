import SpotifyAPI from '../lib/spotify-down.js'
import fetch from 'node-fetch'

let handler = async(m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, 'Harap Masukan Query', m)

  await m.reply('Searching...')
    const spotify = await SpotifyAPI();
    var json = await spotify.trackSearch(text);
    let ini_txt = '✨ *Spotify Search* ✨';
    for (const x of json.tracks.items) {
      ini_txt += `
      
🎵 *Judul:* ${x.name}
👥 *Artis:* ${x.artists.map(v => v.name).join(', ')}
👥 *Artis Album:* ${x.album.artists.map(v => v.name).join(', ')}
🆔 *ID:* ${x.id}
📅 *Tanggal Rilis Album:* ${x.album.release_date}
🆔 *ID Album:* ${x.album.id}
🎵 *Jumlah Trek Album:* ${x.album.total_tracks}
🔢 *Nomor Trek:* ${x.album.track_number}
⏳ *Durasi:* ${x.duration_ms} ms
🔗 *Uri:* ${x.uri}
🎵 *URL Album*: ${x.album.external_urls.spotify}
🔗 *URL:* ${x.external_urls.spotify}
${x.preview_url ? `🎧 *Direct URL:* ${x.preview_url}` : ''}
───────────────────`;
    }
    m.reply(ini_txt);
}
handler.help = ['spotif'].map(v => v + ' <query>')
handler.tags = ['tools']
handler.command = /^(spotif)$/i
handler.owner = false
handler.exp = 0
handler.limit = true

export default handler