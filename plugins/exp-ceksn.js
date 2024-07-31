import { createHash } from 'crypto'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async (m, { text, usedPrefix, command }) => {
  let sn = createHash('md5').update(m.sender).digest('hex')
  m.reply(`*📮 SN:* ${sn}`)
  if (m.isGroup) conn.reply(m.sender, `*📮 SN:* ${sn}`, m)

}

handler.help = ['ceksn']
handler.tags = ['xp']
handler.command = /^(ceksn)$/i
handler.register = true
export default handler