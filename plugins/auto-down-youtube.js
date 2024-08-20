import fg from "api-dylux"
import {
	youtubedl,
	youtubedlv2
} from "@bochilteam/scraper"
let limit = 80

export async function before(m) {
	const regex = /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[a-zA-Z0-9_-]{11}$/;
	const matches = (m.text.trim()).match(regex);
	const spas = "                ";
	if (!matches) return false;
	await m.reply(wait);

	try {
		let q = "360p"
		let v = matches[0]
		const yt = await youtubedl(v).catch(async () => await youtubedlv2(v))
		const dl_url = await yt.video[q].download()
		const title = await yt.title
		const size = await yt.video[q].fileSizeH

		if (size.split("MB")[0] >= limit) return m.reply(` ≡  *Youtube Downloader*\n\n▢ *⚖️Size* : ${size}\n▢ *🎞️quality* : ${q}\n\n▢ _The file exceeds the download limit_ *+${limit} MB*`)
		let captvid = `
 ≡  *Youtube Downloader*
  
▢ *📌Títle* : ${title}
▢ *📟 Ext* : mp4
▢ *🎞️Quality* : ${q}
▢ *⚖️Size* : ${size}
`.trim()
		let dls = "Downloading audio succes"
		let doc = {
			video: {
				url: dl_url
			},
			mimetype: "video/mp4",
			caption: captvid,
			contextInfo: {
				externalAdReply: {
					showAdAttribution: true,
					mediaType: 2,
					mediaUrl: v,
					title: title,
					body: dls,
					sourceUrl: v,
					thumbnail: await (await this.getFile(yt.thumbnail)).data
				}
			}
		}

		await this.sendMessage(m.chat, doc, {
			quoted: m,
			ephemeralExpiration: ephemeral
		})
	} catch (e) {
		await m.reply(eror)
	}

}
export const disabled = true