let { MessageType } = (await import('@adiwajshing/baileys')).default

let handler  = async (m, { conn, command, args, usedPrefix, DevMode }) => {
  let type = (args[0] || '').toLowerCase()
  let _type = (args[0] || '').toLowerCase()
  let user = global.db.data.users[m.sender]
  global.db.data.users[m.sender].pickaxe = global.db.data.users[m.sender].pickaxe || 0
  global.db.data.users[m.sender].pedang = global.db.data.users[m.sender].pedang || 0
  global.db.data.users[m.sender].fishingrod = global.db.data.users[m.sender].fishingrod || 0
  let botol = global.botwm

let lgocraft = `
█▀▀▀▀█▀▀▀▀█▀▀▀▀█
█────█────█────█
█▄▄▄▄█▄▄▄▄█▄▄▄▄█
█▀▀▀▀█▀▀▀▀█▀▀▀▀█
█────█────█────█
█▄▄▄▄█▄▄▄▄█▄▄▄▄█
█▀▀▀▀█▀▀▀▀█▀▀▀▀█
█────█────█────█
█▄▄▄▄█▄▄▄▄█▄▄▄▄█`

  let caption = `
⛊ Pickaxe ⛏️
⛊ Sword ⚔️
⛊ Fishingrod 🎣

*「 RECIPE 」*

⬡ Pickaxe ⛏️
│• 10 Wood
│• 5 Rock
│• 5 Iron
│• 20 String
╰────┈⭑
⬡ Sword ⚔️
│• 10 Wood
│• 15 Iron
╰────┈⭑
⬡ Fishingrod 🎣
│• 10 Wood
│• 2 Iron
│• 20 String
╰────┈⭑
⬡ Armor 🥼
│• 30 Iron
│• 1 Emerald
│• 5 Diamond
╰────┈⭑
⬡ Atm 💳
│• 3 Emerald
│• 6 Diamond
│• 10k Money
╰────┈⭑
`
const sections = [
   {
	title: "CRAFT A TOOLS",
	rows: [
	    {title: "SWORD ⚔️", rowId: ".craft sword", description: "Crafting A Sword"},
	    {title: "PICKAXE ⛏️", rowId: ".craft pickaxe", description: "Crafting A Pickaxe"},
	    {title: "FISHINGROD 🎣", rowId: ".craft fishingrod", description: "Crafting A Fishingrod"},
	    {title: "ARMOR 🥼", rowId: ".craft armor", description: "Crafting A Armor"},
	    {title: "ATM 💳", rowId: ".craft atm", description: "Crafting A Atm (but that's ilegal)"},
	]
    },
]

const listMessage = {
  text: caption,
  footer: wm,
  title: lgocraft,
  buttonText: " C R A F T ",
  sections
}

  try {
    if (/craft|Crafting/i.test(command)) {
      const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count)
        switch (type) {
          case 'pickaxe':
          if (user.pickaxe > 0) return m.reply('Kamu sudah memilik ini')
            if(user.rock < 5 || user.wood < 10 || user.iron < 5 || user.string < 20) return m.reply(`Barang tidak cukup!\nUntuk membuat pickaxe. Kamu memerlukan : \n10 Wood🪵 \n5 Iron⛓\n20 S tring🕸️\n5 Rock 🪨`)
            global.db.data.users[m.sender].wood -= 10
            global.db.data.users[m.sender].iron -= 5
            user.rock -= 5
            global.db.data.users[m.sender].string -= 20
            global.db.data.users[m.sender].pickaxe += 1
            user.pickaxedurability = 40
            m.reply("Sukses membuat 1 pickaxe 🔨")
            break
          case 'sword':
          if (user.sword > 0) return m.reply('Kamu sudah memilik ini')
            if(user.wood < 10 || user.iron < 15) return m.reply(`Barang tidak cukup!\nUntuk membuat sword. Kamu memerlukan :\n10 Wood🪵\n15 Iron⛓️`)
            global.db.data.users[m.sender].wood -= 10
            global.db.data.users[m.sender].iron -= 15
            global.db.data.users[m.sender].sword += 1
            user.sworddurability = 40
            m.reply("Sukses membuat 1 sword 🗡️")
            break
          case 'fishingrod':
          if (user.fishingrod > 0) return m.reply('Kamu sudah memilik ini')
            if(user.wood < 20 || user.iron < 5 || user.string < 20) return m.reply(`Barang tidak cukup!\nUntuk membuat pancingan. Kamu memerlukan :\n10 Wood🪵\n5 Iron⛓\n20 String🕸️`)
            global.db.data.users[m.sender].wood -= 10
            global.db.data.users[m.sender].iron -= 2
            global.db.data.users[m.sender].string -= 20
            global.db.data.users[m.sender].fishingrod += 1
            user.fishingroddurability = 40
            m.reply("Sukses membuat 1 Pancingan 🎣")
            break
          case 'armor':
          if (user.armor > 0) return m.reply('Kamu sudah memilik ini')
            if(user.iron < 30 || user.emerald < 1 || user.diamond < 5) return m.reply(`Barang tidak cukup!\nUntuk membuat armor. Kamu memerlukan :\n30 Iron ⛓️\n1 Emerald ❇️\n5 Diamond 💎`)
            global.db.data.users[m.sender].emerald -= 1
            global.db.data.users[m.sender].iron -= 30
            global.db.data.users[m.sender].diamond -= 5
            global.db.data.users[m.sender].armor += 1
            user.armordurability = 50
            m.reply("Sukses membuat 1 Armor 🥼")
            break
            case 'atm':
          if (user.atm > 0) return m.reply('Kamu sudah memilik ini')
            if(user.emerald < 3 || user.money < 10000 || user.diamond < 6) return m.reply(`Barang tidak cukup!\nUntuk membuat atm. Kamu memerlukan :\n10k Money 💹\n3 Emerald ❇️\n6 Diamond 💎`)
            global.db.data.users[m.sender].emerald -= 3
            global.db.data.users[m.sender].money -= 10000
            global.db.data.users[m.sender].diamond -= 6
            global.db.data.users[m.sender].atm += 1
            global.db.data.users[m.sender].fullatm = 5000000
            m.reply("Sukses membuat 1 Atm 💳")
            break

          default:
            let lister = [
              "pickaxe",
              "sword",
              "fishingrod",
              "armor",
              "atm"
            ]
         if (!lister.includes(args[0])) return m.reply("*Example:*\n.craft sword\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n") + "\n\n" + readMore + lgocraft + "\n" + caption)
            return await conn.sendMessage(m.chat, listMessage)
        }
    } else if (/enchant|enchan/i.test(command)) {
      const count = args[2] && args[2].length > 0 ? Math.min(99999999, Math.max(parseInt(args[2]), 1)) : !args[2] || args.length < 4 ? 1 :Math.min(1, count)
      switch (_type) {
        case 't':
          break
        case '':
          break

        default:
          return conn.reply( m.chat, caption, m)
      }
    }
  } catch (err) {
    m.reply("Error\n\n\n" + err.stack)
  }
}

handler.help = ['craft']
handler.tags = ['rpg']
handler.command = /^(craft|crafting|chant)/i

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4201)