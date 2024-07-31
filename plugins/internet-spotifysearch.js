import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) throw '❌ *Spotify Search* ❌\n\nSilakan masukkan kata kunci untuk mencari lagu di Spotify.';
  try {
    let json = await searchSpotifyTracks(text);
    if (json.length < 1) throw '❌ *Spotify Search* ❌\n\nTidak ada hasil ditemukan.';
    let ini_txt = '✨ *Spotify Search* ✨';
    for (const x of json) {
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
  } catch (e) {
    throw '❌ *Spotify Search* ❌\n\nTerjadi Kesalahan, Coba Lagi Nanti.';
  }
};

handler.help = ['spotifysearch'];
handler.tags = ['downloader'];
handler.command = /^spotifysearch$/i;
handler.limit = true;
export default handler;

async function searchSpotifyTracks(query) {
  const clientId = 'acc6302297e040aeb6e4ac1fbdfd62c3';
  const clientSecret = '0e8439a1280a43aba9a5bc0a16f3f009';
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const getToken = async () => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      timeout: 60000, // 60 seconds
      body: new URLSearchParams({ grant_type: 'client_credentials' }),
      headers: { Authorization: `Basic ${auth}` },
    });
    return (await response.json()).access_token;
  };

  const accessToken = await getToken();
  const offset = 10;
  const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&offset=${offset}`;
  const response = await fetch(searchUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await response.json();
  return data.tracks.items;
}