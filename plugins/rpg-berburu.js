/*let handler = async (m, { conn }) => {
  let __timers = (new Date() - global.db.data.users[m.sender].lastberburu)
  let _timers = (500000 - __timers)
  let timers = clockString(_timers)
  let user = global.db.data.users[m.sender]

  if (new Date() - global.db.data.users[m.sender].lastberburu > 500000) {
    let attempts = 0;
    let habitats = {
      'Hutan 🌿': ['🐃 Banteng', '🐅 Harimau', '🐐 Kambing', '🐒 Monyet', '🐗 Babihutan', '🐖 Babi'],
      'Sabana 🦁': ['🐘 Gajah', '🐐 Kambing', '🐄 Sapi', '🐖 Babi'],
      'Taman Panda 🐼': ['🐼 Panda'],
      'Danau 🐊': ['🐊 Buaya', '🐄 Sapi', '🐖 Babi'],
      'Lembah 🐂': ['🐂 Kerbau', '🐄 Sapi', '🐖 Babi'],
      'Kebun 🐔': ['🐔 Ayam']
    }
    let results = {}

    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomAnimal(habitat) {
      let animalsInHabitat = habitats[habitat];
      return animalsInHabitat[Math.floor(Math.random() * animalsInHabitat.length)];
    }

    function displayResults() {
      let res = `*🏞️ HASIL BERBURU ${conn.getName(m.sender)} 🏞️*\n\n`;
      for (let habitat in results) {
        res += `*${habitat}*\n`;
        for (let animal in results[habitat]) {
          let count = results[habitat][animal];
          let animalName = animal.split(' ')[1];
          res += `${animal}: ${count} ekor\n`;
          user[animalName.toLowerCase()] += count;
        }
        res += '\n';
      }
      res += `*${author}* 🏕️`;
      conn.reply(m.chat, res, null);
    }

    m.reply(`🏞️ *${conn.getName(m.sender)} Sedang Berburu 🌿*\n\n`);
    
    let interval = setInterval(() => {
      attempts++;
      let habitat = Object.keys(habitats)[Math.floor(Math.random() * Object.keys(habitats).length)];
      let animal = getRandomAnimal(habitat);
      if (!results[habitat]) results[habitat] = {};
      if (!results[habitat][animal]) results[habitat][animal] = 0;
      results[habitat][animal] += getRandomNumber(1, 5);
      m.reply(`*🌿 HABITAT: ${habitat} 🌿*\n${animal}: ${results[habitat][animal]} ekor`);
      
      if (attempts === getRandomNumber(3, 7)) {
        clearInterval(interval);
        setTimeout(() => displayResults(), 2000);
        user.lastberburu = new Date() * 1;
      }
    }, 5000);

  } else {
    let hsl = `*⏳ HASIL BERBURU ${conn.getName(m.sender)} ⏳*\n\n`;
    let isEmpty = true;
    for (let animal in user) {
      if (user[animal] > 0) {
        hsl += `${animal}: ${user[animal]} ekor\n`;
        isEmpty = false;
      }
    }
    if (isEmpty) hsl += 'Tidak ada hewan yang kamu dapatkan.\n';
    hsl += `\n*${author}* 🏕️`;
    m.reply(hsl);
  }
}

handler.help = ['berburu']
handler.tags = ['rpg']
handler.command = /^(berburu)$/i
handler.group = true

export default handler

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return ['\n' + d, ' *Hari ☀️*\n ', h, ' *Jam 🕐*\n ', m, ' *Menit ⏰*\n ', s, ' *Detik ⏱️* '].map(v => v.toString().padStart(2, 0)).join('')
}*/

//const cooldown = 1000 // 1 detik
//const cooldown = 60000 // 1 menit
//const cooldown = 3600000 // 1 jam
//const cooldown = 86400000 // 1 hari
//const cooldown = 2592000000 // 1 bulan

const cooldown = 259200000
const cooldownn = 10000

function ranNumb(min = null, max = null) {
	if (max !== null) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	} else {
		return Math.floor(Math.random() * min) + 1
	}
}

let handler = async (m, { conn, usedPrefix }) => {
	let user = global.db.data.users[m.sender]
	if (new Date - user.lastberburu <= cooldown) return m.reply(`📍 Sudah cukup perburuan kali ini\nGunakan waktu yang ada untuk beristirahat, perburuan selanjutnya dapat dimulai dalam . . .\n🕖 *${((user.lastberburu + cooldown) - new Date()).toTimeString()}*`)
        if (user.sword == 0) return m.reply(`Perlu *${usedPrefix}craft* sword terlebih dahulu.\n\nAnda memiliki :\n━ ⚔️ ${user.sword} sword`)
	let buruan = [
		{"hewan": 0}, {"hewan": 0}, {"hewan": 0}, {"hewan": 0}, {"hewan": 0}, {"hewan": 0},
		{"hewan": 0}, {"hewan": 0}, {"hewan": 0}, {"hewan": 0}, {"hewan": 0}, {"hewan": 0}
	]

	for (let x of buruan) {
		let random = ranNumb(0, 6)
		x.hewan += random
	}

        let gmbrt = 'https://telegra.ph/file/295a6d5105771875e1797.jpg'
	let hsl = `[ *Perburuan Selesai* ]\nHasil tangkapan hari ini :

 *🐂 = [ ${buruan[0].hewan} ]*			 *🐃 = [ ${buruan[6].hewan} ]*
 *🐅 = [ ${buruan[1].hewan} ]*			 *🐮 = [ ${buruan[7].hewan} ]*
 *🐘 = [ ${buruan[2].hewan} ]*			 *🐒 = [ ${buruan[8].hewan} ]*
 *🐐 = [ ${buruan[3].hewan} ]*			 *🐗 = [ ${buruan[9].hewan} ]*
 *🐼 = [ ${buruan[4].hewan} ]*			 *🐖 = [ ${buruan[10].hewan} ]*
 *🐊 = [ ${buruan[5].hewan} ]*			 *🐓 = [ ${buruan[11].hewan} ]*
 
 _Ketik .kandang untuk melihat kandang_`

        user.sworddurability -= ranNumb(80, 120)
        if (user.sworddurability <= 0) {
 		user.sworddurability = 0
 		user.sword = 0
        }

	setTimeout(() => {
		user.banteng	+= buruan[0].hewan
		user.harimau	+= buruan[1].hewan
		user.gajah		+= buruan[2].hewan
		user.kambing	+= buruan[3].hewan
		user.panda		+= buruan[4].hewan
		user.buaya		+= buruan[5].hewan
		user.kerbau		+= buruan[6].hewan
		user.sapi		+= buruan[7].hewan
		user.monyet		+= buruan[8].hewan
		user.babihutan	+= buruan[9].hewan
		user.babi		+= buruan[10].hewan
		user.ayam		+= buruan[11].hewan
		conn.sendFthumb(m.chat, 'Berburu', hsl, gmbrt, '', m)
	}, cooldownn)
					 
	setTimeout(() => {
		m.reply('_Perburuan Dimulai..._')
	}, 0)
	user.lastberburu = new Date * 1
}

handler.menufun = ['berburu']
handler.tagsfun = ['rpg']
handler.command = /^(berburu|hunt)$/i
handler.limit = true
handler.cooldown = cooldown

export default handler