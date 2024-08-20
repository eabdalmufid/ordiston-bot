import fetch from 'node-fetch'

let handler = async(m, { conn, usedPrefix, text, args, command }) => {
let imgr = flaaa
let urut = text.split`|`
  let one = urut[1]
  let two = urut[2]
  let three = urut[3]
  
if (command == 'cts') {
if (!args[0]) {
let caption = `*MASUKKAN TEKS:*
Contoh:\n${usedPrefix + command} popular

*List:*
${htjava} cat
${htjava} tag
${htjava} gif
${htjava} say
${htjava} tsay
${htjava} csay
${htjava} gsay
${htjava} width
${htjava} type
`

await conn.sendButton(m.chat, caption, wm, imgr + command, [
                ['Ok', `Huuu`]
            ], m)
            }
if (args[0] == 'cat') {
let res = `https://cataas.com/cat`
let caption = `*Result:*`
await conn.sendButton(m.chat, caption, wm, res, [
                ['Next', `${usedPrefix + command} ${args[0]}`],
                ['To Sticker', `${usedPrefix}s`]
            ], m)
}
if (args[0] == 'tag') {
if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |white`)
let res = 'https://cataas.com/cat/' + one
let caption = `*Result:*`
await conn.sendButton(m.chat, caption, wm, res, [
                ['Next', `${usedPrefix + command} |${one}`],
                ['To Sticker', `${usedPrefix}s`]
            ], m)
}
if (args[0] == 'gif') {
let res = 'https://cataas.com/cat/gif'
let caption = `*Result:*`
await conn.sendButton(m.chat, caption, wm, res, [
                ['Next', `${usedPrefix + command} ${args[0]}`],
                ['To Sticker', `${usedPrefix}s`]
            ], m)
}
if (args[0] == 'say') {
if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |halo`)
let res = 'https://cataas.com/cat/says/' + one
let caption = `*Result:*`
await conn.sendButton(m.chat, caption, wm, res, [
                ['Next', `${usedPrefix + command} ${args[0]}`],
                ['To Sticker', `${usedPrefix}s`]
            ], m)
}
if (args[0] == 'tsay') {
if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |cute|white`)
let res = 'https://cataas.com/cat/' + one + '/says/' + two
let caption = `*Result:*`
await conn.sendButton(m.chat, caption, wm, res, [
                ['Next', `${usedPrefix + command} |${one}|${two}`],
                ['To Sticker', `${usedPrefix}s`]
            ], m)
}
if (args[0] == 'csay') {
if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |hello|50|red`)
let res = 'https://cataas.com/cat/says/' + one + '?size=' + two + '&color=' + three
let caption = `*Result:*`
await conn.sendButton(m.chat, caption, wm, res, [
                ['Next', `${usedPrefix + command} |${one}|${two}|${three}`],
                ['To Sticker', `${usedPrefix}s`]
            ], m)
}
if (args[0] == 'type') {
if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |hq`)
let res = 'https://cataas.com/cat?type=' + one
let caption = `*Result:*`
await conn.sendButton(m.chat, caption, wm, res, [
                ['Next', `${usedPrefix + command}`],
                ['To Sticker', `${usedPrefix}s`]
            ], m)
}
if (args[0] == 'width') {
if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |100`)
let res = 'https://cataas.com/cat?width=' + one
let caption = `*Result:*`
await conn.sendButton(m.chat, caption, wm, res, [
                ['Next', `${usedPrefix + command}`],
                ['To Sticker', `${usedPrefix}s`]
            ], m)
}
if (args[0] == 'gsay') {
if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |Hello`)
let res = 'https://cataas.com/cat/gif/says/' + one + '?filter=sepia&color=orange&size=40&type=or'
let caption = `*Result:*`
await conn.sendButton(m.chat, caption, wm, res, [
                ['Next', `${usedPrefix + command}`],
                ['To Sticker', `${usedPrefix}s`]
            ], m)
}
}

if (command == 'museum') {
if (!args[0]) {
let caption = `*MASUKKAN TEKS:*
Contoh:\n${usedPrefix + command} q |Contoh

*List:*
${htjava} high
${htjava} id
${htjava} q
${htjava} onview
${htjava} aoc
${htjava} med
${htjava} img
${htjava} loc
${htjava} time
`

await conn.sendButton(m.chat, caption, wm, imgr + command, [
                ['Ok', `Huuu`]
            ], m)
            }
if (args[0] == 'high') {
if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |Hello`)
let res = 'https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q=' + one
let gas = await fetch(res)
    let json = await gas.json()
let caption = `*Result:*
*Total:* ${json.total}
*ID:* ${Array.from(json.objectIDs)}
`

await conn.sendButton(m.chat, caption, wm, imgr + command, [
                ['Get Random', `${usedPrefix + command} id |${json.objectIDs.getRandom()}`]
            ], m)
}
if (args[0] == 'id') {
if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |123456`)
let res = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + one
let gas = await fetch(res)
    let json = await gas.json()
let caption = `*Result:*
*accessionNumber:* ${json.accessionNumber}
*accessionYear:* ${json.accessionYear}
*artistAlphaSort:* ${json.artistAlphaSort}
*artistBeginDate:* ${json.artistBeginDate}
*artistDisplayBio:* ${json.artistDisplayBio}
*artistDisplayName:* ${json.artistDisplayName}
*artistEndDate:* ${json.artistEndDate}
*artistGender:* ${json.artistGender}
*artistNationality:* ${json.artistNationality}
*artistPrefix:* ${json.artistPrefix}
*artistRole:* ${json.artistRole}
*artistSuffix:* ${json.artistSuffix}
*artistULAN_URL:* ${json.artistULAN_URL}
*artistWikidata_URL:* ${json.artistWikidata_URL}
*city:* ${json.city}
*classification:* ${json.classification}
*constituents.constituentID:* ${json.constituents.constituentID}
*constituents.constituentULAN_URL:* ${json.constituents.constituentULAN_URL}
*constituents.constituentWikidata_URL:* ${json.constituents.constituentWikidata_URL}
*constituents.gender:* ${json.constituents.gender}
*constituents.name:* ${json.constituents.name}
*constituents.role:* ${json.constituents.role}
*country:* ${json.country}
*county:* ${json.county}
*creditLine:* ${json.creditLine}
*culture:* ${json.culture}
*department:* ${json.department}
*dimensions:* ${json.dimensions}
*dynasty:* ${json.dynasty}
*excavation:* ${json.excavation}
*GalleryNumber:* ${json.GalleryNumber}
*geographyType:* ${json.geographyType}
*isHighlight:* ${json.isHighlight}
*isPublicDomain:* ${json.isPublicDomain}
*isTimelineWork:* ${json.isTimelineWork}
*linkResource:* ${json.linkResource}
*locale:* ${json.locale}
*locus:* ${json.locus}
*medium:* ${json.medium}
*metadataDate:* ${json.metadataDate}
*objectBeginDate:* ${json.objectBeginDate}
*objectDate:* ${json.objectDate}
*objectEndDate:* ${json.objectEndDate}
*objectID:* ${json.objectID}
*objectName:* ${json.objectName}
*objectURL:* ${json.objectURL}
*objectWikidata_URL:* ${json.objectWikidata_URL}
*period:* ${json.period}
*portfolio:* ${json.portfolio}
*primaryImageSmall:* ${json.primaryImageSmall}
*primaryImage:* ${json.primaryImage}
*region:* ${json.region}
*reign:* ${json.reign}
*repository:* ${json.repository}
*rightsAndReproduction:* ${json.rightsAndReproduction}
*river:* ${json.river}
*state:* ${json.state}
*subregion:* ${json.subregion}
*title:* ${json.title}
`

await conn.sendButton(m.chat, caption, wm, imgr + command, [
                ['Menu', `${usedPrefix}menu`]
            ], m)
}
if (args[0] == 'q') {
if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |Hello`)
let res = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q=' + one
let gas = await fetch(res)
    let json = await gas.json()
let caption = `*Result:*
*Total:* ${json.total}
*ID:* ${Array.from(json.objectIDs)}
`

await conn.sendButton(m.chat, caption, wm, imgr + command, [
                ['Get Random', `${usedPrefix + command} id |${json.objectIDs.getRandom()}`]
            ], m)
}
if (args[0] == 'onview') {
if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |Hello`)
let res = 'https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&q=' + one
let gas = await fetch(res)
    let json = await gas.json()
let caption = `*Result:*
*Total:* ${json.total}
*ID:* ${Array.from(json.objectIDs)}
`

await conn.sendButton(m.chat, caption, wm, imgr + command, [
                ['Get Random', `${usedPrefix + command} id |${json.objectIDs.getRandom()}`]
            ], m)
}
if (args[0] == 'aoc') {
if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |Hello`)
let res = 'https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&q=' + one
let gas = await fetch(res)
    let json = await gas.json()
let caption = `*Result:*
*Total:* ${json.total}
*ID:* ${Array.from(json.objectIDs)}
`

await conn.sendButton(m.chat, caption, wm, imgr + command, [
                ['Get Random', `${usedPrefix + command} id |${json.objectIDs.getRandom()}`]
            ], m)
}
if (args[0] == 'med') {
if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |Medium|Query`)
let res = 'https://collectionapi.metmuseum.org/public/collection/v1/search?medium=' + one + '&q=' + two
let gas = await fetch(res)
    let json = await gas.json()
let caption = `*Result:*
*Total:* ${json.total}
*ID:* ${Array.from(json.objectIDs)}
`

await conn.sendButton(m.chat, caption, wm, imgr + command, [
                ['Get Random', `${usedPrefix + command} id |${json.objectIDs.getRandom()}`]
            ], m)
}
if (args[0] == 'img') {
if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |Hello`)
let res = 'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=' + one
let gas = await fetch(res)
    let json = await gas.json()
let caption = `*Result:*
*Total:* ${json.total}
*ID:* ${Array.from(json.objectIDs)}
`

await conn.sendButton(m.chat, caption, wm, imgr + command, [
                ['Get Random', `${usedPrefix + command} id |${json.objectIDs.getRandom()}`]
            ], m)
}
if (args[0] == 'loc') {
if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |Location|Query`)
let res = 'https://collectionapi.metmuseum.org/public/collection/v1/search?geoLocation=' + one + '&q=' + two
let gas = await fetch(res)
    let json = await gas.json()
let caption = `*Result:*
*Total:* ${json.total}
*ID:* ${Array.from(json.objectIDs)}
`

await conn.sendButton(m.chat, caption, wm, imgr + command, [
                ['Get Random', `${usedPrefix + command} id |${json.objectIDs.getRandom()}`]
            ], m)
}
if (args[0] == 'time') {
if (!one) return m.reply(`Example: ${usedPrefix + command} ${args[0]} |Awal|Akhir|Query`)
let res = 'https://collectionapi.metmuseum.org/public/collection/v1/search?dateBegin=' + one + '&dateEnd=' + two + '&q=' + three
let gas = await fetch(res)
    let json = await gas.json()
let caption = `*Result:*
*Total:* ${json.total}
*ID:* ${Array.from(json.objectIDs)}
`

await conn.sendButton(m.chat, caption, wm, imgr + command, [
                ['Get Random', `${usedPrefix + command} id |${json.objectIDs.getRandom()}`]
            ], m)
}
}

}
handler.command = handler.help = ['cts', 'museum']
handler.tags = ['internet']

export default handler
