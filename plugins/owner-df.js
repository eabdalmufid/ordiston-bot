import { tmpdir } from 'os'
import path, { join } from 'path'
import {
  readdirSync,
  statSync,
  unlinkSync,
  existsSync,
  readFileSync,
  watch
} from 'fs'
let handler = async (m, { conn, usedPrefix: _p, __dirname, args, text }) => {

let ar = Object.keys(plugins)
let ar1 = ar.map(v => v.replace('.js', ''))
let spas = "                "
    let listSections = []
    Object.keys(ar1).map((v, index) => {
	listSections.push([spas + "[ RESULT " + ++index + " ]", [
          [ar1[v].toUpperCase(), "/df " + ar1[v], "To Deleted"]
        ]])
        })
	if (!text) return conn.sendList(m.chat, "*[ REMOVE PLUGINS ]*", "⚡ Silakan pilih PLUGINS yang ingin di hapus...", author, "SELECT", listSections, m)
    if (!ar1.includes(args[0])) return m.reply(`*🗃️ NOT FOUND!*\n==================================\n\n${ar1.map(v => ' ' + v).join`\n`}`)
const file = join(__dirname, '../plugins/' + args[0] + '.js')
unlinkSync(file)
conn.reply(m.chat, `Succes deleted "plugins/${args[0]}.js"`, m)
    
}
handler.help = ['df']
handler.tags = ['owner']
handler.command = /^(df)$/i
handler.owner = true

export default handler
