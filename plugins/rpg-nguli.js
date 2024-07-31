let handler = async (m, { conn }) => {
    if (new Date - global.db.data.users[m.sender].lastclaim > 86400000) {
      global.db.data.users[m.sender].limit += 3
      m.reply('_Selamat kamu mendapatkan +10 limit_')
      global.db.data.users[m.sender].lastclaim = new Date * 1
    } else m.reply('Anda sudah mengklaim upah nguli hari ini')
  }
  handler.help = ['nguli']
  handler.tags = ['rpg']
  handler.command = /^(nguli)$/i
  handler.group = true
  handler.fail = null
  
  
  export default handler