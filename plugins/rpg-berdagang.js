const cooldown = 28800000
let handler = async(m, { conn, text, usedPrefix, command }) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  
        if (typeof global.db.data.users[who] == "undefined") {
      global.db.data.users[who] = {
        exp: 0,
        limit: 10,
        lastclaim: 0,
        lastdagang: 0,
        registered: false,
        name: conn.getName(m.sender),
        age: -1,
        regTime: -1,
        afk: -1,
        afkReason: '',
        banned: false,
        level: 0,
        lastweekly: 0,
        role: 'Warrior V',
        autolevelup: false,
        money: 0,
        pasangan: "",
      }
     }
     
  let user = global.db.data.users[who]
  let dapat = (Math.floor(Math.random() * 5000))
  if (!who) throw 'Tag salah satu lah, yang kamu ingin berdagang bareng'
  let ctimer = (new Date - user.lastdagang)
let _ctimer = (cooldown - ctimer)
let timers = clockString(_ctimer)
  if (user.lastdagang < cooldown) {
  if (4999 > user.money) throw 'Target tidak memiliki modal harap masukkan modal 5000'
  if (4999 > user.money) throw 'kamu tidak memiliki modal harap masukkan modal 5000'
  let caption = `${htki} BERDAGANG ${htka}\nMohon tunggu kak..\n@${m.sender.split("@")[0]} dan @${who.split("@")[0]} sedang berdagang.. 😅\n\n@${m.sender.split("@")[0]} dan @${who.split("@")[0]} meletakkan modal -${dapat} 😅`
  
  let _caption = `Selamat @${m.sender.split("@")[0]} dan @${who.split("@")[0]} mendapatkan money..\n\nPenghasilan dagang @${m.sender.split("@")[0]} didapatkan +5000\n${user.money += 5000} Money @${m.sender.split("@")[0]}\n\nPenghasilan dagang @${who.split("@")[0]} didapatkan +5000\n${user.money += 5000} Money @${who.split("@")[0]}`
  
  let __caption = `${htki} SUKSES ${htka}\nSelamat @${m.sender.split("@")[0]} dan @${who.split("@")[0]} mendapatkan money..\n\nPenghasilan dagang @${m.sender.split("@")[0]} didapatkan +10000\n${user.money += 10000} Money @${m.sender.split("@")[0]}\n\nPenghasilan dagang @${who.split("@")[0]} didapatkan +10000\n${user.money += 10000} Money @${who.split("@")[0]}`
  
  conn.reply(m.chat, caption + `\n` + clockString(60000), m, { mentions: conn.parseMention(caption) })
    
					setTimeout(() => {
			conn.reply(m.chat, __caption + `\n` + `SUKSES`, m, { mentions: conn.parseMention(__caption) })
		}, 10800000)

		setTimeout(() => {
			conn.reply(m.chat, _caption + `\n` + clockString(10800000), m, { mentions: conn.parseMention(_caption) })
		}, 7200000)

		setTimeout(() => {
			conn.reply(m.chat, _caption + `\n` + clockString(7200000), m, { mentions: conn.parseMention(_caption) })
		}, 3600000)

		setTimeout(() => {
			conn.reply(m.chat, _caption + `\n` + clockString(3600000), m, { mentions: conn.parseMention(_caption) })
		}, 60000)
					user.lastdagang = new Date * 1
} else conn.reply(m.chat, `Anda Sudah Berdagang tunggu\n${timers} lagi..`, m)
}
handler.help = ['berdagang'].map(v => v + ' @[tag]')
handler.tags = ['rpg']
handler.command = /^(berdagang|dagang)$/i
handler.premium = true
handler.cooldown = cooldown
export default handler 

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
	console.log({ ms, d, h, m, s })
	return [d, h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}