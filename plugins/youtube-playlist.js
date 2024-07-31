
import fetch from "node-fetch"
let handler = async (m, {
    conn,
    args,
    isPrems,
    isOwner,
    usedPrefix,
    command
}) => {
    if (!args || !args[0]) throw `✳️ Example :\n${usedPrefix + command} youtube link (playlist)`
    await conn.reply(m.chat, wait, m)
    
    try {
        let q = args[1] || "360"
        let v = args[0]
        let item = await YoutubePlaylist(v)
        let cap = `🔍 *[ RESULT ]*
📝 Link: ${item.download_url || 'Tidak diketahui'}
`
                await m.reply(cap)
    } catch {
            await m.reply(eror)
    }

}
handler.help = ["playlist", "v", ""].map(v => "yt" + v + ` <url> <without message>`)
handler.tags = ["downloader"]
handler.command = /^y(outube(playlist|playlistdl)|t((playlist)|playlistdl))$/i

handler.exp = 0
handler.register = false
handler.limit = true

export default handler

async function shortUrl(url) {
    let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`)
    return await res.text()
}

async function YoutubePlaylist(url, format) {
  try {
      const downloadData = await(await fetch(`https://loader.to/ajax/download.php?format=${format}&url=${url}`)).json();
      const progressData = await(await fetch(`https://loader.to/ajax/progress.php?id=${downloadData.id}`)).json();
      return progressData;
  } catch (error) {
    return { error: error.message };
  }
}