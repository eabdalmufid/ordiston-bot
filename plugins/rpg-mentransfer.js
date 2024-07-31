let handler = async (m, { conn, args, usedPrefix, DevMode }) => {
    if (args.length < 3) {
        return conn.reply(m.chat, `Gunakan format .mentransfer <type> <jumlah> <@tag>\n📍contoh penggunaan: *.mentransfer money 100 @tag*\n\n*List yang bisa di transfer :*\n💹Money\n💳 Tabungan\n🥤Potion\n🗑️Sampah\n💎Diamond\n📦Common\n🛍️Uncommon\n🎁Mythic\n🧰Legendary\n🕸️string\n🪵Wood\n🪨Rock\n⛓iron`.trim(), m)
    } else try {
        let type = (args[0] || '').toLowerCase()
        let count = args[1] && args[1].length > 0 ? Math.min(9999999, Math.max(parseInt(args[1]), 1)) : Math.min(1)
        let who = m.mentionedJid ? m.mentionedJid[0] : (args[2].replace(/[@ .+-]/g, '').replace(' ', '') + '@s.whatsapp.net')
        if(!m.mentionedJid || !args[2]) throw 'Tag salah satu, atau ketik Nomernya!!'
        let users = global.db.data.users
        switch (type) {
            case 'money':
                if (global.db.data.users[m.sender].money >= count * 1) {
                    try {
                        global.db.data.users[m.sender].money -= count * 1
                        global.db.data.users[who].money += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer money sebesar ${count}`.trim(), m)
                    } catch (e) {
                        global.db.data.users[m.sender].money += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Uang kamu tidak mencukupi untuk mentransfer Money sebesar ${count}`.trim(), m)
                break
            case 'tabungan':
                if (global.db.data.users[m.sender].atm >= count * 1) {
                   try {
                       global.db.data.users[m.sender].atm -= count * 1
                       global.db.data.users[who].bank += count * 1
                       conn.reply(m.chat, `Berhasil mentransfer Uang dari bank sebesar ${count}`.trim(), m)
                    } catch (e) {
                        global.db.data.users[m.sender].bank += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                               conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Limit kamu tidak mencukupi untuk mentransfer Uang dari Bank sebesar ${count}`.trim(), m)
                break
            case 'potion':
                if (global.db.data.users[m.sender].potion >= count * 1) {
                    try {
                        global.db.data.users[m.sender].potion -= count * 1
                        global.db.data.users[who].potion += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer ${count} Potion`.trim(), m)
                    } catch (e) {
                        global.db.data.users[m.sender].potion += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Potion kamu tidak cukup`.trim(), m)
                break
            case 'sampah':
                if (global.db.data.users[m.sender].sampah >= count * 1) {
                    try {
                        global.db.data.users[m.sender].sampah -= count * 1
                        global.db.data.users[who].sampah += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer ${count} Sampah`.trim(), m)
                    } catch (e) {
                        global.db.data.users[m.sender].sampah += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Sampah kamu tidak cukup`.trim(), m)
                break
            case 'diamond':
                if (global.db.data.users[m.sender].diamond >= count * 1) {
                    try {
                        global.db.data.users[m.sender].diamond -= count * 1
                        global.db.data.users[who].diamond += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer ${count} Diamond`.trim(), m)
                    } catch (e) {
                        global.db.data.users[m.sender].diamond += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Diamond kamu kamu tidak cukup`.trim(), m)
                break
            case 'common':
                if (global.db.data.users[m.sender].common >= count * 1) {
                    try {
                        global.db.data.users[m.sender].common -= count * 1
                        global.db.data.users[who].common += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer ${count} Common Crate`.trim(), m)
                    } catch (e) {
                        global.db.data.users[m.sender].common += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Common crate kamu kamu tidak cukup`.trim(), m)
                break
            case 'uncommon':
                if (global.db.data.users[m.sender].uncommon >= count * 1) {
                    try {
                        global.db.data.users[m.sender].uncommon -= count * 1
                        global.db.data.users[who].uncommon += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer ${count} Uncommon Crate`.trim(), m)
                    } catch (e) {
                        global.db.data.users[m.sender].uncommon += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Uncommon crate kamu kamu tidak cukup`.trim(), m)
                break
            case 'mythic':
                if (global.db.data.users[m.sender].mythic >= count * 1) {
                    try {
                        global.db.data.users[m.sender].mythic -= count * 1
                        global.db.data.users[who].mythic += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer ${count} Mythic crate`.trim(), m)
                    } catch (e) {
                        global.db.data.users[m.sender].mythic += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Mythic crate kamu kamu tidak cukup`.trim(), m)
                break
            case 'legendary':
                if (global.db.data.users[m.sender].legendary >= count * 1) {
                    try {
                        global.db.data.users[m.sender].legendary -= count * 1
                        global.db.data.users[who].legendary += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer ${count} Legendary crate`.trim(), m)
                    } catch (e) {
                        global.db.data.users[m.sender].legendary += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Legendary crate kamu kamu tidak cukup`.trim(), m)
                break
            case 'string':
                if (global.db.data.users[m.sender].string >= count * 1) {
                    try {
                        global.db.data.users[m.sender].string -= count * 1
                        global.db.data.users[who].string += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer string sebesar ${count}`.trim(), m)
                    } catch (e) {
                        global.db.data.users[m.sender].string += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Uang kamu tidak mencukupi untuk mentransfer String sebesar ${count}`.trim(), m)
                break
            case 'rock':
                if (global.db.data.users[m.sender].rock >= count * 1) {
                    try {
                        global.db.data.users[m.sender].rock -= count * 1
                        global.db.data.users[who].rock += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer rock sebesar ${count}`.trim(), m)
                    } catch (e) {
                        global.db.data.users[m.sender].rock += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Uang kamu tidak mencukupi untuk mentransfer rock sebesar ${count}`.trim(), m)
                break
            case 'wood':
                if (global.db.data.users[m.sender].wood >= count * 1) {
                    try {
                        global.db.data.users[m.sender].wood -= count * 1
                        global.db.data.users[who].wood += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer wood sebesar ${count}`.trim(), m)
                    } catch (e) {
                        global.db.data.users[m.sender].wood += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Uang kamu tidak mencukupi untuk mentransfer wood sebesar ${count}`.trim(), m)
                break
            case 'iron':
                if (global.db.data.users[m.sender].iron >= count * 1) {
                    try {
                        global.db.data.users[m.sender].iron -= count * 1
                        global.db.data.users[who].iron += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer iron sebesar ${count}`.trim(), m)
                    } catch (e) {
                        global.db.data.users[m.sender].iron += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                        if (DevMode) {
                            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `Uang kamu tidak mencukupi untuk mentransfer Iron sebesar ${count}`.trim(), m)
                break
            default:
                return conn.reply(m.chat, `Gunakan format ${usedPrefix}transfer <type> <jumlah> <@tag>\n📍 Contoh penggunaan: *${usedPrefix}transfer money 100 @tag*\n\n*List yang bisa di transfer*\n💹 Money\n💳 Tabungan\n🥤 Potion\n🗑️ Sampah\n💎 Diamond\n📦 Common\n🛍️ Uncommon\n🎁 Mythic\n🧰 Legendary\n🕸️ String\n🪵 Wood\n🪨 Rock\n⛓️ Iron`.trim(), m)
        }
    } catch (e) {
        conn.reply(m.chat, `Gunakan format ${usedPrefix}transfer <type> <jumlah> <@tag>\📍 Contoh penggunaan: *${usedPrefix}transfer money 100 @tag*\n\n*List yang bisa di transfer :*\n💹 Money\n💳 Tabungan\n🥤 Potion\n🗑️ Sampah\n💎 Diamond\n📦 Common\n🛍️ Uncommon\n🎁 Mythic\n🧰 Legendary\n🕸️ String\n🪵 Wood\n🪨 Rock\n⛓ iron`.trim(), m)
        console.log(e)
        if (DevMode) {
            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
            }
        }
    }
}
    
handler.help = ['mentransfer <Args>']
handler.tags = ['rpg']
handler.command = /^(mentransfer|mentf)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.money = 0

export default handler
