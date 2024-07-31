import daily from './rpg-daily.js'
import weekly from './rpg-weekly.js'
import monthly from './rpg-monthly.js'
import adventure from './rpg-adventure.js'
import {
    xpRange
} from '../lib/levelling.js'
import PhoneNumber from 'awesome-phonenumber'
import canvafy from "canvafy"

const inventory = {
    others: {
        level: true,
        limit: true,
        health: true,
        money: true,
        exp: true
    },
    items: {
        bibitanggur: true,
        bibitmangga: true,
        bibitpisang: true,
        bibitapel: true,
        bibitjeruk: true,
        potion: true,
        trash: true,
        wood: true,
        rock: true,
        string: true,
        emerald: true,
        diamond: true,
        gold: true,
        iron: true,
        upgrader: true,
        pet: true
    },
    durabi: {
        sworddurability: true,
        pickaxedurability: true,
        fishingroddurability: true,
        armordurability: true
    },
    tools: {
        armor: {
            '0': '❌',
            '1': 'Leather Armor',
            '2': 'Iron Armor',
            '3': 'Gold Armor',
            '4': 'Diamond Armor',
            '5': 'Emerald Armor',
            '6': 'Crystal Armor',
            '7': 'Obsidian Armor',
            '8': 'Netherite Armor',
            '9': 'Wither Armor',
            '10': 'Dragon Armor',
            '11': 'Hacker Armor'
        },
        sword: {
            '0': '❌',
            '1': 'Wooden Sword',
            '2': 'Stone Sword',
            '3': 'Iron Sword',
            '4': 'Gold Sword',
            '5': 'Copper Sword',
            '6': 'Diamond Sword',
            '7': 'Emerald Sword',
            '8': 'Obsidian Sword',
            '9': 'Netherite Sword',
            '10': 'Samurai Slayer Green Sword',
            '11': 'Hacker Sword'
        },
        pickaxe: {
            '0': '❌',
            '1': 'Wooden Pickaxe',
            '2': 'Stone Pickaxe',
            '3': 'Iron Pickaxe',
            '4': 'Gold Pickaxe',
            '5': 'Copper Pickaxe',
            '6': 'Diamond Pickaxe',
            '7': 'Emerlad Pickaxe',
            '8': 'Crystal Pickaxe',
            '9': 'Obsidian Pickaxe',
            '10': 'Netherite Pickaxe',
            '11': 'Hacker Pickaxe'
        },
        fishingrod: true

    },
    crates: {
        common: true,
        uncommon: true,
        mythic: true,
        legendary: true
    },
    pets: {
        horse: 10,
        cat: 10,
        fox: 10,
        dog: 10,
        robo: 10,
        lion: 10,
        rhinoceros: 10,
        dragon: 10,
        centaur: 10,
        kyubi: 10,
        griffin: 10,
        phonix: 10,
        wolf: 10
    },
    cooldowns: {
        lastclaim: {
            name: 'claim',
            time: daily.cooldown
        },
        lastweekly: {
            name: 'weekly',
            time: weekly.cooldown
        },
        lastmonthly: {
            name: 'monthly',
            time: monthly.cooldown
        },
        lastadventure: {
            name: 'adventure',
            time: adventure.cooldown
        }
    }
}
let handler = async (m, {
    conn,
    args,
    command,
    text,
    usedPrefix
}) => {
    const listData = [{
            id: 1,
            name: 'Item 1'
        },
        {
            id: 2,
            name: 'Item 2'
        },
        {
            id: 3,
            name: 'Item 3'
        },
        {
            id: 4,
            name: 'Item 4'
        },
        {
            id: 5,
            name: 'Item 5'
        }
    ];

    const listMessage = ["\n======= List Data ======="];
    listData.forEach(({
        id,
        name
    }) => listMessage.push(`${id}. ${name}`));
    listMessage.push("=====================");

    const input = args[0];
    const num = parseInt(input);

    if (!input) {
        const pesan = "Pesan: Input tidak boleh kosong!\nContoh: .inv 1\n" + listMessage.join('\n');
        return m.reply(pesan);
    } else if (isNaN(num)) {
        const pesan = "Pesan: Input harus berupa angka!\nContoh: .inv 1\n" + listMessage.join('\n');
        return m.reply(pesan);
    } else if (num > 5) {
        const pesan = "Pesan: Angka tidak boleh lebih dari 5!\nContoh: .inv 1\n" + listMessage.join('\n');
        return m.reply(pesan);
    } else {
        const pesan = `Pesan: ${listData[num - 1].name} dipilih`;
        await m.reply(pesan);
        let imgr = flaaa
        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
        let name = await conn.getName(who)
        let pp = await conn.profilePictureUrl(who, "image").catch(_ => "https://telegra.ph/file/1dafb3a6ff22e0b2d8f9b.jpg");
        const data = Object.entries(global.db.data.users).sort((a, b) => b[1].money - a[1].money)
        const transformedData = data.slice(0, 10).map(([jid, {
            money,
            name
        }], index) => ({
            top: (index + 1),
            avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
            tag: name,
            score: money
        }));
        let dataArray = Object.keys(global.db.data.users).sort((a, b) => b[1].money - a[1].money)
        const transformedDataResult = await Promise.all(transformedData.map(async (item, index) => ({
            ...item,
            avatar: await conn.profilePictureUrl(dataArray[index], "image").catch(_ => "https://telegra.ph/file/1dafb3a6ff22e0b2d8f9b.jpg")
        })));
        const topImg = await topImage(transformedDataResult, logo);

        if (typeof global.db.data.users[who] == "undefined") {
            global.db.data.users[who] = {
                exp: 0,
                limit: 10,
                lastclaim: 0,
                registered: false,
                name: conn.getName(m.sender),
                age: -1,
                regTime: -1,
                afk: -1,
                afkReason: '',
                banned: false,
                level: 0,
                lastweekly: 0,
                role: 'Warrior V',
                autolevelup: false,
                money: 0,
                pasangan: "",
            }
        }

        if (args[0] == '1') {
            // Inventory 1
            let member = global.db.data.users[m.sender]
            let healt = member.healt
            let pickaxe = member.pickaxe
            let sword = member.sword
            let armor = member.armor
            let fishingrod = member.fishingrod

            let warn = member.warn

            let pet = member.pet
            let kucing = member.kucing
            let _kucing = member.anakkucing
            let rubah = member.rubah
            let _rubah = member.anakrubah
            let kuda = member.kuda
            let _kuda = member.anakkuda
            let anjing = member.anjing
            let _anjing = member.anakanjing

            let diamond = member.diamond
            let potion = member.potion
            let common = member.common
            let makananpet = member.makananpet
            let iron = member.iron
            let rock = member.rock
            let wood = member.wood
            let string = member.string

            let uncommon = member.uncommon
            let mythic = member.mythic
            let legendary = member.legendary
            let level = member.level
            let money = member.money
            let exp = member.exp
            let sampah = member.sampah

            let sortedmoney = Object.entries(global.db.data.users).sort((a, b) => b[1].money - a[1].money)
            let sortedlevel = Object.entries(global.db.data.users).sort((a, b) => b[1].level - a[1].level)
            let sorteddiamond = Object.entries(global.db.data.users).sort((a, b) => b[1].diamond - a[1].diamond)
            let sortedpotion = Object.entries(global.db.data.users).sort((a, b) => b[1].potion - a[1].potion)
            let sortedsampah = Object.entries(global.db.data.users).sort((a, b) => b[1].sampah - a[1].sampah)
            let sortedmakananpet = Object.entries(global.db.data.users).sort((a, b) => b[1].makananpet - a[1].makananpet)
            let sortedrock = Object.entries(global.db.data.users).sort((a, b) => b[1].rock - a[1].rock)
            let sortediron = Object.entries(global.db.data.users).sort((a, b) => b[1].iron - a[1].iron)
            let sortedwood = Object.entries(global.db.data.users).sort((a, b) => b[1].wood - a[1].wood)
            let sortedstring = Object.entries(global.db.data.users).sort((a, b) => b[1].string - a[1].string)
            let sortedcommon = Object.entries(global.db.data.users).sort((a, b) => b[1].common - a[1].common)
            let sorteduncommon = Object.entries(global.db.data.users).sort((a, b) => b[1].uncommon - a[1].uncommon)
            let sortedmythic = Object.entries(global.db.data.users).sort((a, b) => b[1].mythic - a[1].mythic)
            let sortedlegendary = Object.entries(global.db.data.users).sort((a, b) => b[1].legendary - a[1].legendary)
            let sortedpet = Object.entries(global.db.data.users).sort((a, b) => b[1].pet - a[1].pet)
            let usersmoney = sortedmoney.map(v => v[0])
            let userslevel = sortedlevel.map(v => v[0])
            let usersdiamond = sorteddiamond.map(v => v[0])
            let userspotion = sortedpotion.map(v => v[0])
            let userssampah = sortedsampah.map(v => v[0])
            let usersmakananpet = sortedmakananpet.map(v => v[0])
            let usersrock = sortedrock.map(v => v[0])
            let usersiron = sortediron.map(v => v[0])
            let userswood = sortedwood.map(v => v[0])
            let usersstring = sortedstring.map(v => v[0])
            let userscommon = sortedcommon.map(v => v[0])
            let usersuncommon = sorteduncommon.map(v => v[0])
            let usersmythic = sortedmythic.map(v => v[0])
            let userslegendary = sortedlegendary.map(v => v[0])
            let userspet = sortedpet.map(v => v[0])

            let str = `
Inventory *🏷️ Nama:* *(${name})* ( @${who.split("@")[0]} )\n
❤️Nyawa: *${healt}*
⛏️Pickaxe: *${pickaxe == 0 ? 'Tidak Punya' : '' || pickaxe == 1 ? 'Level 1' : '' || pickaxe == 2 ? 'Level 2' : '' || pickaxe == 3 ? 'Level 3' : '' || pickaxe == 4 ? 'Level 4' : '' || pickaxe == 5 ? 'Level 5 (MAX)' : ''}*
⚔️Sword: *${sword == 0 ? 'Tidak Punya' : '' || sword == 1 ? 'Leather Sword' : '' || sword == 2 ? 'Iron Sword' : '' || sword == 3 ? 'Gold Sword' : '' || sword == 4 ? 'Diamond Sword' : '' || sword == 5 ? 'Netherite Sword (MAX)' : ''}*
👚Armor: *${armor == 0 ? 'Tidak Punya' : '' || armor == 1 ? 'Leather Armor' : '' || armor == 2 ? 'Iron Armor' : '' || armor == 3 ? 'Gold Armor' : '' || armor == 4 ? 'Diamond Armor' : '' || armor == 5 ? 'Netherite Armor (MAX)' : ''}*
🎣FishingRod: ${fishingrod}

💵Uang: *${money}*
🔱Level: *${level}*
✉️Exp: *${exp}*

*Inventory*
💎Diamond: *${diamond}*
🥤Potion: *${potion}*
🗑️Sampah: *${sampah}*
🍖Makanan Pet: *${makananpet}*
⛓️Iron: *${iron}*
🪨Rock: *${rock}*
🪵Wood: *${wood}*
🕸️String: *${string}*
Total inv: *${diamond + potion + sampah + makananpet}* item\n
*Crate*
📦Common: *${common}*
📦Uncommon: *${uncommon}*
📦Mythic: *${mythic}*
🎁Legendary: *${legendary}*
📦Pet: *${pet}*\n
*Pet*
🐎Kuda: *${kuda == 0 ? 'Tidak Punya' : '' || kuda == 1 ? 'Level 1' : '' || kuda == 2 ? 'Level 2' : '' || kuda == 3 ? 'Level 3' : '' || kuda == 4 ? 'Level 4' : '' || kuda == 5 ? 'Level MAX' : ''}*
🦊Rubah: *${rubah == 0 ? 'Tidak Punya' : '' || rubah == 1 ? 'Level 1' : '' || rubah == 2 ? 'Level 2' : '' || rubah == 3 ? 'Level 3' : '' || rubah == 4 ? 'Level 4' : '' || rubah == 5 ? 'Level MAX' : ''}*
🐈Kucing: *${kucing == 0 ? 'Tidak Punya' : '' || kucing == 1 ? 'Level 1' : '' || kucing == 2 ? 'Level 2' : '' || kucing == 3 ? 'Level 3' : '' || kucing == 4 ? 'Level 4' : '' || kucing == 5 ? 'Level MAX' : ''}*
🐶Anjing: *${anjing == 0 ? 'Tidak Punya' : '' || anjing == 1 ? 'Level 1' : '' || anjing == 2 ? 'Level 2' : '' || anjing == 3 ? 'Level 3' : '' || anjing == 4 ? 'Level 4' : '' || anjing == 5 ? 'Level MAX' : ''}*\n\n
*Proges*\n
╭────────────┄⸙
│🔱Level *${level}* To Level *${level}*
│⚜️Exp *${exp}* -> *${level * 100}*
╰──┬─┄
╭──┴─────────┄⸙
╰┫🦊Rubah ${rubah == 0 ? 'Tidak Punya' : '' || rubah > 0 && rubah < 5 ? `Level *${rubah}* To level *${rubah + 1}*\n╭┫Exp *${_rubah}* -> *${rubah *100}*` : '' || rubah == 5 ? '*Max Level*' : ''}
╰──┬─┄
╭──┴─────────┄⸙
╰┫🐈Kucing ${kucing == 0 ? 'Tidak Punya' : '' || kucing > 0 && kucing < 5 ? `Level *${kucing}* To level *${kucing + 1}*\n╭┫Exp *${_kucing}* -> *${kucing *100}*` : '' || kucing == 5 ? '*Max Level*' : ''}
╰──┬─┄
╭──┴─────────┄⸙
╰┫🐎Kuda ${kuda == 0 ? 'Tidak Punya' : '' || kuda > 0 && kuda < 5 ? `Level *${kuda}* To level *${kuda + 1}*\n╭┫Exp *${_kuda}* -> *${kuda *100}*` : '' || kuda == 5 ? '*Max Level*' : ''}
╰──┬─┄
╭──┴─────────┄⸙
╰┫🐶Anjing ${anjing == 0 ? 'Tidak Punya' : '' || anjing > 0 && anjing < 5 ? `Level *${anjing}* To level *${anjing + 1}*\n╭┫Exp *${_anjing}* -> *${anjing *100}*` : '' || anjing == 5 ? '*Max Level*' : ''}
╰────┄⸙\n\n
*achievement*
1.Top level *${userslevel.indexOf(m.sender) + 1}* dari *${userslevel.length}*
2.Top Money *${usersmoney.indexOf(m.sender) + 1}* dari *${usersmoney.length}*
3.Top Diamond *${usersdiamond.indexOf(m.sender) + 1}* dari *${usersdiamond.length}*
4.Top Potion *${userspotion.indexOf(m.sender) + 1}* dari *${userspotion.length}*
5.Top Sampah *${userssampah.indexOf(m.sender) + 1}* dari *${userssampah.length}*
6.Top Makanan Pet *${usersmakananpet.indexOf(m.sender) + 1}* dari *${usersmakananpet.length}*
7.Top Rock *${usersrock.indexOf(m.sender) + 1}* dari *${usersrock.length}*
8.Top Iron *${usersiron.indexOf(m.sender) + 1}* dari *${usersiron.length}*
9.Top Wood *${userswood.indexOf(m.sender) + 1}* dari *${userswood.length}*
10.Top String *${usersstring.indexOf(m.sender) + 1}* dari *${usersstring.length}*
11.Top Common *${userscommon.indexOf(m.sender) + 1}* dari *${userscommon.length}*
13.Top Uncommon *${usersuncommon.indexOf(m.sender) + 1}* dari *${usersuncommon.length}*
14.Top Mythic *${usersmythic.indexOf(m.sender) + 1}* dari *${usersmythic.length}*
15.Top Legendary *${userslegendary.indexOf(m.sender) + 1}* dari *${userslegendary.length}*
16.Top Pet Crate *${userspet.indexOf(m.sender) + 1}* dari *${userspet.length}*
\n\n
Warn: *${warn}*
Banned: *No*
`.trim()
            //conn.reply(m.chat, str, m)
            await conn.sendFthumb(m.chat, 'INVENTORY', str, imgr + 'inventory', '', m)
            //await conn.sendFile(m.chat, topImg || imgr + "INVENTORY", '', str, m, null, { mentions: conn.parseMention(str) })
        } else if (args[0] == '2') {
            // Inventory 2
            let user = global.db.data.users[m.sender]
            const tools = Object.keys(inventory.tools).map(v => user[v] && `*${global.rpg.emoticon(v)}${v}:* ${typeof inventory.tools[v] === 'object' ? inventory.tools[v][user[v]?.toString()] : `Level(s) ${user[v]}`}`).filter(v => v).join('\n').trim()
            const items = Object.keys(inventory.items).map(v => user[v] && `*${global.rpg.emoticon(v)}${v}:* ${user[v]}`).filter(v => v).join('\n').trim()
            const dura = Object.keys(inventory.durabi).map(v => user[v] && `*${global.rpg.emoticon(v)}${v}:* ${user[v]}`).filter(v => v).join('\n').trim()
            const crates = Object.keys(inventory.crates).map(v => user[v] && `*${global.rpg.emoticon(v)}${v}:* ${user[v]}`).filter(v => v).join('\n').trim()
            const pets = Object.keys(inventory.pets).map(v => user[v] && `*${global.rpg.emoticon(v)}${v}:* ${user[v] >= inventory.pets[v] ? 'Max Levels' : `Level(s) ${user[v]}`}`).filter(v => v).join('\n').trim()
            const cooldowns = Object.entries(inventory.cooldowns).map(([cd, {
                name,
                time
            }]) => cd in user && `*✧ ${name}*: ${new Date() - user[cd] >= time ? '✅' : '❌'}`).filter(v => v).join('\n').trim()
            const caption = `
🧑🏻‍🏫 ᴜsᴇʀ: *${conn.getName(m.sender)}*
${Object.keys(inventory.others).map(v => user[v] && `⮕ ${global.rpg.emoticon(v)} ${v}: ${user[v]}`).filter(v => v).join('\n')}${tools ? `
🔖 ᴛᴏᴏʟs :
${tools}` : ''}${items ? `

🔖 ɪᴛᴇᴍs :
${items}` : ''}${crates ? `

🔖 ᴄʀᴀᴛᴇs :
${crates}` : ''}${pets ? `

🔖 ᴩᴇᴛs :
${pets}` : ''}${cooldowns ? `

♻️ ᴄᴏʟʟᴇᴄᴛ ʀᴇᴡᴀʀᴅs:
${cooldowns}` : ''}
*✧ dungeon: ${user.lastdungeon == 0 ? '✅': '❌'}*
*✧ mining: ${user.lastmining == 0 ? '✅': '❌'}*
*✧ roket: ${user.lastroket == 0 ? '✅': '❌'}*
*✧ mancing: ${user.lastfishing == 0 ? '✅': '❌'}*
*✧ ngojek: ${user.lastngojek == 0 ? '✅': '❌'}*
*✧ taxy: ${user.lastgrab == 0 ? '✅': '❌'}*
*✧ nebang: ${user.lastlumber == 0 ? '✅': '❌'}*
*✧ ngocok: ${user.lastngocok == 0 ? '✅': '❌'}*
`.trim()
            await conn.sendFthumb(m.chat, 'INVENTORY', caption, imgr + 'inventory', '', m)
            //await conn.sendFile(m.chat, topImg || imgr + "INVENTORY", '', caption, m, null, { mentions: conn.parseMention(caption) })
        } else if (args[0] == '3') {
            // Inventory 3
            let date = global.botdate
            let {
                registered,
                age,
                lastrampok,
                lastdagang,
                lastcodereg,
                lastberkebon,
                lasthourly,
                lastberburu,
                lastbansos,
                lastadventure,
                lastfishing,
                lastwar,
                lastduel,
                lastmining,
                lastdungeon,
                lastclaim,
                lastweekly,
                lastmonthly
            } = global.db.data.users[m.sender]
            let healt = global.db.data.users[m.sender].healt
            let lapar = global.db.data.users[m.sender].laper
            let haus = global.db.data.users[m.sender].haus
            let usrname = global.db.data.users[m.sender].name
            let stamina = global.db.data.users[m.sender].stamina
            let armor = global.db.data.users[m.sender].armor
            let sword = global.db.data.users[m.sender].sword
            let sdurability = global.db.data.users[m.sender].sworddurability
            let warn = global.db.data.users[m.sender].warn
            let premium = global.db.data.users[m.sender].premium
            let tprem = global.db.data.users[m.sender].tprem
            let pancing = global.db.data.users[m.sender].pancing
            let fdurability = global.db.data.users[m.sender].fishingroddurability
            let role = global.db.data.users[m.sender].role
            let pickaxe = global.db.data.users[m.sender].pickaxe
            let pdurability = global.db.data.users[m.sender].pickaxedurability

            let psepick = global.db.data.users[m.sender].psepick
            let psenjata = global.db.data.users[m.sender].psenjata

            let ikan = global.db.data.users[m.sender].ikan
            let nila = global.db.data.users[m.sender].nila
            let bawal = global.db.data.users[m.sender].bawal
            let lele = global.db.data.users[m.sender].lele
            let udangb = global.db.data.users[m.sender].udang

            let apel = global.db.data.users[m.sender].apel
            let ayamg = global.db.data.users[m.sender].ayamg
            let ayamb = global.db.data.users[m.sender].ayamb
            let sapir = global.db.data.users[m.sender].sapir
            let ssapi = global.db.data.users[m.sender].ssapi
            let wood = global.db.data.users[m.sender].wood
            let string = global.db.data.users[m.sender].string
            let emas = global.db.data.users[m.sender].emas
            let besi = global.db.data.users[m.sender].iron
            let rock = global.db.data.users[m.sender].rock
            let sapi = global.db.data.users[m.sender].sapi
            let ayam = global.db.data.users[m.sender].ayam
            let babi = global.db.data.users[m.sender].babi
            let banteng = global.db.data.users[m.sender].banteng
            let pet = global.db.data.users[m.sender].pet
            let kucing = global.db.data.users[m.sender].kucing
            let _kucing = global.db.data.users[m.sender].anakkucing
            let rubah = global.db.data.users[m.sender].rubah
            let _rubah = global.db.data.users[m.sender].anakrubah
            let kuda = global.db.data.users[m.sender].kuda
            let _kuda = global.db.data.users[m.sender].anakkuda
            let serigala = global.db.data.users[m.sender].serigala
            let _serigala = global.db.data.users[m.sender].anakserigala
            let phonix = global.db.data.users[m.sender].phonix
            let _phonix = global.db.data.users[m.sender].anakphonix
            let griffin = global.db.data.users[m.sender].griffin
            let _griffin = global.db.data.users[m.sender].anakgriffin
            let kyubi = global.db.data.users[m.sender].kyubi
            let _kyubi = global.db.data.users[m.sender].anakkyubi
            let centaur = global.db.data.users[m.sender].centaur
            let _centaur = global.db.data.users[m.sender].anakcentaur
            let naga = global.db.data.users[m.sender].naga
            let _naga = global.db.data.users[m.sender].anaknaga
            let diamond = global.db.data.users[m.sender].diamond
            let potion = global.db.data.users[m.sender].potion
            let common = global.db.data.users[m.sender].common
            let makananpet = global.db.data.users[m.sender].makananpet
            let makanannaga = global.db.data.users[m.sender].makanannaga
            let makananphonix = global.db.data.users[m.sender].makananphonix
            let makanangriffin = global.db.data.users[m.sender].makanangriffin
            let makanankyubi = global.db.data.users[m.sender].makanankyubi
            let makanancentaur = global.db.data.users[m.sender].makanancentaur
            let uncommon = global.db.data.users[m.sender].uncommon
            let mythic = global.db.data.users[m.sender].mythic
            let legendary = global.db.data.users[m.sender].legendary
            let level = global.db.data.users[m.sender].level
            let money = global.db.data.users[m.sender].money
            let exp = global.db.data.users[m.sender].exp
            let atm = global.db.data.users[m.sender].atm
            let aqua = global.db.data.users[m.sender].aqua
            let pasangan = global.db.data.users[m.sender].pasangan
            let ramuan = global.db.data.users[m.sender].ramuan
            let kaleng = global.db.data.users[m.sender].kaleng
            let kardus = global.db.data.users[m.sender].kardus
            let botol = global.db.data.users[m.sender].botol
            let arlok = global.db.data.users[m.sender].arlok
            let limit = global.db.data.users[m.sender].limit
            let glimit = global.db.data.users[m.sender].glimit
            let sampah = global.db.data.users[m.sender].sampah
            let anggur = global.db.data.users[m.sender].anggur
            let jeruk = global.db.data.users[m.sender].jeruk
            let mangga = global.db.data.users[m.sender].mangga
            let pisang = global.db.data.users[m.sender].pisang
            let bibitanggur = global.db.data.users[m.sender].bibitanggur
            let bibitjeruk = global.db.data.users[m.sender].bibitjeruk
            let bibitapel = global.db.data.users[m.sender].bibitapel
            let bibitmangga = global.db.data.users[m.sender].bibitmangga
            let bibitpisang = global.db.data.users[m.sender].bibitpisang
            let {
                max
            } = xpRange(level, exp, global.multiplier)
            let sortedmoney = Object.entries(global.db.data.users).sort((a, b) => b[1].money - a[1].money)
            let sortedgold = Object.entries(global.db.data.users).sort((a, b) => b[1].gold - a[1].gold)
            let sortedarlok = Object.entries(global.db.data.users).sort((a, b) => b[1].arlok - a[1].arlok)
            let sortedlevel = Object.entries(global.db.data.users).sort((a, b) => b[1].level - a[1].level)
            let sorteddiamond = Object.entries(global.db.data.users).sort((a, b) => b[1].diamond - a[1].diamond)
            let sortedpotion = Object.entries(global.db.data.users).sort((a, b) => b[1].potion - a[1].potion)
            let sortedsampah = Object.entries(global.db.data.users).sort((a, b) => b[1].sampah - a[1].sampah)
            let sortedcommon = Object.entries(global.db.data.users).sort((a, b) => b[1].common - a[1].common)
            let sorteduncommon = Object.entries(global.db.data.users).sort((a, b) => b[1].uncommon - a[1].uncommon)
            let sortedmythic = Object.entries(global.db.data.users).sort((a, b) => b[1].mythic - a[1].mythic)
            let sortedlegendary = Object.entries(global.db.data.users).sort((a, b) => b[1].legendary - a[1].legendary)
            let usersmoney = sortedmoney.map(v => v[0])
            let usersgold = sortedgold.map(v => v[0])
            let usersarlok = sortedarlok.map(v => v[0])
            let usersdiamond = sorteddiamond.map(v => v[0])
            let userspotion = sortedpotion.map(v => v[0])
            let userssampah = sortedsampah.map(v => v[0])
            let userslevel = sortedlevel.map(v => v[0])
            let userscommon = sortedcommon.map(v => v[0])
            let usersuncommon = sorteduncommon.map(v => v[0])
            let usersmythic = sortedmythic.map(v => v[0])
            let userslegendary = sortedlegendary.map(v => v[0])

            let kambing = global.db.data.users[m.sender].kambing
            let kerbau = global.db.data.users[m.sender].kerbau
            let harimau = global.db.data.users[m.sender].harimau
            let monyet = global.db.data.users[m.sender].monyet
            let babihutan = global.db.data.users[m.sender].babihutan
            let panda = global.db.data.users[m.sender].panda
            let gajah = global.db.data.users[m.sender].gajah
            let buaya = global.db.data.users[m.sender].buaya

            let paus = global.db.data.users[m.sender].paus
            let kepiting = global.db.data.users[m.sender].kepiting
            let gurita = global.db.data.users[m.sender].gurita
            let cumi = global.db.data.users[m.sender].cumi
            let lumba = global.db.data.users[m.sender].lumba
            let lobster = global.db.data.users[m.sender].lobster
            let hiu = global.db.data.users[m.sender].hiu
            let udang = global.db.data.users[m.sender].udang
            let orca = global.db.data.users[m.sender].orca

            let number = `${PhoneNumber('+' + pasangan.replace('@s.whatsapp.net', '')).getNumber('international')}`
            let str = `╭──────━• *STATUS*
│📡 *Status:* ${premium ? "Premium": "Free"} User
│📇 *Name:* ${usrname} 
│💌 *Pasangan:* ${pasangan ? `@${pasangan.split("@")[0]}` : `❌`}
│❗ *Warn:* ${warn}
│⛔ *Banned:* No
│
│❤️️ *Health:* ${healt}
│⚡ *Stamina:* ${stamina}
│💹 *Money:* $${money}
│💳 *Bank:* $${atm}
│📊 *Level:* ${level}
│✨ *Exp:* ${exp}
│📍 *Role:* ${role}
│🎫 *Limit:* ${limit}
│${registered ? '🎨 *Age:* ' + age : ''}
╰──────────━⃝┅⃝━━────────┄⸙
${readMore}
╭──────━• *TOOLS*
│🥼 *Armor:* ${armor == 0 ? '❌' : '' || armor == 1 ? 'Leather Armor' : '' || armor == 2 ? 'Iron Armor' : '' || armor == 3 ? 'Gold Armor' : '' || armor == 4 ? 'Diamond Armor' : '' || armor == 5 ? 'Netherite Armor' : ''}
│⚔️ *Sword:* ${sword == 0 ? '❌' : '' || sword == 1 ? 'wooden sword' : '' || sword == 2 ? 'Stone sword' : '' || sword == 3 ? 'Iron sword' : '' || sword == 4 ? 'Diamond sword' : '' || sword > 0 && sword < 5 ? `Ketahanan (*${_sword}* / *${sword *100}*)` : '' || sword == 5 ? '*Netherite Sword*' : ''}
│╰ *Durability:* ${sdurability}
│⛏️ *Pickaxe:* ${pickaxe == 0 ? '❌' : '' || pickaxe == 1 ? 'wooden pickaxe' : '' || pickaxe == 2 ? 'stone pickaxe' : '' || pickaxe == 3 ? 'Iron pickaxe' : '' || pickaxe == 4 ? 'Diamond pickaxe' : '' || pickaxe == 5 ? 'Netherite pickaxe' : ''}
│╰ *Durability:* ${pdurability}
│🎣 *Fishingrod:* ${pancing == 0 ? '❌' : '' || pancing == 1 ? 'Wooden Fishingrod' : '' || pancing == 2 ? 'Iron Fishingrod' : '' || pancing == 1 ? 'Diamond Fishingrod' : '' || pancing == 1 ? 'Netherite Fishingrod' : '' }
│╰ *Durability:* ${fdurability}
│🏹 *Bow:* Cooming Soon!
╰──────────━⃝┅⃝━━────────┄⸙

╭──────━• *KANDANG*
│🐔 *Ayam:* ${ayam}    
│🐐 *Kambing:* ${kambing}
│🐄 *Sapi:* ${sapi} 
│🐃 *Kerbau:* ${kerbau}
│🐖 *Babi:* ${babi}    
│🐅 *Harimau:* ${harimau}
│🐂 *Banteng:* ${banteng} 
│🐒 *Monyet:* ${monyet}
│🐗 *Babi Hutan:* ${babihutan}
│🐼 *Panda:* ${panda}
│🐘 *Gajah:* ${gajah}
│🐊 *Buaya:* ${buaya}
│
│🥢 Bisa kamu masak */masak ayamb*
│💬 *Total Hewan:* ${ buaya + gajah + panda + babihutan + monyet + harimau + kerbau + kambing + ayam + sapi + babi + banteng } tangkapan
╰──────────━⃝┅⃝━━────────┄⸙

╭──────━• *KOLAM*
│🐋 *Orca:* ${orca}
│🐳 *Paus:* ${paus}
│🐬 *Lumba:* ${lumba}
│🦈 *Hiu:* ${hiu}
│🐟 *Ikan:* ${ikan}
│🐟 *Lele:* ${lele}
│🐡 *Bawal:* ${bawal}
│🐠 *Nila:* ${nila}
│🦀 *Kepiting:* ${kepiting}
│🦞 *Lobster:* ${lobster}
│🐙 *Gurita:* ${gurita}
│🦑 *Cumi:* ${cumi}
│🦐 *Udang:* ${udang}
│
│💬 *Total Ikan:* ${orca + udang + hiu + lobster + lumba + cumi + gurita + kepiting + paus + nila + bawal + ikan + lele + psepick + psenjata }
╰──────────━⃝┅⃝━━────────┄⸙

╭──────━• *INVENTORY*
│💎 *Diamond:* ${diamond}
│🧪 *Ramuan:* ${ramuan}
│🥤 *Potion:* ${potion}
│🗑️ *Sampah:* ${sampah}
│🥫 *Kaleng:* ${kaleng}
│📦 *Kardus:* ${kardus}
│🪵  *Wood:* ${wood}
│🕸️ *String:* ${string}
│🪙  *Gold:* ${emas}
│⛓  *Iron:* ${besi}
│🪨  *Wock:* ${rock}
│🧭 *Arloji:* ${arlok}
╰──────────━⃝┅⃝━━────────┄⸙

╭──────━• *FOOD*
│🥓 *FoodPet :* ${makananpet}
│🍖 *ayam bakar:* ${ayamb}
│🍗 *ayam goreng:* ${ayamg}
│🥘 *Rendang Sapi :* ${sapir}
│🥩 *steak sapi:* ${ssapi}
│
│🎒 *Total inv:* ${aqua + ramuan + kardus + kaleng + arlok + psepick + psenjata + common + uncommon + mythic + legendary + pet + diamond + potion + besi + emas + string + sampah + wood + rock + potion + sampah + makananpet + apel + ayamb + ayamg + sapir + ssapi } item
╰──────────━⃝┅⃝━━────────┄⸙

╭──────━• *FRUIT & SEED*
│🥭 *Mangga:* ${mangga}
│🍇 *Anggur:* ${anggur}
│🍌 *Pisang:* ${pisang}
│🍊 *Jeruk:* ${jeruk}
│🍎 *Apel:* ${apel}
│
│🌾 *Bibit Mangga:* ${bibitmangga}
│🌾 *Bibit Anggur:* ${bibitanggur}                                    
│🌾 *Bibit Pisang:* ${bibitpisang}
│🌾 *Bibit Jeruk:* ${bibitjeruk}
│🌾 *Bibit Apel:* ${bibitapel}
╰──────────━⃝┅⃝━━────────┄⸙

╭──────━• *CRATE*
│📦 *Common:* ${common}
│🛍️ *Uncommon:* ${uncommon}
│🎁 *Mythic:* ${mythic}
│🧰 *Legendary:* ${legendary}
│📫 *Pet:* ${pet}
╰──────────━⃝┅⃝━━────────┄⸙

╭──────━• *PET*
│🐴 *Kuda:* ${kuda == 0 ? '❌' : '' || kuda == 1 ? 'Level 1' : '' || kuda == 2 ? 'Level 2' : '' || kuda == 3 ? 'Level 3' : '' || kuda == 4 ? 'Level 4' : '' || kuda == 5 ? 'Level MAX' : ''}
│🦊 *Rubah:* ${rubah == 0 ? '❌' : '' || rubah == 1 ? 'Level 1' : '' || rubah == 2 ? 'Level 2' : '' || rubah == 3 ? 'Level 3' : '' || rubah == 4 ? 'Level 4' : '' || rubah == 5 ? 'Level MAX' : ''}
│🐱 *Kucing:* ${kucing == 0 ? '❌' : '' || kucing == 1 ? 'Level 1' : '' || kucing == 2 ? 'Level 2' : '' || kucing == 3 ? 'Level 3' : '' || kucing == 4 ? 'Level 4' : '' || kucing == 5 ? 'Level MAX' : ''}
│🐉 *Naga:* ${naga == 0 ? '❌' : '' || naga == 1 ? 'Level 1' : '' || naga == 2 ? 'Level 2' : '' || naga == 3 ? 'Level 3' : '' || naga == 4 ? 'Level 4' : '' || naga == 5 ? 'Level MAX' : ''}
│🦜 *Phonix:* ${phonix == 0 ? '❌' : '' || phonix == 1 ? 'Level 1' : '' || phonix == 2 ? 'Level 2' : '' || phonix == 3 ? 'Level 3' : '' || phonix == 4 ? 'Level 4' : '' || phonix == 5 ? 'Level MAX' : ''}
│🐎 *Centaur:* ${centaur == 0 ? '❌' : '' || centaur == 1 ? 'Level 1' : '' || centaur == 2 ? 'Level 2' : '' || centaur == 3 ? 'Level 3' : '' || centaur == 4 ? 'Level 4' : '' || centaur == 5 ? 'Level MAX' : ''}
│🦅 *Griffin:* ${griffin == 0 ? '❌' : '' || griffin == 1 ? 'Level 1' : '' || griffin == 2 ? 'Level 2' : '' || griffin == 3 ? 'Level 3' : '' || griffin == 4 ? 'Level 4' : '' || griffin == 5 ? 'Level MAX' : ''}
│🐺 *Serigala:* ${serigala == 0 ? '❌' : '' || serigala == 1 ? 'Level 1' : '' || serigala == 2 ? 'Level 2' : '' || serigala == 3 ? 'Level 3' : '' || naga == 4 ? 'Level 4' : '' || serigala == 5 ? 'Level MAX' : ''}
╰──────────━⃝┅⃝━━────────┄⸙

╭ ${htki} *PROGSES* ${htka}
╰──┬─┄
╭──┴─────────┄⸙
╰┫ 📊 *Level:* ${level} ➠  ${level + 1}
╭┫ ✨ *Exp:* ${exp} ➠ ${max}
╰──┬─┄
╭──┴─────────┄⸙
╰┫🦊 *Rubah :* ${rubah == 0 ? '❌' : '' || rubah > 0 && rubah < 5 ? `Level *${rubah}* ➠ *${rubah + 1}*\n╭┫Exp *${_rubah}* -> *${rubah *100}*` : '' || rubah == 5 ? '*Max Level*' : ''}
╰──┬─┄
╭──┴─────────┄⸙
╰┫🐱 *Kucing :* ${kucing == 0 ? '❌' : '' || kucing > 0 && kucing < 5 ? `Level *${kucing}* ➠ *${kucing + 1}*\n╭┫Exp *${_kucing}* -> *${kucing *100}*` : '' || kucing == 5 ? '*Max Level*' : ''}
╰──┬─┄
╭──┴─────────┄⸙
╰┫🐴 *Kuda :* ${kuda == 0 ? '❌' : '' || kuda > 0 && kuda < 5 ? `Level *${kuda}* ➠ *${kuda + 1}*\n╭┫Exp *${_kuda}* -> *${kuda *100}*` : '' || kuda == 5 ? '*Max Level*' : ''}
╰──┬─┄
╭──┴─────────┄⸙
╰┫🐉 *Naga :* ${naga == 0 ? '❌' : '' || naga > 0 && naga < 5 ? `Level *${naga}* ➠ *${naga + 1}*\n╭┫Exp *${_naga}* -> *${naga *100}*` : '' || naga == 5 ? '*Max Level*' : ''}
╰──┬─┄
╭──┴─────────┄⸙
╰┫🦜 *Phonix :* ${phonix == 0 ? '❌' : '' || phonix > 0 && phonix < 5 ? `Level *${phonix}* ➠ *${phonix + 1}*\n╭┫Exp *${_phonix}* -> *${phonix *100}*` : '' || phonix == 5 ? '*Max Level*' : ''}
╰──┬─┄
╭──┴─────────┄⸙
╰┫🐎 *Centaur :* ${centaur == 0 ? '❌' : '' || centaur > 0 && centaur < 5 ? `Level *${centaur}* ➠ *${centaur + 1}*\n╭┫Exp *${_centaur}* -> *${centaur *100}*` : '' || centaur == 5 ? '*Max Level*' : ''}
╰──┬─┄
╭──┴─────────┄⸙
╰┫🦅 *Griffin :* ${griffin == 0 ? '❌' : '' || griffin > 0 && griffin < 5 ? `Level *${griffin}* ➠ *${griffin + 1}*\n╭┫Exp *${_griffin}* -> *${griffin *100}*` : '' || griffin == 5 ? '*Max Level*' : ''}
╰──┬─┄
╭──┴─────────┄⸙
╰┫🐺 *Serigala :* ${serigala == 0 ? '❌' : '' || serigala > 0 && serigala < 5 ? `Level *${serigala}* ➠ *${serigala + 1}*\n╭┫Exp *${_serigala}* -> *${serigala *100}*` : '' || serigala == 5 ? '*Max Level*' : ''}
╰────────────┄⸙

╭──────━• *COOLDOWN*
│ *🏹 Berburu :* ${lastberburu > 0 ? '❌' : '✅'}
│ *⛰️ Adventure :* ${lastadventure > 0 ? '❌' : '✅'}
│ *⚔️ Duel :* ${lastduel > 0 ? '❌' : '✅'}
│ *🛡️ War :* ${lastwar > 0 ? '❌'  : '✅'}
│ *🎃 Dungeon :* ${lastdungeon > 0 ? '❌' : '✅'}
│ *💱 Berdagang :* ${lastdagang > 0 ? '❌'  : '✅'}
│ *🧺 Berkebun :* ${lastberkebon > 0 ? '❌'  : '✅'}
│ *⛏️ Mining :* ${lastmining > 0 ? '❌' : '✅'}
│ *🎣 Fishing :* ${lastfishing > 0 ? '❌'  : '✅'}
│ *💰 Bansos :* ${lastbansos > 0 ? '❌' : '✅'}
│
│ *🕐 Hourly :* ${lasthourly > 0 ? '❌' : '✅'}
│ *📦 Claim :* ${lastclaim > 0 ? '❌' : '✅'}
│ *🎁 Weekly :* ${lastweekly > 0 ? '❌' : '✅'}
│ *📮 Monthly :* ${lastmonthly > 0 ? '❌' : '✅'}
╰──────────━⃝┅⃝━━────────┄⸙

╭──────━• *ACHIEVEMENT*
│📊 *Top level:* ${userslevel.indexOf(m.sender) + 1} / ${userslevel.length}
│💹 *Top Money:* ${usersmoney.indexOf(m.sender) + 1} / ${usersmoney.length}
│🪙  *Top Gold:* ${usersgold.indexOf(m.sender) + 1} / ${usersgold.length}
│💎 *Top Diamond:* ${usersdiamond.indexOf(m.sender) + 1} / ${usersdiamond.length}
│🧭 *Top Arloji:* ${usersarlok.indexOf(m.sender) + 1} / ${usersarlok.length}
│🥤 *Top Potion:* ${userspotion.indexOf(m.sender) + 1} / ${userspotion.length}
│📦 *Top Common:* ${userscommon.indexOf(m.sender) + 1} / ${userscommon.length}
│🛍️ *Top Uncommon:* ${usersuncommon.indexOf(m.sender) + 1} / ${usersuncommon.length}
│🎁 *Top Mythic:* ${usersmythic.indexOf(m.sender) + 1} / ${usersmythic.length}
│🧰 *Top Legendary:* ${userslegendary.indexOf(m.sender) + 1} / ${userslegendary.length}
│🗑️ *Top Sampah:* ${userssampah.indexOf(m.sender) + 1} / ${userssampah.length}
╰──────────━⃝┅⃝━━────────┄⸙
`
            await conn.sendFthumb(m.chat, 'INVENTORY', str, imgr + 'inventory', '', m)
            //await conn.sendFile(m.chat, topImg || imgr + "INVENTORY", '', str, m, null, { mentions: conn.parseMention(str) })
        } else if (args[0] == '4') {
            // Inventory 4
            let health = global.db.data.users[m.sender].health
            let armor = global.db.data.users[m.sender].armor
            // let warn = global.db.data.users[m.sender].warn
            let pet = global.db.data.users[m.sender].pet
            let kucing = global.db.data.users[m.sender].kucing
            let _kucing = global.db.data.users[m.sender].anakkucing
            let rubah = global.db.data.users[m.sender].rubah
            let _rubah = global.db.data.users[m.sender].anakrubah
            let serigala = global.db.data.users[m.sender].serigala
            let _serigala = global.db.data.users[m.sender].anakserigala
            let naga = global.db.data.users[m.sender].naga
            let _naga = global.db.data.users[m.sender].anaknaga
            let kuda = global.db.data.users[m.sender].kuda
            let _kuda = global.db.data.users[m.sender].anakkuda
            let phonix = global.db.data.users[m.sender].phonix
            let _phonix = global.db.data.users[m.sender].anakphonix
            let griffin = global.db.data.users[m.sender].griffin
            let _griffin = global.db.data.users[m.sender].anakgriffin
            let kyubi = global.db.data.users[m.sender].kyubi
            let _kyubi = global.db.data.users[m.sender].anakkyubi
            let centaur = global.db.data.users[m.sender].centaur
            let _centaur = global.db.data.users[m.sender].anakcentaur
            let diamond = global.db.data.users[m.sender].diamond
            let potion = global.db.data.users[m.sender].potion
            let ramuan = global.db.data.users[m.sender].ramuan
            let common = global.db.data.users[m.sender].common
            let makananpet = global.db.data.users[m.sender].makananpet
            let makanannaga = global.db.data.users[m.sender].makanannaga
            let makananphonix = global.db.data.users[m.sender].makananphonix
            let makanangriffin = global.db.data.users[m.sender].makanangriffin
            let makanankyubi = global.db.data.users[m.sender].makanankyubi
            let makanancentaur = global.db.data.users[m.sender].makanancentaur
            let uncommon = global.db.data.users[m.sender].uncommon
            let mythic = global.db.data.users[m.sender].mythic
            let legendary = global.db.data.users[m.sender].legendary
            let level = global.db.data.users[m.sender].level
            let money = global.db.data.users[m.sender].money
            let exp = global.db.data.users[m.sender].exp
            let sampah = global.db.data.users[m.sender].sampah
            let anggur = global.db.data.users[m.sender].anggur
            let jeruk = global.db.data.users[m.sender].jeruk
            let apel = global.db.data.users[m.sender].apel
            let mangga = global.db.data.users[m.sender].mangga
            let pisang = global.db.data.users[m.sender].pisang
            let bibitanggur = global.db.data.users[m.sender].bibitanggur
            let bibitjeruk = global.db.data.users[m.sender].bibitjeruk
            let bibitapel = global.db.data.users[m.sender].bibitapel
            let bibitmangga = global.db.data.users[m.sender].bibitmangga
            let bibitpisang = global.db.data.users[m.sender].bibitpisang
            let gardenboxs = global.db.data.users[m.sender].gardenboxs
            let nabung = global.db.data.users[m.sender].nabung
            let bank = global.db.data.users[m.sender].bank
            let limit = global.db.data.users[m.sender].limit
            let cupon = global.db.data.users[m.sender].cupon
            let tiketcoin = global.db.data.users[m.sender].tiketcoin
            let tiketm = global.db.data.users[m.sender].healtmonster
            let aqua = global.db.data.users[m.sender].aqua
            let expg = global.db.data.users[m.sender].expg
            let boxs = global.db.data.users[m.sender].boxs
            let botol = global.db.data.users[m.sender].botol
            let wood = global.db.data.users[m.sender].wood
            let rock = global.db.data.users[m.sender].rock
            let iron = global.db.data.users[m.sender].iron
            let sword = global.db.data.users[m.sender].sword
            let string = global.db.data.users[m.sender].string
            let kaleng = global.db.data.users[m.sender].kaleng
            let kardus = global.db.data.users[m.sender].kardus
            let berlian = global.db.data.users[m.sender].berlian
            let emas = global.db.data.users[m.sender].emas
            let emaspro = global.db.data.users[m.sender].emasbatang
            let hero = global.db.data.users[m.sender].hero
            let exphero = global.db.data.users[m.sender].exphero
            let {
                max
            } = xpRange(level, exp, global.multiplier)
            // let name = m.fromMe ? conn.user : conn.contacts[m.sender]
            let name = m.sender
            let sortedmoney = Object.entries(global.db.data.users).sort((a, b) => b[1].money - a[1].money)
            let sortedlevel = Object.entries(global.db.data.users).sort((a, b) => b[1].level - a[1].level)
            let sorteddiamond = Object.entries(global.db.data.users).sort((a, b) => b[1].diamond - a[1].diamond)
            let sortedpotion = Object.entries(global.db.data.users).sort((a, b) => b[1].potion - a[1].potion)
            let sortedsampah = Object.entries(global.db.data.users).sort((a, b) => b[1].sampah - a[1].sampah)
            let sortedcommon = Object.entries(global.db.data.users).sort((a, b) => b[1].common - a[1].common)
            let sorteduncommon = Object.entries(global.db.data.users).sort((a, b) => b[1].uncommon - a[1].uncommon)
            let sortedmythic = Object.entries(global.db.data.users).sort((a, b) => b[1].mythic - a[1].mythic)
            let sortedlegendary = Object.entries(global.db.data.users).sort((a, b) => b[1].legendary - a[1].legendary)
            let usersmoney = sortedmoney.map(v => v[0])
            let usersdiamond = sorteddiamond.map(v => v[0])
            let userspotion = sortedpotion.map(v => v[0])
            let userssampah = sortedsampah.map(v => v[0])
            let userslevel = sortedlevel.map(v => v[0])
            let userscommon = sortedcommon.map(v => v[0])
            let usersuncommon = sorteduncommon.map(v => v[0])
            let usersmythic = sortedmythic.map(v => v[0])
            let userslegendary = sortedlegendary.map(v => v[0])
            let str = `
Inventory *${await conn.getName(name)}*

Health: *${health}*
Armor: *${armor == 0 ? 'Tidak Punya' : '' || armor == 1 ? 'Leather Armor' : '' || armor == 2 ? 'Iron Armor' : '' || armor == 3 ? 'Gold Armor' : '' || armor == 4 ? 'Diamond Armor' : '' || armor == 5 ? 'Netherite Armor' : ''}*
Money: *${money}*
Limit: *${limit}*
Level: *${level}*
Exp: *${exp}*
Atm: *${bank}*
Cupon: *${cupon}*
Expg: *${expg}*
Tiketm: *${tiketm}*
Tiketcoin: *${tiketcoin}*

*Inventory*
Potion: *${potion}*
Ramuan: *${ramuan}*
Iron: *${iron}*
String: *${string}*
Sword: *${sword}*
Sampah: *${sampah}*
Wood: *${wood}*
Rock: *${rock}*
Aqua: *${aqua}*
Makanan Pet: *${makananpet}*
Makanan Phonix: *${makananphonix}*
Makanan Naga: *${makanannaga}*
Makanan Griffin: *${makanangriffin}*
Makanan Kyubi: *${makanankyubi}*
Makanan Centaur: *${makanancentaur}*
Total inv: *${diamond + potion + ramuan + sampah + wood + sword + iron + string + makananpet + makananphonix + makanannaga + makanangriffin + makanankyubi + makanancentaur}* item

*Crate*
Boxs: *${boxs}*
Common: *${common}*
Uncommon: *${uncommon}*
Mythic: *${mythic}*
Legendary: *${legendary}*.
Pet: *${pet}*
Gardenboxs: *${gardenboxs}*

*Fruits*
Mangga: ${mangga}
Anggur: ${anggur}
Pisang: ${pisang}
Jeruk: ${jeruk}
Apel: ${apel}

*Seeds*
Bibit Mangga: ${bibitmangga}
Bibit Anggur: ${bibitanggur}
Bibit Pisang: ${bibitpisang}
Bibit Jeruk: ${bibitjeruk}
Bibit Apel: ${bibitapel}

*Trash Man*
Kardus: ${kardus}
Kaleng: ${kaleng}
Botol: ${botol}

*Mining*
Berlian: ${berlian}
Emas: ${emas}
Diamond: ${diamond}

*Hero*
My Hero: *${hero == 0 ? 'Tidak Punya' : '' || hero == 1 ? 'Level 1' : '' || hero == 2 ? 'Level 2' : '' || hero == 3 ? 'Level 3' : '' || hero == 4 ? 'Level 4' : '' || hero == 5 ? 'Level 5' : '' || hero == 6 ? 'Level 6' : '' || hero == 7 ? 'Level 7' : '' || hero == 8 ? 'Level 8' : '' || hero == 9 ? 'Level 9' : '' || hero == 10 ? 'Level 10' : '' || hero == 11 ? 'Level 11' : '' || hero == 12 ? 'Level 12' : '' || hero == 13 ? 'Level 13' : '' || hero == 14 ? 'Level 14' : '' || hero == 15 ? 'Level 15' : '' || hero == 16 ? 'Level 16' : '' || hero == 17 ? 'Level 17' : '' || hero == 18 ? 'Level 18' : '' || hero == 19 ? 'Level 19' : '' || hero == 20 ? 'Level 20' : '' || hero == 21 ? 'Level 21' : '' || hero == 22 ? 'Level 22' : '' || hero == 23 ? 'Level 23' : '' || hero == 24 ? 'Level 24' : '' || hero == 25 ? 'Level 25' : '' || hero == 26 ? 'Level 26' : '' || hero == 27 ? 'Level 27' : '' || hero == 28 ? 'Level 28' : '' || hero == 29 ? 'Level 29' : '' || hero == 30 ? 'Level 30' : '' || hero == 31 ? 'Level 31' : '' || hero == 32 ? 'Level 32' : '' || hero == 33 ? 'Level 33' : '' || hero == 34 ? 'Level 34' : '' || hero == 35 ? 'Level 35' : '' || hero == 36 ? 'Level 36' : '' || hero == 37 ? 'Level 37'  : '' || hero == 38 ? 'Level 38' : '' || hero == 39 ? 'Level 39' : '' || hero == 40 ? 'Level MAX' : ''}*

*Pet*
Kucing: *${kucing == 0 ? 'Tidak Punya' : '' || kucing == 1 ? 'Level 1' : '' || kucing == 2 ? 'Level 2' : '' || kucing == 3 ? 'Level 3' : '' || kucing == 4 ? 'Level 4' : '' || kucing == 5 ? 'Level MAX' : ''}*
Kuda: *${kuda == 0 ? 'Tidak Punya' : '' || kuda == 1 ? 'Level 1' : '' || kuda == 2 ? 'Level 2' : '' || kuda == 3 ? 'Level 3' : '' || kuda == 4 ? 'Level 4' : '' || kuda == 5 ? 'Level MAX' : ''}*
Naga: *${naga == 0 ? 'Tidak Punya' : '' || naga == 1 ? 'Level 1' : '' || naga == 2 ? 'Level 2' : '' || naga == 3 ? 'Level 3' : '' || naga == 4 ? 'Level 4' : '' || naga == 5 ? 'Level 5' : '' || naga == 6 ? 'Level 6' : '' || naga == 7 ? 'Level 7' : '' || naga == 8 ? 'Level 8' : '' || naga == 9 ? 'Level 9' : '' || naga == 10 ? 'Level 10' : '' || naga == 11 ? 'Level 11' : '' || naga == 12 ? 'Level 12' : '' || naga == 13 ? 'Level 13' : '' || naga == 14 ? 'Level 14' : '' || naga == 15 ? 'Level 15' : '' || naga == 16 ? 'Level 16' : '' || naga == 17 ? 'Level 17' : '' || naga == 18 ? 'Level 18' : '' || naga == 19 ? 'Level 19' : '' || naga == 20 ? 'Level MAX' : ''}*
Kyubi: *${kyubi == 0 ? 'Tidak Punya' : '' || kyubi == 1 ? 'Level 1' : '' || kyubi == 2 ? 'Level 2' : '' || kyubi == 3 ? 'Level 3' : '' || kyubi == 4 ? 'Level 4' : '' || kyubi == 5 ? 'Level 5' : '' || kyubi == 6 ? 'Level 6' : '' || kyubi == 7 ? 'Level 7' : '' || kyubi == 8 ? 'Level 8' : '' || kyubi == 9 ? 'Level 9' : '' || kyubi == 10 ? 'Level 10' : '' || kyubi == 11 ? 'Level 11' : '' || kyubi == 12 ? 'Level 12' : '' || kyubi == 13 ? 'Level 13' : '' || kyubi == 14 ? 'Level 14' : '' || kyubi == 15 ? 'Level 15' : '' || kyubi == 16 ? 'Level 16' : '' || kyubi == 17 ? 'Level 17' : '' || kyubi == 18 ? 'Level 18' : '' || kyubi == 19 ? 'Level 19' : '' || kyubi == 20 ? 'Level MAX' : ''}*
Centaur: *${centaur == 0 ? 'Tidak Punya' : '' || centaur == 1 ? 'Level 1' : '' || centaur == 2 ? 'Level 2' : '' || centaur == 3 ? 'Level 3' : '' || centaur == 4 ? 'Level 4' : '' || centaur == 5 ? 'Level 5' : '' || centaur == 6 ? 'Level 6' : '' || centaur == 7 ? 'Level 7' : '' || centaur == 8 ? 'Level 8' : '' || centaur == 9 ? 'Level 9' : '' || centaur == 10 ? 'Level 10' : '' || centaur == 11 ? 'Level 11' : '' || centaur == 12 ? 'Level 12' : '' || centaur == 13 ? 'Level 13' : '' || centaur == 14 ? 'Level 14' : '' || centaur == 15 ? 'Level 15' : '' || centaur == 16 ? 'Level 16' : '' || centaur == 17 ? 'Level 17' : '' || centaur == 18 ? 'Level 18' : '' || centaur == 19 ? 'Level 19' : '' || centaur == 20 ? 'Level MAX' : ''}*
Rubah: *${rubah == 0 ? 'Tidak Punya' : '' || rubah == 1 ? 'Level 1' : '' || rubah == 2 ? 'Level 2' : '' || rubah == 3 ? 'Level 3' : '' || rubah == 4 ? 'Level 4' : '' || rubah == 5 ? 'Level MAX' : ''}*  
Phonix: *${phonix == 0 ? 'Tidak Punya' : '' || phonix == 1 ? 'Level 1' : '' || phonix == 2 ? 'Level 2' : '' || phonix == 3 ? 'Level 3' : '' || phonix == 4 ? 'Level 4' : '' || phonix == 5 ? 'Level 5' : '' || phonix == 6 ? 'Level 6' : '' || phonix == 7 ? 'Level 7' : '' || phonix == 8 ? 'Level 8' : '' || phonix == 9 ? 'Level 9' : '' || phonix == 10 ? 'Level 10' : '' || phonix == 11 ? 'Level 11' : '' || phonix == 12 ? 'Level 12' : '' || phonix == 13 ? 'Level 13' : '' || phonix == 14 ? 'Level 14' : '' || phonix == 15 ? 'Level MAX' : ''}*
Griffin: *${griffin == 0 ? 'Tidak Punya' : '' || griffin == 1 ? 'Level 1' : '' || griffin == 2 ? 'Level 2' : '' || griffin == 3 ? 'Level 3' : '' || griffin == 4 ? 'Level 4' : '' || griffin == 5 ? 'Level 5' : '' || griffin == 6 ? 'Level 6' : '' || griffin == 7 ? 'Level 7' : '' || griffin == 8 ? 'Level 8' : '' || griffin == 9 ? 'Level 9' : '' || griffin == 10 ? 'Level 10' : '' || griffin == 11 ? 'Level 11' : '' || griffin == 12 ? 'Level 12' : '' || griffin == 13 ? 'Level 13' : '' || griffin == 14 ? 'Level 14' : '' || griffin == 15 ? 'Level MAX' : ''}*
Serigala: *${serigala == 0 ? 'Tidak Punya' : '' || serigala == 1 ? 'Level 1' : '' || serigala == 2 ? 'Level 2' : '' || serigala == 3 ? 'Level 3' : '' || serigala == 4 ? 'Level 4' : '' || serigala == 5 ? 'Level 5' : '' || serigala == 6 ? 'Level 6' : '' || serigala == 7 ? 'Level 7' : '' || serigala == 8 ? 'Level 8' : '' || serigala == 9 ? 'Level 9' : '' || serigala == 10 ? 'Level 10' : '' || serigala == 11 ? 'Level 11' : '' || serigala == 12 ? 'Level 12' : '' || serigala == 13 ? 'Level 13' : '' || serigala == 14 ? 'Level 14' : '' || serigala == 15 ? 'Level MAX' : ''}*\n

╭ ${htki} *PROGSES* ${htka}
╰──┬─┄
╭──┴─────────┄⸙
╰┫ Level *${level}* To Level *${level}*
││ Exp *${exp}* -> *${max}*
╭┫ ✨ *Exp:* ${exp} ➠ ${max}
╰──┬─┄
╭──┴─────────┄⸙
╰┫Hero ${hero == 0 ? 'Tidak Punya' : '' || hero > 0 && hero < 40 ? `Level *${hero}* To level *${hero + 1}*\n╭┫Exp *${exphero}* -> *${hero *500}*` : '' || hero == 40 ? '*Max Level*' : ''}
╰──┬─┄
╭──┴─────────┄⸙
╰┫Rubah ${rubah == 0 ? 'Tidak Punya' : '' || rubah > 0 && rubah < 5 ? `Level *${rubah}* To level *${rubah + 1}*\n╭┫Exp *${_rubah}* -> *${rubah *1000}*` : '' || rubah == 5 ? '*Max Level*' : ''}
╰──┬─┄
╭──┴─────────┄⸙
╰┫Kucing ${kucing == 0 ? 'Tidak Punya' : '' || kucing > 0 && kucing < 5 ? `Level *${kucing}* To level *${kucing + 1}*\n╭┫Exp *${_kucing}* -> *${kucing *1000}*` : '' || kucing == 5 ? '*Max Level*' : ''}
╰──┬─┄
╭──┴─────────┄⸙
╰┫Kuda ${kuda == 0 ? 'Tidak Punya' : '' || kuda > 0 && kuda < 5 ? `Level *${kuda}* To level *${kuda + 1}*\n╭┫Exp *${_kuda}* -> *${kuda *1000}*` : '' || kuda == 5 ? '*Max Level*' : ''}
╰──┬─┄
╭──┴─────────┄⸙
╰┫Naga ${naga == 0 ? 'Tidak Punya' : '' || naga > 0 && naga < 20 ? `Level *${naga}* To level *${naga + 1}*\n╭┫Exp *${_naga}* -> *${naga *10000}*` : '' || naga == 20 ? '*Max Level*' : ''}
╰──┬─┄
╭──┴─────────┄⸙
╰┫Phonix ${phonix == 0 ? 'Tidak Punya' : '' || phonix > 0 && phonix < 15 ? `Level *${phonix}* To level *${phonix + 1}*\n╭┫Exp *${_phonix}* -> *${phonix *10000}*` : '' || phonix == 15 ? '*Max Level*' : ''}
╰──┬─┄
╭──┴─────────┄⸙
╰┫Kyubi ${kyubi == 0 ? 'Tidak Punya' : '' || kyubi > 0 && kyubi < 20 ? `Level *${kyubi}* To level *${kyubi + 1}*\n╭┫Exp *${_kyubi}* -> *${kyubi *10000}*` : '' || kyubi == 20 ? '*Max Level*' : ''}
╰──┬─┄
╭──┴─────────┄⸙
╰┫Centaur ${centaur == 0 ? 'Tidak Punya' : '' || centaur > 0 && centaur < 20 ? `Level *${centaur}* To level *${centaur + 1}*\n╭┫Exp *${_centaur}* -> *${centaur *10000}*` : '' || centaur == 20 ? '*Max Level*' : ''}
╰──┬─┄
╭──┴─────────┄⸙
╰┫Griffin ${griffin == 0 ? 'Tidak Punya' : '' || griffin > 0 && griffin < 15 ? `Level *${griffin}* To level *${griffin + 1}*\n╭┫Exp *${_griffin}* -> *${griffin *10000}*` : '' || griffin == 15 ? '*Max Level*' : ''}
╰──┬─┄
╭──┴─────────┄⸙
╰┫Serigala ${serigala == 0 ? 'Tidak Punya' : '' || serigala > 0 && serigala < 15 ? `Level *${serigala}* To level *${serigala + 1}*\n╭┫Exp *${_serigala}* -> *${serigala *10000}*` : '' || serigala == 15? '*Max Level*' : ''}
╰────────────────\n\n
*Achievement*
1.Top level *${userslevel.indexOf(m.sender) + 1}* dari *${userslevel.length}*
2.Top Money *${usersmoney.indexOf(m.sender) + 1}* dari *${usersmoney.length}*
3.Top Diamond *${usersdiamond.indexOf(m.sender) + 1}* dari *${usersdiamond.length}*
4.Top Potion *${userspotion.indexOf(m.sender) + 1}* dari *${userspotion.length}*
5.Top Common *${userscommon.indexOf(m.sender) + 1}* dari *${userscommon.length}*
6.Top Uncommon *${usersuncommon.indexOf(m.sender) + 1}* dari *${usersuncommon.length}*
7.Top Mythic *${usersmythic.indexOf(m.sender) + 1}* dari *${usersmythic.length}*
8.Top Legendary *${userslegendary.indexOf(m.sender) + 1}* dari *${userslegendary.length}*
9.Top Sampah *${userssampah.indexOf(m.sender) + 1}* dari *${userssampah.length}*
\n${readMore}
`.trim()
            await conn.sendFthumb(m.chat, 'INVENTORY', str, imgr + 'inventory', '', m)
            //await conn.sendFile(m.chat, topImg || imgr + "INVENTORY", '', str, m, null, { mentions: conn.parseMention(str) })
        } else if (args[0] == '5') {
            // Inventory kolam
            let paus = global.db.data.users[m.sender].paus
            let kepiting = global.db.data.users[m.sender].kepiting
            let gurita = global.db.data.users[m.sender].gurita
            let cumi = global.db.data.users[m.sender].cumi
            let buntal = global.db.data.users[m.sender].buntal
            let dory = global.db.data.users[m.sender].dory
            let lumba = global.db.data.users[m.sender].lumba
            let lobster = global.db.data.users[m.sender].lobster
            let hiu = global.db.data.users[m.sender].hiu
            let udang = global.db.data.users[m.sender].udang
            let ikan = global.db.data.users[m.sender].ikan
            let orca = global.db.data.users[m.sender].orca
            let pancingan = global.db.data.users[m.sender].pancingan
            let _pancingan = global.db.data.users[m.sender].anakpancingan
            let aineh = `
*Fish Pond*
Hiu: ${hiu}
Ikan: ${ikan}
Dory: ${dory}
Orca: ${orca}
Paus: ${paus}
Cumi: ${cumi}
Gurita: ${gurita}
Buntal: ${buntal}
Udang: ${udang}
Lumba²: ${lumba}
Lobster: ${lobster}
Kepiting: ${kepiting}

*Level Pancingan:*
Pancingan: *${pancingan == 0 ? 'Tidak Punya' : '' || pancingan == 1 ? 'Level 1' : '' || pancingan == 2 ? 'Level 2' : '' || pancingan == 3 ? 'Level 3' : '' || pancingan == 4 ? 'Level 4' : '' || pancingan == 5 ? 'Level MAX' : ''}*

╭────────────────
╰┫pancingan ${pancingan == 0 ? 'Tidak Punya' : '' || pancingan > 0 && pancingan < 5 ? `Level *${pancingan}* To level *${pancingan + 1}*\n╭┫Exp *${_pancingan}* -> *${pancingan *10000}*` : '' || pancingan == 5 ? '*Max Level*' : ''}
╰────────────────
`.trim()
            await conn.sendFthumb(m.chat, 'INVENTORY', aineh, imgr + 'inventory', '', m)
            //await conn.sendFile(m.chat, topImg || imgr + "INVENTORY", '', aineh, m, null, { mentions: conn.parseMention(aineh) })
        }
    }
}
handler.help = ['inventory', 'inv']
handler.tags = ['rpg']
handler.command = /^(inv(entory)?|bal(ance)?|money|e?xp)$/i
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4201)

async function topImage(data, img) {
    const topBuffer = await new canvafy.Top()
        .setOpacity(0.6)
        .setScoreMessage("money:") //(Preferred Option)
        .setabbreviateNumber(true) //(Preferred Option)
        .setBackground("image", img) //(Preferred Option)
        .setColors({
            box: '#212121',
            username: '#ffffff',
            score: '#ffffff',
            firstRank: '#f7c716',
            secondRank: '#9e9e9e',
            thirdRank: '#94610f'
        }) //(Preferred Option)
        .setUsersData(data)
        .build();
    return topBuffer;
}