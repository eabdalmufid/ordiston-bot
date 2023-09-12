let handler = async (m, { conn }) => {
let info = `
*━━━━━━▢  INFO BOT  ▢━━━━━━*
`
const sections = [
   {
	title: `✃ STATS`,
	rows: [
	    {title: "📊 Test Speed", rowId: '.testspeed', description: '╰► Test Speed Ordiston BOT' },
	    {title: "📉 Stats Server", rowId: '.statserver', description: '╰► Status server BOT' },
	{title: "💰 Donasi", rowId: '.donasi', description: '╰► Support Ordiston Agar on 24 Jam' },
	]
    }, {
    title: `✃ INFO`,
	rows: [
	    {title: "📖 Rules", rowId: '.rules', description: '╰► S&K Ordiston BOT' },
	{title: "⚡ Speed", rowId: '.speed', description: '╰► Speed Ordiston BOT' },
	{title: "💵 Sewa BOT", rowId: '.sewa', description: '╰► Sewa Ordiston BOT' },
	{title: "🌏 Lokasi BOT", rowId: '.loc2', description: '╰► Lokasi Ordiston BOT' },
	]
    },
]

const listMessage = {
  text: ' ',
  footer: info,
  title: null,
  buttonText: "Click Here!",
  sections
}
await conn.sendMessage(m.chat, listMessage, { quoted: m})
//conn.sendHydrated(m.chat, info, wm, null, sgc, "🌎 Group Official", null,null, [['Owner','.owner']], m)
}

handler.help = ['info', 'infobot']
handler.tags = ['info']
handler.command = /^(info|infobot)$/i

export default handler
