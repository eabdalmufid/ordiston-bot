import cp from 'child_process'
import { promisify } from 'util'
let exec = promisify(cp.exec).bind(cp)
let handler = async (m, {text, usedPrefix, command}) => {
    if (!text) throw `Contoh :\n${usedPrefix + command} abc@example.com`
    if(!isMail(text)) throw `INVALID EMAIL`
	await conn.reply(m.chat, wait, m)
    let email = text
    let o
    try {
        o = await exec(`python py/Infoga/infoga.py --info ${email} --breach -v 3`)
    } catch (e) {
        o = e
    } finally {
        let { stdout, stderr } = o
        if (stdout.trim()) m.reply(stdout)
        if (stderr.trim()) m.reply(stderr)
    }
}
handler.help = ['osintmail']
handler.tags = ['python','sptools']
handler.command = /^(osintmail)$/i

export default handler

const isMail = (text) => {
    return text.match(new RegExp(/^(?:(?!.*?[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9.+!%-]{1,64}|)|\"[a-zA-Z0-9.+!% -]{1,64}\")@[a-zA-Z0-9][a-zA-Z0-9.-]+(.[a-z]{2,}|.[0-9]{1,})$/, 'gi'))
  }
