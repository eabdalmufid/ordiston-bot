import fetch from 'node-fetch'
let handler = async (m, { conn, isOwner, usedPrefix, command, args }) => {
	let query = "input text\nEx. .logo naruto\n<command> <tex>"
	let text
	if (args.length >= 1) {
		text = args.slice(0).join(" ")
	} else if (m.quoted && m.quoted.text) {
		text = m.quoted.text
	} else throw query
	
  let urut = text.split`|`
  let one = urut[0]
  let two = urut[1]
  let three = urut[2]
  
  if (command == "logo") {
  let res = ["kaneki", "lolimaker", "girlneko", "rem", "sadboy"]
  let spas = "                "
    let listSections = []
    Object.keys(res).map((v, index) => {
	listSections.push([spas + "[ RESULT " + ++index + " ]", [
          [res[v].toUpperCase(), usedPrefix + command + "get " + res[v] + "|" + text, ""]
        ]])
        })
	return conn.sendList(m.chat, htki + " 📺 Logo Maker 🔎 " + htka, `⚡ Silakan pilih Model di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "M O D E L", listSections, m)
	}
	
	if (command == "logoget") {
	let res = await Logo(one, two)
	await conn.sendFile(m.chat, res, 'logo.jpg', `Sudah Jadi`, m, false)
	}
}
handler.help = ['logo'].map(v => v + ' <text>')
handler.tags = ['maker']
handler.command = ["logo", "logoget"]

export default handler
function Logo(efek, teks1, teks2) {
    try {
    if (efek == "kaneki") {
        return "https://api.caliph.biz.id/api/kaneki?nama=" + teks1 + "&apikey=caliphkey"
        } else if (efek == "lolimaker") {
        return "https://api.caliph.biz.id/api/lolimaker?nama=" + teks1 + "&nama2=" + teks2 + "&apikey=caliphkey"
        } else if (efek == "girlneko") {
        return "https://api.caliph.biz.id/api/girlneko?nama=" + teks1 + "&nama2=" + teks2 + "&apikey=caliphkey"
        } else if (efek == "rem") {
        return "https://api.caliph.biz.id/api/rem?nama=" + teks1 + "&apikey=caliphkey"
        } else if (efek == "sadboy") {
        return "https://api.caliph.biz.id/api/sadboy?nama=" + teks1 + "&nama2=" + teks2 + "&apikey=caliphkey"
        }
    } catch (e) {
        throw eror
    }
}