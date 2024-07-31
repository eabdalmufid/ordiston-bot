import fetch from 'node-fetch'
let timeout = 120000
let poin = 4999
let handler = async (m, { conn, args, command, usedPrefix }) => {
let imgr = flaaa

    conn.trivias = conn.trivias ? conn.trivias : {}
    let id = m.chat
    if (id in conn.trivias) {
        conn.sendButton(m.chat, 'Masih ada soal belum terjawab di chat ini', author, null, buttons, conn.trivias[id][0])
        throw false
    }
    let res = ["easy", "medium", "hard"]
    let Reg = /(medium|easy|hard)/i
    let spas = "                "
    let listSections = []
    Object.keys(res).map((v, index) => {
	listSections.push(["[ " + res[v].toUpperCase() + " ]", [
          [spas + " Select...", usedPrefix + command + " " + res[v], ""]
        ]])
        })
	if (!args[0]) return conn.sendList(m.chat, htki + " 📺 L E V E L 🔎 " + htka, `⚡ Silakan pilih difficulty di tombol di bawah...`, author, "P I L I H", listSections, m)
	if (!args[0].match(Reg)) return m.reply("Tersedia:\n" + res.map(v => v).join('\n'))
    let src = await (await fetch('https://cooler-api.ay-gemuy.repl.co/game/trivia?amount=1&difficulty=' + args[0] + '&type=multiple')).json()
    let json = src.questions[0]
    let jawaban = await Tr(json.correctAnswer)
    let soal = await Tr(json.value)
    let caption = `${soal}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}htri untuk bantuan
Bonus: ${poin} XP
    `.trim()
    conn.trivias[id] = [
        await conn.sendFthumb(m.chat, `🎮 ${command.toUpperCase()} 🎮`, caption + '\n\n' + author, `${imgr + command}`, '', m),
        //await conn.sendButton(m.chat, caption, author, `${imgr + command}`, buttons, m),
        json, poin,
        setTimeout(() => {
            if (conn.trivias[id]) conn.sendButton(m.chat, `Waktu habis!\nJawabannya adalah *${jawaban}*`, author, null, [
                ['trivia', '/trivia']
            ], conn.trivias[id][0])
            delete conn.trivias[id]
        }, timeout)
    ]
}
handler.help = ['trivia']
handler.tags = ['game']
handler.command = /^trivia/i

export default handler

const buttons = [
    ['Hint', '/htri'],
    ['Nyerah', 'menyerah']
]

async function Tr(teks) {
let reis = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=id&dt=t&q=' + teks)
	let res = await reis.json()
	return res[0][0][0]
}