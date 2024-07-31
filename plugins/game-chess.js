
let handler = async (m, {
  conn,
  usedPrefix,
  command,
  text
}) => {
  conn.chessgame = conn.chessgame || {};
  if (text == 'end') {
      if (!conn.chessgame[m.chat]) return m.reply('Anda tidak sedang dalam sesi Chess')
      delete conn.chessgame[m.chat]
      m.reply('Berhasil keluar dari sesi Chess.')
  } else if (text == 'start') {
      if (conn.chessgame[m.chat]) return conn.reply(m.chat, 'Anda masih berada dalam sesi Chess', conn.chessgame[m.chat].msg)
      try {
          const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    conn.chessgame[m.chat] = {
    fen: fen,
    player1: m.sender,
    player2: null,
    msg: null,
    acc: null,
    turn: null
    }
    let txt = `🎮 *Chess* 🎮\n\n@${m.sender.split('@')[0]}\n\n`
          txt += '- accept\n'
          txt += '- cancel\n'
          txt += `*${usedPrefix + command} end* untuk keluar dari sesi chess`
          let soal = await conn.sendMessage(m.chat, {
              text: txt,
              mentions: [m.sender]
          }, {
              quoted: m,
              ephemeralExpiration: ephemeral
          })
          conn.chessgame[m.chat].msg = soal
      } catch (e) {
          console.log(e)
          await m.reply(eror)
      }
  } else {
      m.reply('Contoh: .chessgame start/end')
  }
}

handler.menu = ['chessgame']
handler.tags = ['game']
handler.command = /^(chessgame)$/i

handler.limit = true

export default handler