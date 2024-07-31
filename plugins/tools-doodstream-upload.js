const { Doodstream } = await(await import('../lib/upload-to-dood.js'))

let handler = async (m, { args, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'No media found'
  let media = await q.download()
  let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
  const uploader = new Doodstream(media, '13527p8pcv54of4yjeryk');
  const link = isTele ? await uploader.init() : await uploader.init()
  if (link) {
  let caption = `📮 *L I N K :*
${link}

*S H O R T :* ${await shortUrl(link)}`

await m.reply(caption)
} else {
await m.reply(eror)
}
}
handler.help = ['up2dood']
handler.tags = ['tools']
handler.command = /^(up2dood)$/i
handler.limit = true
export default handler

async function shortUrl(url) {
	let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`)
	return await res.text()
}