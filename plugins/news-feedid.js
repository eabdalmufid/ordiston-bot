import feedid from 'feedid'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (command == 'antaranews') {
    let ar = ['terbaru', 'politik', 'hukum', 'ekonomi', 'metro', 'bola', 'olahraga', 'humaniora', 'lifestyle', 'hiburan', 'dunia', 'tekno', 'otomotif']
    let er = `
${htjava} *Pilihan Kategori AntaraNews* ${htjava}
${ar.map(v => cmenub + v).join`\n`}
${cmenuf}

Contoh:
${usedPrefix}${command} politik
`.trim()
    if (!text) throw er
    if (!ar.includes(text)) throw er
    let antaranews
    if (/terbaru/.test(text)) antaranews = await feedid.antara.terbaru()
    if (/politik/.test(text)) antaranews = await feedid.antara.politik()
    if (/hukum/.test(text)) antaranews = await feedid.antara.hukum()
    if (/ekonomi/.test(text)) antaranews = await feedid.antara.ekonomi()
    if (/metro/.test(text)) antaranews = await feedid.antara.metro()
    if (/bola/.test(text)) antaranews = await feedid.antara.bola()
    if (/olahraga/.test(text)) antaranews = await feedid.antara.olahraga()
    if (/humaniora/.test(text)) antaranews = await feedid.antara.humaniora()
    if (/lifestyle/.test(text)) antaranews = await feedid.antara.lifestyle()
    if (/hiburan/.test(text)) antaranews = await feedid.antara.hiburan()
    if (/dunia/.test(text)) antaranews = await feedid.antara.dunia()
    if (/tekno/.test(text)) antaranews = await feedid.antara.tekno()
    if (/otomotif/.test(text)) antaranews = await feedid.antara.otomotif()
    if(antaranews.success == false) throw antaranews.message
    let Array = antaranews.data.posts
    let news = Array[Math.floor(Math.random() * Array.length)]
    if(!news.thumbnail) throw `ERROR\nGagal Mengambil Berita`
    await conn.sendFile(m.chat, news.thumbnail, 'antaranews.png', `${news.title}\n\nDeskripsi :\n${news.description}\n\nSelengkapnya :\n${news.link}`, m)
}
if (command == 'cnbc') {
    let ar = ['terbaru', 'investment', 'news', 'market', 'enterpreneur', 'syariah', 'tech', 'lifestyle', 'opini', 'profil']
    let er = `
${htjava} *Pilihan Kategori CNBC* ${htjava}
${ar.map(v => cmenub + v).join`\n`}
${cmenuf}

Contoh:
${usedPrefix}${command} investment
`.trim()
    if (!text) throw er
    if (!ar.includes(text)) throw er
    let cnbc
    if (/terbaru/.test(text)) cnbc = await feedid.cnbc.terbaru()
    if (/investment/.test(text)) cnbc = await feedid.cnbc.investment()
    if (/news/.test(text)) cnbc = await feedid.cnbc.news()
    if (/market/.test(text)) cnbc = await feedid.cnbc.market()
    if (/enterpreneur/.test(text)) cnbc = await feedid.cnbc.enterpreneur()
    if (/syariah/.test(text)) cnbc = await feedid.cnbc.syariah()
    if (/tech/.test(text)) cnbc = await feedid.cnbc.tech()
    if (/lifestyle/.test(text)) cnbc = await feedid.cnbc.lifestyle()
    if (/opini/.test(text)) cnbc = await feedid.cnbc.opini()
    if (/profil/.test(text)) cnbc = await feedid.cnbc.profil()
    if(cnbc.success == false) throw cnbc.message
    let Array = cnbc.data.posts
    let news = Array[Math.floor(Math.random() * Array.length)]
    if(!news.thumbnail) throw `ERROR\nGagal Mengambil Berita`
    await conn.sendFile(m.chat, news.thumbnail, 'cnbc.png', `${news.title}\n\nDeskripsi :\n${news.description}\n\nSelengkapnya :\n${news.link}`, m)
}
if (command == 'cnn') {
    let ar = ['terbaru', 'nasional', 'internasional', 'ekonomi', 'olahraga', 'teknologi', 'hiburan', 'gayaHidup']
    let er = `
${htjava} *Pilihan Kategori CNN* ${htjava}
${ar.map(v => cmenub + v).join`\n`}
${cmenuf}


Contoh:
${usedPrefix}${command} investment
`.trim()
    if (!text) throw er
    if (!ar.includes(text)) throw er
    let CNN
    if (/terbaru/.test(text)) CNN = await feedid.cnn.terbaru()
    if (/nasional/.test(text)) CNN = await feedid.cnn.nasional()
    if (/internasional/.test(text)) CNN = await feedid.cnn.internasional()
    if (/ekonomi/.test(text)) CNN = await feedid.cnn.ekonomi()
    if (/olahraga/.test(text)) CNN = await feedid.cnn.olahraga()
    if (/teknologi/.test(text)) CNN = await feedid.cnn.teknologi()
    if (/hiburan/.test(text)) CNN = await feedid.cnn.hiburan()
    if (/gayaHidup/.test(text)) CNN = await feedid.cnn.gayaHidup()
    if(CNN.success == false) throw CNN.message
    let Array = CNN.data.posts
    let news = Array[Math.floor(Math.random() * Array.length)]
    if(!news.thumbnail) throw `ERROR\nGagal Mengambil Berita`
    await conn.sendFile(m.chat, news.thumbnail, 'cnn.png', `${news.title}\n\nDeskripsi :\n${news.description}\n\nSelengkapnya :\n${news.link}`, m)
}
if (command == 'jpnn') {
    let JPNN = await feedid.jpnn.terbaru()
    if(JPNN.success == false) throw JPNN.message
    let Array = JPNN.data.posts
    let news = Array[Math.floor(Math.random() * Array.length)]
    if(!news.thumbnail) throw `ERROR\nGagal Mengambil Berita`
    await conn.sendFile(m.chat, news.thumbnail, 'JPNN.png', `${news.title}\n\nDeskripsi :\n${news.description}\n\nSelengkapnya :\n${news.link}`, m)
}
if (command == 'kumparan') {
    let kumparan = await feedid.kumparan.terbaru()
    if(kumparan.success == false) throw kumparan.message
    let Array = kumparan.data.posts
    let news = Array[Math.floor(Math.random() * Array.length)]
    if(!news.thumbnail) throw `ERROR\nGagal Mengambil Berita`
    await conn.sendFile(m.chat, news.thumbnail, 'kumparan.png', `${news.title}\n\nDeskripsi :\n${news.description}\n\nSelengkapnya :\n${news.link}`, m)
}
if (command == 'merdeka') {
    let ar = ['terbaru', 'jakarta', 'dunia', 'gaya', 'olahraga', 'teknologi', 'otomotif', 'khas', 'sehat', 'jabar', 'jatim', 'jateng', 'sumut']
    let er = `
${htjava} *Pilihan Kategori Merdeka* ${htjava}
${ar.map(v => cmenub + v).join`\n`}
${cmenuf}

Contoh:
${usedPrefix}${command} bisnis
`.trim()
    if (!text) throw er
    if (!ar.includes(text)) throw er
    let merdekadotcom
    if (/terbaru/.test(text)) merdekadotcom = await feedid.merdeka.terbaru()
    if (/jakarta/.test(text)) merdekadotcom = await feedid.merdeka.jakarta()
    if (/dunia/.test(text)) merdekadotcom = await feedid.merdeka.dunia()
    if (/gaya/.test(text)) merdekadotcom = await feedid.merdeka.gaya()
    if (/olahraga/.test(text)) merdekadotcom = await feedid.merdeka.olahraga()
    if (/teknologi/.test(text)) merdekadotcom = await feedid.merdeka.teknologi()
    if (/otomotif/.test(text)) merdekadotcom = await feedid.merdeka.otomotif()
    if (/khas/.test(text)) merdekadotcom = await feedid.merdeka.khas()
    if (/sehat/.test(text)) merdekadotcom = await feedid.merdeka.sehat()
    if (/jabar/.test(text)) merdekadotcom = await feedid.merdeka.jabar()
    if (/jatim/.test(text)) merdekadotcom = await feedid.merdeka.jatim()
    if (/jateng/.test(text)) merdekadotcom = await feedid.merdeka.jateng()
    if (/sumut/.test(text)) merdekadotcom = await feedid.merdeka.sumut()
    if(merdekadotcom.success == false) throw merdekadotcom.message
    let Array = merdekadotcom.data.posts
    let news = Array[Math.floor(Math.random() * Array.length)]
    if(!news.thumbnail) throw `ERROR\nGagal Mengambil Berita`
    await conn.sendFile(m.chat, news.thumbnail, 'merdekadotcom.png', `${news.title}\n\nDeskripsi :\n${news.description}\n\nSelengkapnya :\n${news.link}`, m)
}
if (command == 'okezone') {
    let ar = ['terbaru', 'celebrity', 'sports', 'otomotif', 'economy', 'techno', 'lifestyle', 'bola']
    let er = `
${htjava} *Pilihan Kategori Okezone* ${htjava}
${ar.map(v => cmenub + v).join`\n`}
${cmenuf}

Contoh:
${usedPrefix}${command} bisnis
`.trim()
    if (!text) throw er
    if (!ar.includes(text)) throw er
    let okezonedotcom
    if (/terbaru/.test(text)) okezonedotcom = await feedid.okezone.terbaru()
    if (/celebrity/.test(text)) okezonedotcom = await feedid.okezone.celebrity()
    if (/sports/.test(text)) okezonedotcom = await feedid.okezone.sports()
    if (/otomotif/.test(text)) okezonedotcom = await feedid.okezone.otomotif()
    if (/economy/.test(text)) okezonedotcom = await feedid.okezone.economy()
    if (/techno/.test(text)) okezonedotcom = await feedid.okezone.techno()
    if (/lifestyle/.test(text)) okezonedotcom = await feedid.okezone.lifestyle()
    if (/bola/.test(text)) okezonedotcom = await feedid.okezone.bola()
    if(okezonedotcom.success == false) throw okezonedotcom.message
    let Array = okezonedotcom.data.posts
    let news = Array[Math.floor(Math.random() * Array.length)]
    if(!news.thumbnail) throw `ERROR\nGagal Mengambil Berita`
    await conn.sendFile(m.chat, news.thumbnail, 'okezonedotcom.png', `${news.title}\n\nDeskripsi :\n${news.description}\n\nSelengkapnya :\n${news.link}`, m)
}
if (command == 'republika') {
    let ar = ['terbaru', 'news', 'daerah', 'khazanah', 'islam', 'internasional', 'leisure', 'bola']
    let er = `
${htjava} *Pilihan Kategori Republika* ${htjava}
${ar.map(v => cmenub + v).join`\n`}
${cmenuf}

Contoh:
${usedPrefix}${command} bisnis
`.trim()
    if (!text) throw er
    if (!ar.includes(text)) throw er
    let republikadotcom
    if (/terbaru/.test(text)) republikadotcom = await feedid.republika.terbaru()
    if (/news/.test(text)) republikadotcom = await feedid.republika.news()
    if (/daerah/.test(text)) republikadotcom = await feedid.republika.daerah()
    if (/khazanah/.test(text)) republikadotcom = await feedid.republika.khazanah()
    if (/islam/.test(text)) republikadotcom = await feedid.republika.islam()
    if (/internasional/.test(text)) republikadotcom = await feedid.republika.internasional()
    if (/leisure/.test(text)) republikadotcom = await feedid.republika.leisure()
    if (/bola/.test(text)) republikadotcom = await feedid.republika.bola()
    if(republikadotcom.success == false) throw republikadotcom.message
    let Array = republikadotcom.data.posts
    let news = Array[Math.floor(Math.random() * Array.length)]
    if(!news.thumbnail) throw `ERROR\nGagal Mengambil Berita`
    await conn.sendFile(m.chat, news.thumbnail, 'republikadotcom.png', `${news.title}\n\nDeskripsi :\n${news.description}\n\nSelengkapnya :\n${news.link}`, m)
}
if (command == 'sindo') {
    let ar = ['terbaru', 'nasional', 'metro', 'ekbis', 'international', 'daerah', 'sports', 'otomotif', 'tekno', 'sains', 'edukasi', 'lifestyle', 'kalam']
    let er = `
${htjava} *Pilihan Kategori sindonews* ${htjava}
${ar.map(v => cmenub + v).join`\n`}
${cmenuf}

Contoh:
${usedPrefix}${command} bisnis
`.trim()
    if (!text) throw er
    if (!ar.includes(text)) throw er
    let sindonews
    if (/terbaru/.test(text)) sindonews = await feedid.sindonews.terbaru()
    if (/nasional/.test(text)) sindonews = await feedid.sindonews.nasional()
    if (/metro/.test(text)) sindonews = await feedid.sindonews.metro()
    if (/ekbis/.test(text)) sindonews = await feedid.sindonews.ekbis()
    if (/international/.test(text)) sindonews = await feedid.sindonews.international()
    if (/daerah/.test(text)) sindonews = await feedid.sindonews.daerah()
    if (/sports/.test(text)) sindonews = await feedid.sindonews.sports()
    if (/otomotif/.test(text)) sindonews = await feedid.sindonews.otomotif()
    if (/tekno/.test(text)) sindonews = await feedid.sindonews.tekno()
    if (/sains/.test(text)) sindonews = await feedid.sindonews.sains()
    if (/edukasi/.test(text)) sindonews = await feedid.sindonews.edukasi()
    if (/lifestyle/.test(text)) sindonews = await feedid.sindonews.lifestyle()
    if (/kalam/.test(text)) sindonews = await feedid.sindonews.kalam()
    if(sindonews.success == false) throw sindonews.message
    let Array = sindonews.data.posts
    let news = Array[Math.floor(Math.random() * Array.length)]
    if(!news.thumbnail) throw `ERROR\nGagal Mengambil Berita`
    await conn.sendFile(m.chat, news.thumbnail, 'sindonews.png', `${news.title}\n\nDeskripsi :\n${news.description}\n\nSelengkapnya :\n${news.link}`, m)
}
if (command == 'suara') {
    let ar = ['terbaru', 'bisnis', 'bola', 'lifestyle', 'entertaiment', 'otomotif', 'tekno', 'health']
    let er = `
${htjava} *Pilihan Kategori Suara.com* ${htjava}
${ar.map(v => cmenub + v).join`\n`}
${cmenuf}

Contoh:
${usedPrefix}${command} bisnis
`.trim()
    if (!text) throw er
    if (!ar.includes(text)) throw er
    let suaradotcom
    if (/terbaru/.test(text)) suaradotcom = await feedid.suara.terbaru()
    if (/bisnis/.test(text)) suaradotcom = await feedid.suara.bisnis()
    if (/bola/.test(text)) suaradotcom = await feedid.suara.bola()
    if (/lifestyle/.test(text)) suaradotcom = await feedid.suara.lifestyle()
    if (/entertaiment/.test(text)) suaradotcom = await feedid.suara.entertaiment()
    if (/tekno/.test(text)) suaradotcom = await feedid.suara.tekno()
    if (/otomotif/.test(text)) suaradotcom = await feedid.suara.otomotif()
    if (/health/.test(text)) suaradotcom = await feedid.suara.health()
    if(suaradotcom.success == false) throw suaradotcom.message
    let Array = suaradotcom.data.posts
    let news = Array[Math.floor(Math.random() * Array.length)]
    if(!news.thumbnail) throw `ERROR\nGagal Mengambil Berita`
    await conn.sendFile(m.chat, news.thumbnail, 'suaradotcom.png', `${news.title}\n\nDeskripsi :\n${news.description}\n\nSelengkapnya :\n${news.link}`, m)
}
if (command == 'temponews') {
    let ar = ['nasional', 'bisnis', 'metro', 'dunia', 'bola', 'cantik', 'tekno', 'otomotif', 'seleb', 'gaya', 'travel', 'difabel', 'creativelab', 'inforial', 'event']
    let er = `
${htjava} *Pilihan Kategori TEMPO* ${htjava}
${ar.map(v => cmenub + v).join`\n`}
${cmenuf}

Contoh:
${usedPrefix}${command} recent
`.trim()
    if (!text) throw er
    if (!ar.includes(text)) throw er
    let tempo
    if (/nasional/.test(text)) tempo = await feedid.tempo.nasional()
    if (/bisnis/.test(text)) tempo = await feedid.tempo.bisnis()
    if (/metro/.test(text)) tempo = await feedid.tempo.metro()
    if (/dunia/.test(text)) tempo = await feedid.tempo.dunia()
    if (/bola/.test(text)) tempo = await feedid.tempo.bola()
    if (/cantik/.test(text)) tempo = await feedid.tempo.cantik()
    if (/tekno/.test(text)) tempo = await feedid.tempo.tekno()
    if (/otomotif/.test(text)) tempo = await feedid.tempo.otomotif()
    if (/seleb/.test(text)) tempo = await feedid.tempo.seleb()
    if (/gaya/.test(text)) tempo = await feedid.tempo.gaya()
    if (/travel/.test(text)) tempo = await feedid.tempo.travel()
    if (/difabel/.test(text)) tempo = await feedid.tempo.difabel()
    if (/creativelab/.test(text)) tempo = await feedid.tempo.creativelab()
    if (/inforial/.test(text)) tempo = await feedid.tempo.inforial()
    if (/event/.test(text)) tempo = await feedid.tempo.event()
    if(tempo.success == false) throw tempo.message
    let Array = tempo.data.posts
    let news = Array[Math.floor(Math.random() * Array.length)]
    if(!news.thumbnail) throw `ERROR\nGagal Mengambil Berita`
    await conn.sendFile(m.chat, news.thumbnail, 'tempo.png', `${news.title}\n\nDeskripsi :\n${news.description}\n\nSelengkapnya :\n${news.link}`, m)
}
if (command == 'tribunnews') {
    let ar = ['terbaru', 'bisnis', 'superskor', 'sport', 'seleb', 'lifestyle', 'travel', 'parapuan', 'otomotif', 'techno', 'kesehatan']
    let er = `
${htjava} *Pilihan Kategori tribun* ${htjava}
${ar.map(v => cmenub + v).join`\n`}
${cmenuf}

Contoh:
${usedPrefix}${command} bisnis
`.trim()
    if (!text) throw er
    if (!ar.includes(text)) throw er
    let tribun
    if (/terbaru/.test(text)) tribun = await feedid.tribun.terbaru()
    if (/bisnis/.test(text)) tribun = await feedid.tribun.bisnis()
    if (/superskor/.test(text)) tribun = await feedid.tribun.superskor()
    if (/sport/.test(text)) tribun = await feedid.tribun.sport()
    if (/travel/.test(text)) tribun = await feedid.tribun.travel()
    if (/parapuan/.test(text)) tribun = await feedid.tribun.parapuan()
    if (/otomotif/.test(text)) tribun = await feedid.tribun.otomotif()
    if (/techno/.test(text)) tribun = await feedid.tribun.techno()
    if (/lifestyle/.test(text)) tribun = await feedid.tribun.lifestyle()
    if (/kesehatan/.test(text)) tribun = await feedid.tribun.kesehatan()
    if(tribun.success == false) throw tribun.message
    let Array = tribun.data.posts
    let news = Array[Math.floor(Math.random() * Array.length)]
    if(!news.thumbnail) throw `ERROR\nGagal Mengambil Berita`
    await conn.sendFile(m.chat, news.thumbnail, 'tribun.png', `${news.title}\n\nDeskripsi :\n${news.description}\n\nSelengkapnya :\n${news.link}`, m)
}
}
handler.tags = ['news']
handler.help = ['antaranews',
'cnbc',
'cnn',
'jpnn',
'kumparan',
'merdeka',
'okezone',
'republika',
'sindo',
'suara',
'temponews',
'tribunnews'].map(v => v + ' <query>')
handler.command = ['antaranews',
'cnbc',
'cnn',
'jpnn',
'kumparan',
'merdeka',
'okezone',
'republika',
'sindo',
'suara',
'temponews',
'tribunnews']
export default handler