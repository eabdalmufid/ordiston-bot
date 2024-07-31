import fetch from 'node-fetch'

let handler = async (m, {
    conn,
    usedPrefix,
    text,
    args,
    command
}) => {
    let urut = text.split`|`
    let one = urut[1]
    let two = urut[2]
    let three = urut[3]

    let template = (args[0] || '').toLowerCase()
    let caption = `*Contoh Penggunaan Single*
${usedPrefix + command} cecan

*Contoh Penggunaan Multi*
${usedPrefix + command} pinterest |wibu

*List:*
• ${usedPrefix + command} bahasa-g
• ${usedPrefix + command} bajinganlo
• ${usedPrefix + command} barcode
• ${usedPrefix + command} barcodev2
• ${usedPrefix + command} base32dec
• ${usedPrefix + command} base32enc
• ${usedPrefix + command} base64dec
• ${usedPrefix + command} base64enc
• ${usedPrefix + command} binarydec
• ${usedPrefix + command} binaryenc
• ${usedPrefix + command} customhartatahtav2
• ${usedPrefix + command} halah
• ${usedPrefix + command} hartatahtav2
• ${usedPrefix + command} heleh
• ${usedPrefix + command} hilih
• ${usedPrefix + command} holoh
• ${usedPrefix + command} huluh
• ${usedPrefix + command} kertas
• ${usedPrefix + command} lt4
• ${usedPrefix + command} magernulis1v2
• ${usedPrefix + command} magernulis2
• ${usedPrefix + command} magernulis3
• ${usedPrefix + command} magernulis4
• ${usedPrefix + command} meme-spongebob3
• ${usedPrefix + command} memukul
• ${usedPrefix + command} openai
• ${usedPrefix + command} openai-image
• ${usedPrefix + command} pemantapan-lt4
• ${usedPrefix + command} perpisahan-kelas-9
• ${usedPrefix + command} qrcode
• ${usedPrefix + command} qrcodev2
• ${usedPrefix + command} reversetext
• ${usedPrefix + command} ringkas
• ${usedPrefix + command} scrolling-text
• ${usedPrefix + command} serti-tolol
• ${usedPrefix + command} smartfest
• ${usedPrefix + command} styletext
• ${usedPrefix + command} tanggapan-lesti
• ${usedPrefix + command} text2md5
• ${usedPrefix + command} text2sandi-an
• ${usedPrefix + command} text2sandi-angka
• ${usedPrefix + command} text2sandi-az
• ${usedPrefix + command} text2sandi-helenkeller
• ${usedPrefix + command} text2sandi-kimia
• ${usedPrefix + command} text2sandi-kotak1
• ${usedPrefix + command} text2sandi-kotak2
• ${usedPrefix + command} text2sandi-kotak3
• ${usedPrefix + command} text2sandi-kotak4
• ${usedPrefix + command} text2sandi-morse
• ${usedPrefix + command} text2sandi-rumput
• ${usedPrefix + command} text2sandi-semaphore
• ${usedPrefix + command} text2tali-pramuka
• ${usedPrefix + command} ttp1
• ${usedPrefix + command} ttp2
• ${usedPrefix + command} ttp3
• ${usedPrefix + command} ttp4
• ${usedPrefix + command} ttp5
• ${usedPrefix + command} ttp6
• ${usedPrefix + command} anime
• ${usedPrefix + command} animedl1
• ${usedPrefix + command} animedl2
• ${usedPrefix + command} arti-kata
• ${usedPrefix + command} brainly
• ${usedPrefix + command} cari-grup-wa
• ${usedPrefix + command} google
• ${usedPrefix + command} gsmarena
• ${usedPrefix + command} happymod
• ${usedPrefix + command} igstalkv2
• ${usedPrefix + command} jagokata
• ${usedPrefix + command} joox
• ${usedPrefix + command} kbbi
• ${usedPrefix + command} pinterest
• ${usedPrefix + command} play
• ${usedPrefix + command} ringtone
• ${usedPrefix + command} stickersearch
• ${usedPrefix + command} wikipedia
• ${usedPrefix + command} ytsearch
`

    if (!args[0] || !one) throw caption
    if (command) {
        switch (template) {
            case 'aesthetic':
            case 'anjing':
                let nsf = 'https://mfarels.my.id/api/' + args[0]
                return conn.sendButton(m.chat, args[0], 'Succes', nsf, [
                    ['Back', '.?']
                ], m)
                break
            case 'anime':
            case 'animedl1':
            case 'animedl2':
            case 'arti-kata':
            case 'brainly':
            case 'cari-grup-wa':
            case 'google':
            case 'gsmarena':
            case 'happymod':
            case 'igstalkv2':
            case 'jagokata':
            case 'joox':
            case 'kbbi':
            case 'pinterest':
            case 'play':
            case 'ringtone':
            case 'stickersearch':
            case 'wikipedia':
            case 'ytsearch':
                let linkq = 'https://mfarels.my.id/api/' + args[0] + '?q=' + one
                let scanq = await isWebPage(linkq)
                if (scanq == "application/json") {
                    let feq = await fetch(linkq)
                    let nofeq = await feq.json()
                    return conn.sendButton(m.chat, args[0], nofeq, null, [
                        ['Back', '.?']
                    ], m)
                }
                if (!scanq == "application/json") {
                    return conn.sendButton(m.chat, args[0], wm, linkq, [
                        ['Back', '.?']
                    ], m)
                }
                break
            case 'bahasa-g':
            case 'bajinganlo':
            case 'barcode':
            case 'barcodev2':
            case 'base32dec':
            case 'base32enc':
            case 'base64dec':
            case 'base64enc':
            case 'binarydec':
            case 'binaryenc':
            case 'customhartatahtav2':
            case 'halah':
            case 'hartatahtav2':
            case 'heleh':
            case 'hilih':
            case 'holoh':
            case 'huluh':
            case 'kertas':
            case 'lt4':
            case 'magernulis1v2':
            case 'magernulis2':
            case 'magernulis3':
            case 'magernulis4':
            case 'meme-spongebob3':
            case 'memukul':
            case 'openai':
            case 'openai-image':
            case 'pemantapan-lt4':
            case 'perpisahan-kelas-9':
            case 'qrcode':
            case 'qrcodev2':
            case 'reversetext':
            case 'ringkas':
            case 'scrolling-text':
            case 'serti-tolol':
            case 'smartfest':
            case 'styletext':
            case 'tanggapan-lesti':
            case 'text2md5':
            case 'text2sandi-an':
            case 'text2sandi-angka':
            case 'text2sandi-az':
            case 'text2sandi-helenkeller':
            case 'text2sandi-kimia':
            case 'text2sandi-kotak1':
            case 'text2sandi-kotak2':
            case 'text2sandi-kotak3':
            case 'text2sandi-kotak4':
            case 'text2sandi-morse':
            case 'text2sandi-rumput':
            case 'text2sandi-semaphore':
            case 'text2tali-pramuka':
            case 'ttp1':
            case 'ttp2':
            case 'ttp3':
            case 'ttp4':
            case 'ttp5':
            case 'ttp6':
                let linkt = 'https://mfarels.my.id/api/' + args[0] + '?text=' + one
                let scan = await isWebPage(linkt)
                if (scan == "application/json") {
                    let fet = await fetch(linkt)
                    let nofet = await fet.json()
                    return conn.sendButton(m.chat, args[0], nofet, null, [
                        ['Back', '.?']
                    ], m)
                }
                if (!scan == "application/json") {
                    return conn.sendButton(m.chat, args[0], wm, linkt, [
                        ['Back', '.?']
                    ], m)
                }
                break
        }
    }
}
handler.help = ['frl <command> <teks>']
handler.tags = ['tools']
handler.command = /^frl$/i
export default handler

function isWebPage(img) {
    let fex = fetch(img)
    return fex.headers.get("content-type")
}