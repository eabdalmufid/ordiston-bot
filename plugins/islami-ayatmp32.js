
let handler = async (m, { args, usedPrefix, command }) => {
    if (!(args[0] || args[1])) throw `contoh:\n${usedPrefix + command} 1 2\n\nmaka hasilnya adalah surah Al-Fatihah ayat 2 beserta audionya, dan ayatnya 1 aja`
    if (isNaN(args[0]) || isNaN(args[1])) throw `contoh:\n${usedPrefix + command} 1 2\n\nmaka hasilnya adalah surah Al-Fatihah ayat 2 beserta audionya, dan ayatnya 1 aja`
    
let api = `https://api.lolhuman.xyz/api/quran/audio/args[0]/args[1]?apikey=${global.lolkey}`
await conn.sendFile(m.chat, api, 'quran.mp3', null, m, true, {
type: 'audioMessage', 
ptt: true 
})

}

handler.help = ['ayta2'].map(v => v + ' *surah no*')
handler.tags = ['islam']
handler.command = /^(ayat(mp32|audio2)|ayta2)$/i
export default handler