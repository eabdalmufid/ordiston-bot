import cp, { exec as _exec } from 'child_process'
import { promisify } from 'util'
let exec = promisify(_exec).bind(cp)

let handler = async (m, { conn, isOwner, command, text }) => {
if (!text) throw "input Nomor"
  if (global.conn.user.jid != conn.user.jid) return
  m.reply('Waiting...')
  let o
  try {
    o = await exec('python3 ./py/call/call.py ' + text)
  } catch (e) {
    o = e
  } finally {
    let { stdout } = o
    await conn.reply(m.chat, '*Code:* ' + stdout, m)
  }
    }
handler.help = ['call']
handler.tags = ['info']
handler.command = ['call']
export default handler