import { Chess } from 'chess.js';

export async function before(m) {
    if (global.db.data.users[m.sender].banned) return;
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text) return true;

    this.chessgame = this.chessgame || {};
    if (!this.chessgame[m.chat] || m.quoted.id != this.chessgame[m.chat].msg.key.id) return;

    let txt = (m.msg && m.msg.selectedDisplayText ? m.msg.selectedDisplayText : m.text ? m.text : '').toLowerCase();

    if (!txt) {
        this.reply(m.chat, "Masukkan input from to", m);
        return true;
    }

    if (/^accept?$/i.test(txt)) {
        if (this.chessgame[m.chat].player1 !== m.sender) {
            this.chessgame[m.chat].player2 = m.sender; // Set player2 as the user who accepted the game
            this.chessgame[m.chat].turn = this.chessgame[m.chat].player2; // Set the initial turn to player2

            const encodedFen = encodeURIComponent(this.chessgame[m.chat].fen);
            const giliran = `\nGiliran: @${m.sender.split('@')[0]}`;
            
            const boardUrl = `https://www.chess.com/dynboard?fen=${encodedFen}&board=graffiti&piece=graffiti&size=3&coordinates=inside`;
            const boardUrl2 = `https://chessboardimage.com/${encodedFen}.png`;
            let soal;
            try {
                soal = await this.sendMessage(m.chat, {
                    image: {
                        url: boardUrl
                    },
                    caption: "🎮 *Chess start* 🎮" + giliran,
                    mentions: [m.sender],
                }, {
                    quoted: m,
                    ephemeralExpiration: ephemeral
                });
            } catch (error) {
                try {
                soal = await this.sendMessage(m.chat, {
                    image: {
                        url: boardUrl2
                    },
                    caption: "🎮 *Chess start* 🎮" + giliran,
                    mentions: [m.sender],
                }, {
                    quoted: m,
                    ephemeralExpiration: ephemeral
                });
            } catch (error) {
                this.reply(m.chat, 'Gagal mengirim papan catur.', m);
                console.error(error); // Log the error for debugging
                throw error; // Re-throw the error
            }
            }

            this.chessgame[m.chat].msg = soal;
        } else {
            this.reply(m.chat, 'Anda tidak dapat menerima permainan.', m);
        }
    } else if (/^cancel?$/i.test(txt)) {
        delete this.chessgame[m.chat];
        this.reply(m.chat, 'Berhasil keluar dari sesi Chess.', m);
    }

    if (this.chessgame[m.chat]) {
        if (/^\S+(\s|[\W])\S+$/.test(txt)) {
            if (this.chessgame[m.chat].turn === this.chessgame[m.chat].player2) {
                const chess = new Chess(this.chessgame[m.chat].fen);
                if (chess.isCheckmate()) {
      delete this.chessgame[m.chat]
      await this.reply(m.chat, `⚠️ *Game Checkmate.*\n🏳️ *Permainan catur dihentikan.*\n*Pemenang:* @${m.sender.split('@')[0]}`, m, {
        contextInfo: {
          mentionedJid: [m.sender]
        }
      });
      return;
    }
    if (chess.isDraw()) {
      delete this.chessgame[m.chat]
      await this.reply(m.chat, `⚠️ *Game Draw.*\n🏳️ *Permainan catur dihentikan.`, m);
      return;
    }
                const [from, to] = txt.split(' ');

                if (m.sender !== this.chessgame[m.chat].player2) {
                    this.reply(m.chat, '❌ Bukan giliran Anda.', m);
                } else {
                    try {
                        chess.move({ from, to, promotion: 'q' });
                        this.chessgame[m.chat].fen = chess.fen();
                        this.chessgame[m.chat].turn = this.chessgame[m.chat].player1; // Switch to player1's turn
                        const encodedFen = encodeURIComponent(chess.fen());
                        const giliran = `\nGiliran: @${this.chessgame[m.chat].turn.split('@')[0]}`;
                        const flipParam = (this.chessgame[m.chat].turn !== this.chessgame[m.chat].player1) ? '' : '&flip=true';
                        const flipParam2 = (this.chessgame[m.chat].turn !== this.chessgame[m.chat].player1) ? '' : '-flip';

                        const boardUrl = `https://www.chess.com/dynboard?fen=${encodedFen}&board=graffiti&piece=graffiti&size=3&coordinates=inside${flipParam}`;
                        const boardUrl2 = `https://chessboardimage.com/${encodedFen + flipParam2}.png`;
                        let soal;
                        try {
                            soal = await this.sendMessage(m.chat, {
                                image: {
                                    url: boardUrl
                                },
                                caption: "🎮 *Chess start* 🎮" + giliran,
                                mentions: [this.chessgame[m.chat].turn],
                            }, {
                                quoted: m,
                                ephemeralExpiration: ephemeral
                            });
                        } catch (error) {
                            this.reply(m.chat, 'Gagal mengirim papan catur.', m);
                            console.error(error); // Log the error for debugging
                            throw error; // Re-throw the error
                        }

                        this.chessgame[m.chat].msg = soal;
                    } catch (e) {
                        this.reply(m.chat, '❌ *Langkah tidak valid.*', m);
                        console.error(e); // Log the error for debugging
                        // Do not re-throw the error
                    }
                }
            }
        }
    }

    return true;
}