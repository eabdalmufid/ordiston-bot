const rewards = {
  exp: 4999,
  money: 2999,
  potion: 1,
}
const cooldown = 3600000
let handler = async (m,{ conn} ) => {
  let user = global.db.data.users[m.sender]
  if (new Date - user.lasthourly < cooldown) throw `You have already claimed this hourly claim!, wait for *${((user.lasthourly + cooldown) - new Date()).toTimeString()}*`
  let text = ''
  for (let reward of Object.keys(rewards)) {
    if (!(reward in user)) continue
    user[reward] += rewards[reward]
    text += `*+${rewards[reward]}* ${global.rpg.emoticon(reward)}${reward}\n`
  }
  conn.reply(m.chat,`${htki} HOURLY ${htka}` + `\n` + text.trim(), m)
  user.lasthourly = new Date * 1
}
handler.help = ['hourly']
handler.tags = ['xp']
handler.command = /^(hourly)$/i

handler.cooldown = cooldown

export default handler