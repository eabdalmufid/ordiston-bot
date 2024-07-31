
import fetch from "node-fetch"
let handler = async (m, {
    text,
    command,
    usedPrefix,
    conn
}) => {

var salah_input = "*Example:*\n" + usedPrefix + command + " cyberpunk \n*[ Menampilkan list gambar cyberpunk ]*\n"
if (!text) throw salah_input
await m.reply(wait)
try {
    let arti = await searchArtworks(text)
    let arrd = arti[Math.floor(Math.random() * arti.length)]
    await conn.sendFile(m.chat, "https://www.artic.edu/iiif/2/" + arrd.image + "/full/843,/0/default.jpg", arrd.id, "*[ Result ]*\n" + arrd.title, m)
    } catch (e) {
    throw eror
    }
}
handler.help = ["artic"]
handler.tags = ["internet"]
handler.command = ["artic"]

export default handler

async function searchArtworks(keyWord) {
  let res = await fetch("https://api.artic.edu/api/v1/artworks/search?q=" + keyWord)
  let data = await res.json()
  let artworks = data.data

  let artworksWithDetails = []

  for (let artwork of artworks) {
    let res = await fetch("https://api.artic.edu/api/v1/artworks/" + artwork.id)
    let data = await res.json()
    let artworkWithDetails = data.data

    artworksWithDetails.push({
      id: artwork.id,
      title: artwork.title,
      image: artworkWithDetails.image_id,
      artist_title: artworkWithDetails.artist_title,
      date_display: artworkWithDetails.date_display
    })
  }

  return artworksWithDetails
}
