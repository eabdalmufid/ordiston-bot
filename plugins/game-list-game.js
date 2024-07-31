import { readFileSync } from 'fs'
let handler = async (m, {conn, command, args, usedPrefix}) => {
let ktnya = ['\n\n\n' + htjava + ' Mungkin menu ini bermanfaat? ' + htjava,
 '\n\n\n' + htjava + ' Terimakasih sudah menggunakan bot ini ' + htjava,
 '\n\n\n' + htjava + ' Semoga gak erorr ' + htjava,
 '\n\n\n' + htjava + ' Jika lama kemungkiman erorr atau delay ' + htjava,
 '\n\n\n' + htjava + ' Menampilkan menu ' + htjava,
 '\n\n\n' + htjava + ' Wait... ' + htjava,
 '\n\n\n' + htjava + ' Dua tiga kucing berlari ' + htjava,
 '\n\n\n' + htjava + ' Bentar bang akan kutampilkan menunya ' + htjava,
 '\n\n\n' + htjava + ' Prosess... ' + htjava]
let ktx = ktnya.getRandom()
const sections = [
   {
	title: `${htki} RPG GAME ${htka}`,
	rows: [
	    {title: `${emojis} adventure`.toUpperCase(), rowId: `${usedPrefix}adventure`, description: ktx},
	    {title: `${emojis} bansos`.toUpperCase(), rowId: `${usedPrefix}bansos`, description: ktx},
	    {title: `${emojis} buy`.toUpperCase(), rowId: `${usedPrefix}buy`, description: ktx},
	    {title: `${emojis} berburu`.toUpperCase(), rowId: `${usedPrefix}berburu`, description: ktx},
	    {title: `${emojis} berdagang`.toUpperCase(), rowId: `${usedPrefix}berdagang`, description: ktx},
	    {title: `${emojis} berkebon`.toUpperCase(), rowId: `${usedPrefix}berkebon`, description: ktx},
	    {title: `${emojis} bet`.toUpperCase(), rowId: `${usedPrefix}bet`, description: ktx},
	    {title: `${emojis} build`.toUpperCase(), rowId: `${usedPrefix}build`, description: ktx},
	    {title: `${emojis} casino`.toUpperCase(), rowId: `${usedPrefix}casino`, description: ktx},
	    {title: `${emojis} cek`.toUpperCase(), rowId: `${usedPrefix}cek`, description: ktx},
	    {title: `${emojis} chop`.toUpperCase(), rowId: `${usedPrefix}chop`, description: ktx},
	    {title: `${emojis} collect`.toUpperCase(), rowId: `${usedPrefix}collect`, description: ktx},
	    {title: `${emojis} cook`.toUpperCase(), rowId: `${usedPrefix}cook`, description: ktx},
	    {title: `${emojis} cooldown`.toUpperCase(), rowId: `${usedPrefix}cooldown`, description: ktx},
	    {title: `${emojis} craft`.toUpperCase(), rowId: `${usedPrefix}craft`, description: ktx},
	    {title: `${emojis} daily`.toUpperCase(), rowId: `${usedPrefix}daily`, description: ktx},
	    {title: `${emojis} duel`.toUpperCase(), rowId: `${usedPrefix}duel`, description: ktx},
	    {title: `${emojis} dungeon`.toUpperCase(), rowId: `${usedPrefix}dungeon`, description: ktx},
	    {title: `${emojis} eat`.toUpperCase(), rowId: `${usedPrefix}eat`, description: ktx},
	    {title: `${emojis} feed`.toUpperCase(), rowId: `${usedPrefix}feed`, description: ktx},
	    {title: `${emojis} heal`.toUpperCase(), rowId: `${usedPrefix}heal`, description: ktx},
	    {title: `${emojis} hourly`.toUpperCase(), rowId: `${usedPrefix}hourly`, description: ktx},
	    {title: `${emojis} hunt`.toUpperCase(), rowId: `${usedPrefix}hunt`, description: ktx},
	    {title: `${emojis} inventory`.toUpperCase(), rowId: `${usedPrefix}inventory`, description: ktx},
	    {title: `${emojis} kandang`.toUpperCase(), rowId: `${usedPrefix}kandang`, description: ktx},
	    {title: `${emojis} kerja`.toUpperCase(), rowId: `${usedPrefix}kerja`, description: ktx},
	    {title: `${emojis} koboy`.toUpperCase(), rowId: `${usedPrefix}koboy`, description: ktx},
	    {title: `${emojis} kolam`.toUpperCase(), rowId: `${usedPrefix}kolam`, description: ktx},
	    {title: `${emojis} leaderboard`.toUpperCase(), rowId: `${usedPrefix}leaderboard`, description: ktx},
	    {title: `${emojis} mancing`.toUpperCase(), rowId: `${usedPrefix}mancing`, description: ktx},
	    {title: `${emojis} mentransfer`.toUpperCase(), rowId: `${usedPrefix}mentransfer`, description: ktx},
	    {title: `${emojis} merampok`.toUpperCase(), rowId: `${usedPrefix}merampok`, description: ktx},
	    {title: `${emojis} mining`.toUpperCase(), rowId: `${usedPrefix}mining`, description: ktx},
	    {title: `${emojis} mission`.toUpperCase(), rowId: `${usedPrefix}mission`, description: ktx},
	    {title: `${emojis} monthly`.toUpperCase(), rowId: `${usedPrefix}monthly`, description: ktx},
	    {title: `${emojis} nabung`.toUpperCase(), rowId: `${usedPrefix}nabung`, description: ktx},
	    {title: `${emojis} nambang`.toUpperCase(), rowId: `${usedPrefix}nambang`, description: ktx},
	    {title: `${emojis} nebang`.toUpperCase(), rowId: `${usedPrefix}nebang`, description: ktx},
	    {title: `${emojis} ngocok`.toUpperCase(), rowId: `${usedPrefix}ngocok`, description: ktx},
	    {title: `${emojis} nguli`.toUpperCase(), rowId: `${usedPrefix}nguli`, description: ktx},
	    {title: `${emojis} ojek`.toUpperCase(), rowId: `${usedPrefix}ojek`, description: ktx},
	    {title: `${emojis} open-crate`.toUpperCase(), rowId: `${usedPrefix}opencrate`, description: ktx},
	    {title: `${emojis} open`.toUpperCase(), rowId: `${usedPrefix}open`, description: ktx},
	    {title: `${emojis} pasar`.toUpperCase(), rowId: `${usedPrefix}pasar`, description: ktx},
	    {title: `${emojis} petstore`.toUpperCase(), rowId: `${usedPrefix}petstore`, description: ktx},
	    {title: `${emojis} pointxp`.toUpperCase(), rowId: `${usedPrefix}pointxp`, description: ktx},
	    {title: `${emojis} profile`.toUpperCase(), rowId: `${usedPrefix}profile`, description: ktx},
	    {title: `${emojis} ramuan`.toUpperCase(), rowId: `${usedPrefix}ramuan`, description: ktx},
	    {title: `${emojis} repair`.toUpperCase(), rowId: `${usedPrefix}repair`, description: ktx},
	    {title: `${emojis} rob`.toUpperCase(), rowId: `${usedPrefix}rob`, description: ktx},
	    {title: `${emojis} roket`.toUpperCase(), rowId: `${usedPrefix}roket`, description: ktx},
	    {title: `${emojis} sell`.toUpperCase(), rowId: `${usedPrefix}sell`, description: ktx},
	    {title: `${emojis} shopfish`.toUpperCase(), rowId: `${usedPrefix}shopfish`, description: ktx},
	    {title: `${emojis} shop`.toUpperCase(), rowId: `${usedPrefix}shop`, description: ktx},
	    {title: `${emojis} slect-skill`.toUpperCase(), rowId: `${usedPrefix}slectskill`, description: ktx},
	    {title: `${emojis} slot`.toUpperCase(), rowId: `${usedPrefix}slot`, description: ktx},
	    {title: `${emojis} tarik`.toUpperCase(), rowId: `${usedPrefix}tarik`, description: ktx},
	    {title: `${emojis} taxy`.toUpperCase(), rowId: `${usedPrefix}taxy`, description: ktx},
	    {title: `${emojis} toko`.toUpperCase(), rowId: `${usedPrefix}toko`, description: ktx},
	    {title: `${emojis} transfer`.toUpperCase(), rowId: `${usedPrefix}transfer`, description: ktx},
	    {title: `${emojis} upgrade`.toUpperCase(), rowId: `${usedPrefix}upgrade`, description: ktx},
	    {title: `${emojis} use`.toUpperCase(), rowId: `${usedPrefix}use`, description: ktx},
	    {title: `${emojis} weekly`.toUpperCase(), rowId: `${usedPrefix}weekly`, description: ktx},
	    {title: `${emojis} work`.toUpperCase(), rowId: `${usedPrefix}work`, description: ktx}
	]
    },{
	title: `${htki} Non-RPG GAME ${htka}`,
	rows: [
	    {title: `${emojis} asahotak`.toUpperCase(), rowId: `${usedPrefix}asahotak`, description: ktx},
	    {title: `${emojis} caklontong`.toUpperCase(), rowId: `${usedPrefix}caklontong`, description: ktx},
	    {title: `${emojis} family100`.toUpperCase(), rowId: `${usedPrefix}family100`, description: ktx},
	    {title: `${emojis} fight`.toUpperCase(), rowId: `${usedPrefix}fight`, description: ktx},
	    {title: `${emojis} gombal`.toUpperCase(), rowId: `${usedPrefix}gombal`, description: ktx},
	    {title: `${emojis} math`.toUpperCase(), rowId: `${usedPrefix}math`, description: ktx},
	    {title: `${emojis} siapakahaku`.toUpperCase(), rowId: `${usedPrefix}siapakahaku`, description: ktx},
	    {title: `${emojis} slot`.toUpperCase(), rowId: `${usedPrefix}slot`, description: ktx},
	    {title: `${emojis} suitpvp`.toUpperCase(), rowId: `${usedPrefix}suitpvp`, description: ktx},
	    {title: `${emojis} susunkata`.toUpperCase(), rowId: `${usedPrefix}susunkata`, description: ktx},
	    {title: `${emojis} tebakan`.toUpperCase(), rowId: `${usedPrefix}tebakan`, description: ktx},
	    {title: `${emojis} tebakanime`.toUpperCase(), rowId: `${usedPrefix}tebakanime`, description: ktx},
	    {title: `${emojis} tebakbendera`.toUpperCase(), rowId: `${usedPrefix}tebakbendera`, description: ktx},
	    {title: `${emojis} tebakchara`.toUpperCase(), rowId: `${usedPrefix}tebakchara`, description: ktx},
	    {title: `${emojis} tebakgambar`.toUpperCase(), rowId: `${usedPrefix}tebakgambar`, description: ktx},
	    {title: `${emojis} tebakjenaka`.toUpperCase(), rowId: `${usedPrefix}tebakjenaka`, description: ktx},
	    {title: `${emojis} tebakkabupaten`.toUpperCase(), rowId: `${usedPrefix}tebakkabupaten`, description: ktx},
	    {title: `${emojis} tebakkalimat`.toUpperCase(), rowId: `${usedPrefix}tebakkalimat`, description: ktx},
	    {title: `${emojis} tebakkata`.toUpperCase(), rowId: `${usedPrefix}tebakkata`, description: ktx},
	    {title: `${emojis} tebakkimia`.toUpperCase(), rowId: `${usedPrefix}tebakkimia`, description: ktx},
	    {title: `${emojis} tebaklagu`.toUpperCase(), rowId: `${usedPrefix}tebaklagu`, description: ktx},
	    {title: `${emojis} tebaklirik`.toUpperCase(), rowId: `${usedPrefix}tebaklirik`, description: ktx},
	    {title: `${emojis} tebaklogo`.toUpperCase(), rowId: `${usedPrefix}tebaklogo`, description: ktx},
	    {title: `${emojis} tebaksiapa`.toUpperCase(), rowId: `${usedPrefix}tebaksiapa`, description: ktx},
	    {title: `${emojis} tebakumur`.toUpperCase(), rowId: `${usedPrefix}tebakumur`, description: ktx},
	    {title: `${emojis} tekateki`.toUpperCase(), rowId: `${usedPrefix}tekateki`, description: ktx},
	    {title: `${emojis} tictactoe`.toUpperCase(), rowId: `${usedPrefix}tictactoe`, description: ktx}
	]
	}
]

let tek = `*Hai ${conn.getName(m.sender)}* 👋
Silahkan Pilih Game Disini
`
const listMessage = {
  text: tek,
  footer: '📮 *Note:* Jika menemukan bug, error atau kesulitan dalam penggunaan silahkan laporkan/tanyakan kepada Owner',
  mentions: await conn.parseMention(tek),
  title: `${htki} *LIST MENU* ${htka}`,
  buttonText: `CLICK HERE ⎙`,
  sections
}
  	return conn.sendMessage(m.chat, listMessage, {quoted: fakes, ephemeralExpiration: ephemeral})
                }
///AKSJDDJ
handler.help = ['game']
handler.tags = ['rpg']
handler.command = /^gam(es|ing|e)$/i 

export default handler