import fetch from "node-fetch"
import moment from "moment-timezone"

    let handler = async(m, { conn, usedPrefix, text, args, command }) => {
        const month = args[0];
        const year = args[1];
        if (!month || !year) return m.reply("Usage: 4 2020")
		try {
			const data = await(await fetch("https://www.google.com/doodles/json/" + year + "/" + month)).json()
			if (!data.length) return m.reply("Could not find any results.");
			let listSections = []
        Object.values(data).map((v, index) => {
            listSections.push(["Num. " + ++index, [
                [moment.utc(v.run_date_array.join("-")).format("Do MMMM, YYYY"), usedPrefix + "fetchsticker https:" + v.url + " wsf", v.share_text]
            ]])
        })
        return conn.sendList(m.chat, htki + " Google Doodle " + htka, "⚡ Silakan pilih rilis yang anda mau.", author, "[ Doodle ]", listSections, m)
		} catch (e) {
			throw eror
		}
	}
handler.command = ["gd", "doodle"],
handler.tags = ["internet"]

export default handler