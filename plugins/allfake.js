// Made By Aguz Familia/@FokusDotId (Fokus ID)
// Github: https://github.com/fokusdotid

import fs from 'fs'
import axios from 'axios'

let handler = m => m

handler.all = async function (m) {
    let name = await conn.getName(m.sender)
    let pp = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
    try {
        pp = await this.profilePictureUrl(m.sender, 'image')
    } catch (e) { } finally {

        global.pic = hwaifu.getRandom()
        global.social = pickRandom([global.sgh, global.sig, global.snh, global.sgc])

        // Module 
        global.fetch = await (await import('node-fetch')).default
        global.bochil = await import('@bochilteam/scraper')

        //Begin
        //global.ephemeral = m.msg?.contextInfo?.expiration || 0

        // Function
        global.pickRandom = function pickRandom(list) {
            return list[Math.floor(list.length * Math.random())]
        }
        global.getBuffer = async function getBuffer(url, options) {
            try {
                options ? options : {}
                var res = await axios({
                    method: "get",
                    url,
                    headers: {
                        'DNT': 1,
                        'User-Agent': 'GoogleBot',
                        'Upgrade-Insecure-Request': 1
                    },
                    ...options,
                    responseType: 'arraybuffer'
                })
                return res.data
            } catch (e) {
                console.log(`Error : ${e}`)
            }
        }

        const _uptime = process.uptime() * 1000

        global.flocation = {
            key: {
                participant: '0@s.whatsapp.net'
            },
            message: {
                locationMessage: {
                    name: 'Japan`s',
                    jpegThumbnail: fs.readFileSync('./thumbnail.jpg')
                }
            }
        }

        global.fpayment = {
            "key": {
                "remoteJid": "0@s.whatsapp.net",
                "fromMe": false,
                "id": "BAE595C600522C9C",
                "participant": "0@s.whatsapp.net"
            },
            "message": {
                "requestPaymentMessage": {
                    "currencyCodeIso4217": wm,
                    "amount1000": fsizedoc,
                    "requestFrom": "0@s.whatsapp.net",
                    "noteMessage": {
                        "extendedTextMessage": {
                            "text": "Hai Kak " + name
                        }
                    },
                    "expiryTimestamp": fsizedoc,
                    "amount": {
                        "value": fsizedoc,
                        "offset": fsizedoc,
                        "currencyCode": wm
                    }
                }
            }
        }

        // Fake ðŸ¤¥
        global.ftroli = {
            key: {
                remoteJid: 'status@broadcast',
                participant: '0@s.whatsapp.net'
            },
            message: {
                orderMessage: {
                    itemCount: 2023,
                    status: 1,
                    //thumbnail: await conn.resize(await getBuffer(thumb), 300, 150),
                    surface: 1,
                    message: wm,
                    orderTitle: wm,
                    sellerJid: '0@s.whatsapp.net'
                }
            }
        }

        global.fkontak = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                ...(m.chat ? {
                    remoteJid: `status@broadcast`
                } : {})
            },
            message: {
                'contactMessage': {
                    'displayName': wm,
                    'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${wm},;;;\nFN:${wm},\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabell:Ponsel\nEND:VCARD`,
                    'jpegThumbnail': fs.readFileSync('./thumbnail.jpg'),
                    thumbnail: fs.readFileSync('./thumbnail.jpg'),
                    sendEphemeral: true
                }
            }
        }

        global.fvn = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                ...(m.chat ? {
                    remoteJid: "6285736178354-1625305606@g.us"
                } : {})
            },
            message: {
                "audioMessage": {
                    "mimetype": "audio/ogg; codecs=opus",
                    "seconds": "999999999999",
                    "ptt": "true"
                }
            }
        }

        global.ftextt = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                ...(m.chat ? {
                    remoteJid: "6285736178354-1625305606@g.us"
                } : {})
            },
            message: {
                "extendedTextMessage": {
                    "text": wm,
                    "title": wm,
                    'jpegThumbnail': fs.readFileSync('./thumbnail.jpg')
                }
            }
        }

        global.fliveLoc = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                ...(m.chat ? {
                    remoteJid: "status@broadcast"
                } : {})
            },
            message: {
                "liveLocationMessage": {
                    "caption": "Made By: " + global.nameown,
                    "h": `${wm}`,
                    'jpegThumbnail': fs.readFileSync('./thumbnail.jpg')
                }
            }
        }

        global.fliveLocc = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                ...(m.chat ? {
                    remoteJid: "status@broadcast"
                } : {})
            },
            message: {
                "liveLocationMessage": {
                    "title": "Kanna Clarissa",
                    "h": wm,
                    'jpegThumbnail': fs.readFileSync('./thumbnail.jpg')
                }
            }
        }

        global.ftoko = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                ...(m.chat ? {
                    remoteJid: "17608914335@s.whatsapp.net"
                } : {})
            },
            message: {
                "productMessage": {
                    "product": {
                        "productImage": {
                            "mimetype": "image/jpeg",
                            "jpegThumbnail": fs.readFileSync('./thumbnail.jpg') //Gambarnye
                        },
                        "title": wm, //Terserah Di Isi apa
                        "description": wm3,
                        "currencyCode": "USD",
                        "priceAmount1000": "20000000",
                        "retailerId": "Ghost",
                        "productImageCount": 1
                    },
                    "businessOwnerJid": `0@s.whatsapp.net`
                }
            }
        }

        global.fdocs = {
            key: {
                participant: '0@s.whatsapp.net'
            },
            message: {
                "documentMessage": {
                    "title": wm,
                    "jpegThumbnail": fs.readFileSync('./thumbnail.jpg')
                }
            }
        }

        global.fgclink = {
            "key": {
                "fromMe": false,
                "participant": "0@s.whatsapp.net",
                "remoteJid": "0@s.whatsapp.net"
            },
            "message": {
                "groupInviteMessage": {
                    "groupJid": "6285736178354-1625305606@g.us",
                    "inviteCode": "null",
                    "groupName": "Kawan Kanna",
                    "caption": wm,
                    'jpegThumbnail': fs.readFileSync('./thumbnail.jpg')
                }
            }
        }

        global.fimg = {
            key: {
                participant: '0@s.whatsapp.net'
            },
            message: {
                imageMessage: {
                    url: pic,
                    mimetype: 'image/jpeg',
                    fileLength: fsizedoc,
                    height: 306,
                    width: 366,
                    jpegThumbnail: fs.readFileSync('./thumbnail.jpg')
                }
            }
        }

        global.fimgv = {
            key: {
                participant: '0@s.whatsapp.net'
            },
            message: {
                imageMessage: {
                    url: pic,
                    mimetype: 'image/jpeg',
                    fileLength: fsizedoc,
                    height: 306,
                    width: 366,
                    jpegThumbnail: fs.readFileSync('./thumbnail.jpg'),
                    viewOnce: true
                }
            }
        }

        global.fgif = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                ...(m.chat ? {
                    remoteJid: "6285736178354-1625305606@g.us"
                } : {})
            },
            message: {
                "videoMessage": {
                    "title": wm,
                    "h": `Hmm`,
                    'seconds': '999999999',
                    'gifPlayback': 'true',
                    'caption': wm,
                    'jpegThumbnail': fs.readFileSync('./thumbnail.jpg')
                }
            }
        }

        // Random Pick Fake
        let pft = [global.fimg, global.flocation, global.fimgv, global.fpayment, global.ftroli, global.fkontak, global.fvn, global.fvid, global.ftextt, global.fliveLoc, global.fliveLocc, global.ftoko, global.fdocs, global.fgclink, global.fgif]

        // Get Random
        global.fakes = pft.getRandom()

    }
}

export default handler

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
}