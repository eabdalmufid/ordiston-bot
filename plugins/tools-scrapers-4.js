import cheerio from "cheerio"
import fetch from "node-fetch"
import axios from "axios"
import request from "request"
import fs from "fs"
import FormData from "form-data"

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
    let lister = [
        "aiovideo",
"apkdl2",
"apkdl2inf",
"apkdl2s",
"apkdl2ss",
"apkkkk",
"apkkkks",
"attp",
"drakor",
"film",
"imdb",
"jadwaltv",
"joox",
"jooxdl",
"memeku",
"mod1",
"mod2",
"musicaldown",
"playstoredl",
"playstoredld",
"playstoredlll",
"ringtone",
"searchIlust",
"sfiledl",
"tiktoktren",
"ttp",
"turnbackhoax",
"w9apps",
"wallpaperggpa",
"otakudesuSearch",
"otakudesuDetail",
"otakudesuDownload",
"anime",
"manga",
"wibu",
"fandom",
"character",
"topAnime",
"topManga"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split(/[^\w\s]/g)
    if (!lister.includes(feature)) return m.reply("*Example:*\n.fs youtube.search.hello\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {
        if (feature == "aiovideo") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await aiovideo(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "apkdl2") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await apkdl2(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "apkdl2inf") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await apkdl2inf(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "apkdl2s") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await apkdl2s(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "apkdl2ss") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await apkdl2ss(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "apkkkk") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await apkkkk(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "apkkkks") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await apkkkks(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "attp") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await attp(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "drakor") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await drakor(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "film") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await film(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "imdb") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await imdb(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "jadwaltv") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await jadwaltv()
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "joox") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await joox(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "jooxdl") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await jooxdl(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "memeku") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await memeku()
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "mod1") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await mod1(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "mod2") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await mod2(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "musicaldown") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await musicaldown(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "playstoredl") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await playstoredl(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "playstoredld") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await playstoredld(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "playstoredlll") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await playstoredlll(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "ringtone") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await ringtone(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "searchIlust") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await searchIlust(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "sfiledl") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await sfiledl(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "tiktoktren") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await tiktoktren()
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "ttp") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await ttp(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "turnbackhoax") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await turnbackhoax()
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "w9apps") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await w9apps(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "wallpaperggpa") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await wallpaperggpa(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "otakudesuSearch") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await otakudesuSearch(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "otakudesuDetail") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await otakudesuDetail(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "otakudesuDownload") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await otakudesuDownload(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "anime") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await anime(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "manga") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await manga(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "wibu") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await wibu(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "fandom") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await fandom(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "character") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await character(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "topAnime") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await topAnime(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
        if (feature == "topManga") {
            if (!inputs) return m.reply("Input Query!")
            await m.reply(wait)
            let outs = await topManga(inputs)
            throw await clean(JSON.stringify(outs, null, 4))
        }
	}
}
handler.help = ["scrap4 type query"]
handler.tags = ["internet"]
handler.command = /^(scrap4)$/i
export default handler


async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function w9apps(query) {
    return new Promise((resolve, reject) => {

        let config = {
            method: 'GET',
            url: query,

        };

        axios(config)
            .then(({
                data
            }) => {
                const $$1 = cheerio.load(data)

                let tokenpo = $$1('html > body.notranslate > div.body-content.body-content-in > div > div.pc-wrap.downloading > div > div > div.downloading-info.flex-1 > h1 > a.pc-btn-download.j-app-download').attr('href')

                resolve(token)
            })
            .catch(reject)
    })
}




async function apkkkk(url) {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'GET',
            url: `https://apksos.com/download-app/com.whatsapp`,
            headers: {
                "content-type": "application/x-www-form-urlencoded;",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                "cookie": "_ga=GA1.2.1040359019.1663052574; _gid=GA1.2.1101300480.1663052574; XSRF-TOKEN=eyJpdiI6IkZtWFZWSWp2STNjTHNGK05Pbk9nTWc9PSIsInZhbHVlIjoiRTdPVmlZOEpKSlVvMUl4U1BOWjQ2U2JQb1dZZk9rVDJRV1hoRFFRRnVPZWxQZjVPTitYWmdQZjdIcHlxSDZVdVBDd3lEczE3bHlJTUdOTVdGTG0zXC9nPT0iLCJtYWMiOiJiZGVhZjYwYzNhMGJiYzBhNTkyOGJkNDJlMzQ4M2M1YWNlMzQ1MjQwNjhmYWI1ZTliZWYwZWRhN2QwNDJhYmQ5In0%3D; laravel_session=eyJpdiI6Im5ONXJLUkhteHdXQk1jNGppQTlXVEE9PSIsInZhbHVlIjoidklBUU9QS1dcL05zVGlwZ1d0ZHJKWk5IVG40ZVdqVEFQUllIZFJ1aUZuZTM3XC9WZ0VWaUtuV0NaUUc3c3hzMlVCMTZMeWFRd2Z3Q0wwWGNTaXQ4eDN1Zz09IiwibWFjIjoiOWI1Y2U2YmI0ZTg1NGYzMjdmYTQ5Zjc5OTNkZjAyMGFiYmNjZjdkYWQxMzRhNjVjZWZhOTBmZjY0OGFkNjgzNSJ9"
            },
            formData: {
                url: url
            }
        };
        request(options, async function(error, response, body) {
            if (error) throw new Error(error)

            const $$ = cheerio.load(body)
            console.log(body)
            let token = $$('.pric > a').attr('href')


            resolve(token)

        })
    })
}



async function apkkkks(query) {
    return new Promise((resolve, reject) => {

        let config = {
            method: 'GET',
            url: `https://apksos.com/download-app/com.whatsapp`,

        };

        axios(config)
            .then(({
                data
            }) => {
                const $$ = cheerio.load(data)

                let token = $$('.pric > a').attr('href')


                resolve(token)
            })
            .catch(reject)
    })
}




async function memeku() {
    return new Promise((resolve, reject) => {
        axios.get(`https://1cak.com/shuffle`)
            .then(({
                data
            }) => {
                const $$ = cheerio.load(data)
                let result
                $$('#content').each(function(a, b) {
                    result = {
                        img: $$(b).find('> table > tr > td > img').attr('src')
                    }
                    resolve(result)
                })

            })
            .catch(reject)
    })
}


async function mod1(query) {
    return new Promise((resolve, reject) => {
        const er = axios.get(`${query}`)

        const $$ = cheerio.load(er.data)
        let token = $$('#blocks-left > div.post-content > div.post-outer.clearfix > div.download_button > a').attr('href')

        const era = axios.get(token)

        const $g = cheerio.load(era.data)
        let tokensd = $g('#dlbox > ul.dl > a:nth-child(1)').attr('href')

        resolve(tokensd)

            .catch(reject)
    })
}

async function mod2(query) {
    return new Promise((resolve, reject) => {
        axios.get(`${query}`)
            .then(({
                data
            }) => {
                const $$ = cheerio.load(data)
                let token = $$('#dlbox > ul.dl > a:nth-child(1)').attr('href')


                resolve(token)
            })
            .catch(reject)
    })
}



async function apkdl2s(query) {
    return new Promise((resolve, reject) => {
        axios.get(`https://apkpure.com/search?q=${query}`)
            .then(({
                data
            }) => {
                const $$ = cheerio.load(data)
                let token = $$('div.main.search-app > div.left > div.box > div.first.brand.is-brand > div.first-info.brand-info > div.info a').attr('href')
                let tokenv = $$('div.main.search-app > div.left > div.box > div.first.brand.is-brand > div.first-info.brand-info > div.info a').attr('href')


                resolve(token)
            })
            .catch(reject)
    })
}

async function apkdl2ss(query) {
    return new Promise((resolve, reject) => {
        axios.get(`https://apkpure.com/search?q=${query}`)
            .then(({
                data
            }) => {
                const $$ = cheerio.load(data)
                let token = $$('div.main.search-app > div.left > div.box > div.first.brand.is-brand > div.first-info.brand-info > div.info a').attr('href')


                resolve(token)
            })
            .catch(reject)
    })
}


async function apkdl2inf(query) {
    return new Promise((resolve, reject) => {
        axios.get(`${query}`)
            .then(({
                data
            }) => {
                const $$ = cheerio.load(data)
                let token = $$('div.main.search-app > div.left > div.box > div.first.brand.is-brand > div.first-info.brand-info > a.da').attr('href')


                resolve(token)
            })
            .catch(reject)
    })
}

async function apkdl2(query) {
    return new Promise((resolve, reject) => {
        axios.get(`${query}`)
            .then(({
                data
            }) => {
                const $$ = cheerio.load(data)
                let token = $$('div.main.search-app > div.left > div.box > div.first.brand.is-brand > div.first-info.brand-info > a.da').attr('href')


                resolve(token)
            })
            .catch(reject)
    })
}




async function playstoredld(query) {
    return new Promise((resolve, reject) => {
        axios.get(`https://apksfull.com/search/${query}`)
            .then(({
                data
            }) => {
                const $$ = cheerio.load(data)
                let token = $$('div.c.m.fw > div.cols > div.col.left > div > div.cols.multi-line > a').attr('href')


                resolve(token)
            })
            .catch(reject)
    })
}


async function playstoredl(query) {
    return new Promise((resolve, reject) => {
        axios.get(`https://apksfull.com${query}`)
            .then(({
                data
            }) => {
                const $$ = cheerio.load(data)

                let token = $$('div.c.m.fw > div.cols > div.col.left > div.cols >  a.btn-dl').attr('href')
                resolve(token)
            })
            .catch(reject)
    })
}

async function playstoredlll(query) {
    return new Promise((resolve, reject) => {
        axios.get(`https://apksfull.com${query}`)
            .then(({
                data
            }) => {
                const $$ = cheerio.load(data)
                $$('div.c.m.fw > div.cols > div.col.left > div.apk-info > table.apk-info > tbody').each(function(a, b) {
                    result = {
                        version: $$(b).find('> tr:nth-child(2) > td:nth-child(2)').text(),
                        updated: $$(b).find('> tr:nth-child(4) > td:nth-child(2)').text(),
                        developer: $$(b).find('> tr:nth-child(5) > td:nth-child(2)').text(),
                        id: $$(b).find('> tr:nth-child(7) > td:nth-child(2)').text(),
                        requirements: $$(b).find('> tr:nth-child(8) > td:nth-child(2)').text(),
                        installed: $$(b).find('> tr:nth-child(9) > td:nth-child(2)').text()
                    }
                    resolve(result)
                })

            })
            .catch(reject)
    })
}



async function jadwaltv() {
    return new Promise((resolve, reject) => {
        axios.get('http://www.dokitv.com/jadwal-acara-tv')
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const hasil = [];
                $('#c.m.w > tbody > tr ').each(function(a, b) {
                    result = {
                        acara: $(b).find('> td:nth-child(2)').text(),
                        channel: $(b).find('> td > a').text(),
                        jam: $(b).find('> td.jfx').text(),
                        source: $(b).find('> td > a').attr('href')
                    }
                    hasil.push(result)
                })
                resolve(hasil)
            })
            .catch(reject)
    })
}

async function film(query) {
    return new Promise((resolve, reject) => {
        axios.get(`http://167.99.31.48/?s=${query}`)
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const hasil = [];
                $('#content > div > div.los').each(function(a, b) {
                    $(b).find('article').each(function(c, d) {
                        const judul = $(d).find('div > a > div.addinfox > header > h2').text()
                        const quality = $(d).find('div > a > div > div > span').text()
                        const type = $(d).find('div > a > div.addinfox > div > i.type').text()
                        const upload = $(d).find('div > a > div.addinfox > div > span').text()
                        const link = $(d).find('div > a').attr('href');
                        const thumb = $(d).find('div > a > div > img').attr('src');
                        const result = {
                            judul: judul,
                            quality: quality,
                            type: type,
                            upload: upload,
                            link: link,
                            thumb: thumb,
                        };
                        hasil.push(result);
                    });
                });
                resolve(hasil)
            })
            .catch(reject)
    })
}


async function imdb(url) {
    return new Promise((resolve, reject) => {
        axios.get('https://freedownloadvideo.net/imdb-video-downloader').then((data) => {
            let a = cheerio.load(data.data)
            let token = a('#token').attr('value')
            const options = {
                method: 'POST',
                url: `https://freedownloadvideo.net/wp-json/aio-dl/video-data/`,
                headers: {
                    "content-type": "application/x-www-form-urlencoded;",
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                    "cookie": "PHPSESSID=jue6d59cnfgu8pmraa971cetm6; _gid=GA1.2.1096581014.1656129824; __gads=ID=855f6257a3b17608-227b1200fed200a7:T=1656129824:RT=1656129824:S=ALNI_MYlQs2q77JAmj399O3YnmMSElqAIA; __gpi=UID=0000068f8a6124cf:T=1656129824:RT=1656129824:S=ALNI_MZhz1dM3pQuLjvXkFxtGqNtiIo4yw; _ga_KN64Y44T94=GS1.1.1656129823.1.1.1656130205.0; _ga=GA1.2.1859454192.1656129824"
                },
                formData: {
                    url: url,
                    token: token
                }
            };
            request(options, async function(error, response, body) {
                if (error) throw new Error(error)
                res = JSON.parse(body)
                result = {
                    status: 200,
                    ...res,
                }
                resolve(result);
            })
        }).catch(reject)
    })
}


async function attp(text) {
    return new Promise(async (resolve, reject) => {
        const getid = await axios.get('https://id.bloggif.com/text')
        const id = cheerio.load(getid.data)('#content > form').attr('action')
        const options = {
            method: "POST",
            url: `https://id.bloggif.com${id}`,
            headers: {
                "content-type": 'application/x-www-form-urlencoded',
                "user-agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
            },
            formData: {
                target: 1,
                text: text,
                glitter_id: Math.floor(Math.random() * 2821),
                font_id: 'lucida_sans_demibold_roman',
                size: 50,
                bg_color: 'FFFFFF',
                transparent: 1,
                border_color: '000000',
                border_width: 2,
                shade_color: '000000',
                shade_width: 1,
                angle: 0,
                text_align: 'center'
            },
        };
        request(options, async function(error, response, body) {
            if (error) return new Error(error)
            const $ = cheerio.load(body)
            const url = $('#content > div:nth-child(10) > a').attr('href')
            resolve({
                status: 200,
                result: 'https://id.bloggif.com' + url
            })
        })
    })
}

async function ttp(text) {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'POST',
            url: `https://www.picturetopeople.org/p2p/text_effects_generator.p2p/transparent_text_effect`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                "Cookie": "_ga=GA1.2.1667267761.1655982457; _gid=GA1.2.77586860.1655982457; __gads=ID=c5a896288a559a38-224105aab0d30085:T=1655982456:RT=1655982456:S=ALNI_MbtHcmgQmVUZI-a2agP40JXqeRnyQ; __gpi=UID=000006149da5cba6:T=1655982456:RT=1655982456:S=ALNI_MY1RmQtva14GH-aAPr7-7vWpxWtmg; _gat_gtag_UA_6584688_1=1"
            },
            formData: {
                'TextToRender': text,
                'FontSize': '100',
                'Margin': '30',
                'LayoutStyle': '0',
                'TextRotation': '0',
                'TextColor': 'ffffff',
                'TextTransparency': '0',
                'OutlineThickness': '3',
                'OutlineColor': '000000',
                'FontName': 'Lekton',
                'ResultType': 'view'
            }
        };
        request(options, async function(error, response, body) {
            if (error) throw new Error(error)
            const $ = cheerio.load(body)
            const result = 'https://www.picturetopeople.org' + $('#idResultFile').attr('value')
            resolve({
                status: 200,
                result: result
            })
        });
    })
}



async function tiktoktren() {
    return new Promise((resolve, reject) => {
        axios.get("https://brainans.com/").then(async (data) => {
            const $ = cheerio.load(data.data);
            const result = {};
            const plink = [];
            result["status"] = "200";
            result["result"] = [];
            async function getmetadata(link, views) {
                const data = await axios.get("https://brainans.com" + link);
                const $$ = cheerio.load(data.data);
                result["result"].push({
                    username: $$("#card-page").find("div.main__user-desc.align-self-center.ml-2 > a").text(),
                    upload_time: $$("#card-page").find("div.main__user-desc.align-self-center.ml-2").text().split($$("#card-page").find("div.main__user-desc.align-self-center.ml-2 > a").text())[1].trim(),
                    caption: $$("#card-page").find("div.main__list").text(),
                    views: views,
                    like: $$("#card-page").find("div.content__btns.d-flex > div:nth-child(1) > span").text(),
                    comment: $$("#card-page").find("div.content__btns.d-flex > div:nth-child(2) > span").text(),
                    share: $$("#card-page").find("div.content__btns.d-flex > div:nth-child(3) > span").text(),
                    video: $$("#card-page").find("video").attr("src"),
                });
            }
            $("#welcome_videos > div > div > a").each(function(a, b) {
                plink.push({
                    link: $(b).attr("href"),
                    views: $(b).find("div.video_view_count.bx.bx-show > span").text(),
                });
            });
            for (let i = 0; i < 10; i++) {
                await getmetadata(plink[i].link, plink[i].views);
            }
            resolve(result)
        }).catch(reject)
    })
};


async function drakor(query) {
    return new Promise((resolve, reject) => {
        axios.get(`https://173.212.240.190///?s=${query}&post_type=post`)
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const hasil = [];
                $('#post > div ').each(function(a, b) {
                    result = {
                        status: 200,
                        judul: $(b).find('> div.title.text-center.absolute.bottom-0.w-full.py-2.pb-4.px-3 > h2 > a').text().trim(),
                        years: $(b).find('> div.title.text-center.absolute.bottom-0.w-full.py-2.pb-4.px-3 > div.category.text-gray.font-normal.text-white.text-xs.truncate > a').text(),
                        genre: $(b).find('> div.title.text-center.absolute.bottom-0.w-full.py-2.pb-4.px-3 > div.genrenya.text-center.text-white.text-opacity-75.text-xs.mt-1').text().trim(),
                        thumbnail: $(b).find('> div.thumbnail > a > img').attr('src'),
                        url: $(b).find('> div.title.text-center.absolute.bottom-0.w-full.py-2.pb-4.px-3 > h2 > a').attr('href')
                    }
                    hasil.push(result)
                })
                resolve(hasil)
            })
            .catch(reject)
    })
}

async function turnbackhoax() {
    return new Promise((resolve, reject) => {
        axios.get(`https://turnbackhoax.id/`).then(tod => {
            const $ = cheerio.load(tod.data)

           let hasil = [];
           let result

            $('figure.mh-loop-thumb').each(function(a, b) {
                $("div.mh-loop-content.mh-clearfix").each(function(c, d) {
                    result = {
                        link: $(d).find("h3.entry-title.mh-loop-title > a").attr('href'),
                        img: $(b).find("img").attr('src'),
                        title: $(d).find("h3.entry-title.mh-loop-title > a").text().trim(),
                        desc: $(d).find("div.mh-excerpt > p").text().trim(),
                        date: $(d).find("span.mh-meta-date.updated").text().trim()
                    }

                    hasil.push(result)
                });
            });
            resolve(hasil)
        }).catch(reject)
    });
}

async function wallpaperggpa(title, page = '1') {
    return new Promise((resolve, reject) => {
        const random = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        let randomgambar = random[Math.floor(Math.random() * random.length)]
        axios.get(`https://www.besthdwallpaper.com/search?CurrentPage=${randomgambar}&q=${title}`)
            .then(({
                data
            }) => {
                let $ = cheerio.load(data)
                let hasil = []
                $('div.grid-item').each(function(a, b) {
                    hasil.push({
                        title: $(b).find('div.info > a > h3').text(),
                        type: $(b).find('div.info > a:nth-child(2)').text(),
                        source: 'https://www.besthdwallpaper.com' + $(b).find('div > a:nth-child(3)').attr('href'),
                        image: $(b).find('picture > source:nth-child(2)').attr('srcset')
                    })
                })

                resolve(hasil)
            })
            .catch(reject)
    })
}

async function ringtone(title) {
    return new Promise((resolve, reject) => {
        axios.get('https://meloboom.com/en/search/' + title)
            .then((get) => {
                let $ = cheerio.load(get.data)
                let hasil = []
                $('#__next > main > section > div.jsx-2244708474.container > div > div > div > div:nth-child(4) > div > div > div > ul > li').each(function(a, b) {
                    hasil.push({
                        title: $(b).find('h4').text(),
                        source: 'https://meloboom.com/' + $(b).find('a').attr('href'),
                        audio: $(b).find('audio').attr('src')
                    })
                })
                resolve(hasil)
            })
    })
}

async function musicaldown(URL) {
    return new Promise((resolve, rejecet) => {
        axios.get('https://musicaldown.com/id', {
            headers: {
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            }
        }).then(res => {
            const $ = cheerio.load(res.data)
            const url_name = $("#link_url").attr("name")
            const token_name = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(2)").attr("name")
            const token_ = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(2)").attr("value")
            const verify = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(3)").attr("value")
            let data = {
                [`${url_name}`]: URL,
                [`${token_name}`]: token_,
                verify: verify
            }
        axios.request({
            url: 'https://musicaldown.com/id/download',
            method: 'post',
            data: new URLSearchParams(Object.entries(data)),
            headers: {
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
                'cookie': res.headers["set-cookie"]
            }
        }).then(respon => {
            const ch = cheerio.load(respon.data)
        axios.request({
            url: 'https://musicaldown.com/id/mp3',
            method: 'post',
            headers: {
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
                'cookie': res.headers["set-cookie"]
            }
        }).then(resaudio => { 
            const hc = cheerio.load(resaudio.data)       
            const result = {
                video: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a.btn.waves-effect.waves-light.orange:nth-child(3)').attr('href'),
                audio: hc('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(5)').attr('href'),
                video_original: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a.btn.waves-effect.waves-light.orange:nth-child(4)').attr('href'),
                audio_original: hc('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(9)').attr('href'),
                preview: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4 > img').attr('src')
            }
        resolve(result)
        })
    })
    })
    })
}

async function shorts(url) {
  const res = await axios.get('https://tinyurl.com/api-create.php?url=' + url)
  return res.data
}

async function joox(query) {
    return new Promise((resolve, reject) => {
        const time = Math.floor(new Date() / 1000)
        axios.get('http://api.joox.com/web-fcgi-bin//web_search?lang=id&country=id&type=0&search_input=' + query + '&pn=1&sin=0&ein=29&_=' + time)
            .then(({ data }) => {
                let result = []
                let hasil = []
                let promoses = []
                let ids = []
                data.itemlist.forEach(result => {
                    ids.push(result.songid)
                });
                for (let i = 0; i < data.itemlist.length; i++) {
                    const get = `http://api.joox.com/web-fcgi-bin/web_get_songinfo?songid=${ids[i]}&lang=id&country=id&from_type=null&channel_id=null&_=`
                    promoses.push(
                        axios.get(get, {
                            headers: {
        'Content-Type':'application/json',
        'Cookie': 'wmid=142420656; user_type=1; country=id; session_key=2a5d97d05dc8fe238150184eaf3519ad;',
        'useragent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36'
      }
                        })
                            .then(({ data }) => {
                                const res = JSON.parse(data.replace('MusicInfoCallback(', '').replace('\n)', ''))
                  
                                hasil.push({
                                    lagu: res.msong,
                                    id: res.encodeSongId,
                                    album: res.malbum,
                                    penyanyi: res.msinger,
                                    publish: res.public_time,
                                    img: res.imgSrc,
                                  mp3dl: `https://api.akuari.my.id/downloader/jooxdlmp3?link=${res.encodeSongId}`,
                                   mp3: res.mp3Url
                                })
                                Promise.all(promoses).then(() => resolve({
                                    status: true,
                                    data: hasil,
                                }))
                            }).catch(reject)
                    )
                }
            }).catch(reject)
    })
}


async function jooxdl(url) {
    return new Promise((resolve, reject) => {
    axios.get('http://api.joox.com/web-fcgi-bin/web_get_songinfo?songid=' + url + '&lang=id&country=id&from_type=null&channel_id=null&_=' + (new Date).getTime(), {
      headers: {
        'Content-Type':'application/json',
        'Cookie': 'wmid=142420656; user_type=1; country=id; session_key=2a5d97d05dc8fe238150184eaf3519ad;',
        'useragent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36'
      }
    }).then(res => {
      const mentahan = res.data
      const replaced = mentahan.replace('MusicInfoCallback(', '').replace(`}
)`,'}')
      console.log(replaced)
      const jsone = JSON.parse(replaced)
      const title = jsone.msong
      const artist = jsone.msinger
      const album = jsone.malbum
      const img = jsone.imgSrc
      const mp3_url = jsone.mp3Url
      const filesize = jsone.size128
      const finalsize = niceBytes(filesize)
      const ext = 'mp3'
      const interval = jsone.minterval
      const duration = moment.duration(interval, 'seconds');
      const m = duration.minutes(); // 20
      const s = duration.seconds(); // 25
      const durasi = `${m}:${s}`
      const result = ({
        judul: title,
        artist: artist,
        album: album,
        img_url: img,
        mp3_url: mp3_url,
        filesize: finalsize,
        ext: ext,
        duration: durasi,
      })
      resolve(result)
    }).catch(err => {
      reject(err)
    })
})
}

async function sfiledl(URL) {
	return new Promise((resolve, reject) => {
		axios.request({
			url: URL,
			method: "GET",
			headers: {
				"User-Agent": "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36",
				"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
			}
		}).then(res => {
			const $ = cheerio.load(res.data)
			const token = $('#content > div > div.middle > div.right > article:nth-child(1) > section:nth-child(3) > div.buttons > form > input[type=hidden]:nth-child(1)').attr('value')
			const title = $('#content > div > div.middle > div.right > article:nth-child(1) > section.box-content.meta > h1').text().trim()
			const _size = $('#content > div > div.middle > div.right > article:nth-child(1) > section.box-content.meta > p').text().trim()
			const size_ = _size.split('-')
			const size = size_[0]
		axios({
			url: URL+'/dl',
			method: "POST",
			data: new URLSearchParams(Object.entries({csrfmiddlewaretoken: token, referrer: URL})),
			headers: {
				"User-Agent": "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36",
				"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
			}
		}).then(respon => {
			const ch = cheerio.load(respon.data)
			const url = ch('#content > div > div.middle > div.right > article:nth-child(1) > section > p > a').attr('href')
			const result = {
				title: title,
				size: size,
				url: url
			}
			resolve(result)
		})
		})
	})
}

async function aiovideo(url) {
	return new Promise((resolve, reject) => {
		axios({
			url: 'https://aiovideodl.ml/',
			method: 'GET',
			headers: {
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "PHPSESSID=3893d5f173e91261118a1d8b2dc985c3; _ga=GA1.2.792478743.1635388171;"
			}
		}).then((data) => {
			let a = cheerio.load(data.data)
			let token = a('#token').attr('value')
			const options = {
				method: 'POST',
				url: `https://aiovideodl.ml/wp-json/aio-dl/video-data/`,
				headers: {
					"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
					"cookie": "PHPSESSID=3893d5f173e91261118a1d8b2dc985c3; _ga=GA1.2.792478743.1635388171;"
				},
				formData: {
					url: url,
					token: token
				}
			};
			request(options, async function(error, response, body) {
				if (error) {
					return resolve({
						error
					})
				};
				const $ = cheerio.load(body)
				res = JSON.parse(body)
				res.status = 200
				res.author = ""
				resolve(res);
			});
		})
	})
}

async function searchIlust(query) {
	return new Promise((resolve, reject) => { 
		axios.get('https://api.lolicon.app/setu/v2?&size=regular&num=100&keyword='+query).then(res => {
			const result = res.data.data
      if (result.length < 1) {
          throw 'Hasil tidak di temukan!'
      } else {
        resolve(result)
      }
		})
	})
}


function clean(string) {
    return string.replace(/{/g, '').replace(/}/g, '')
                 .replace(/"/g, '')
}


//

async function otakudesuSearch(title) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'https://otakudesu.info/?s='+title+'&post_type=anime',
            method: 'GET',
            headers: {
                "user-agent": "Mozilla/5.0 (Linux; Android 10; RMX2020) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Mobile Safari/537.36"
            }
        }).then(({ data }) => {
            let $ = cheerio.load(data)
            let search = []
            $('#venkonten > div > div.venser > div > div > ul > li').each(function (a, b) {
                search.push($(b).find('h2 > a').attr('href'))
                let url = search[Math.floor(Math.random() * search.length)]
                axios({
                    url,
                    method: 'GET',
                    headers: {
                        "user-agent": "Mozilla/5.0 (Linux; Android 10; RMX2020) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Mobile Safari/537.36"
                    }
                }).then(({ data }) => {
                    let $ = cheerio.load(data)
                    let link_eps = []
                    $('#venkonten > div.venser > div.episodelist > ul > li').each(function (a, b) {
                        link_eps.push({ episode: $(b).find('span > a').text(), upload_at: $(b).find('span.zeebr').text(), link: $(b).find('span > a').attr('href') })
                    })
                    let hasil = {
                        title: { 
                            indonesia: $('#venkonten > div.venser > div.jdlrx > h1').text(),
                            synonym: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(1) > span').text().replace('Judul: ', ''),
                            japanese: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(2) > span').text().replace('Japanese: ', '')
                        },
                        score: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(3) > span').text().replace('Skor: ', ''),
                        producer: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(4) > span').text().replace('Produser: ', ''),
                        type: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(5) > span').text().replace('Tipe: ', ''),
                        status: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(6) > span').text().replace('Status: ', ''),
                        total_eps: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(7) > span').text().replace('Total Episode: ', ''),
                        duration: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(8) > span').text().replace('Durasi: ', ''),
                        release: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(9) > span').text().replace('Tanggal Rilis: ', ''),
                        studio: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(10) > span').text().replace('Studio: ', ''),
                        genre: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(11) > span').text().replace('Genre: ', ''),
                        synopsis: $('#venkonten > div.venser > div.fotoanime > div.sinopc > p').text(),
                        link_eps: link_eps
                    }
                    resolve(hasil)
                })
            })
        })
    })
}

async function otakudesuDetail(url) {
    return new Promise((resolve, reject) => {
        axios({
            url,
            method: 'GET',
            headers: {
                "user-agent": "Mozilla/5.0 (Linux; Android 10; RMX2020) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Mobile Safari/537.36"
            }
        }).then(({ data }) => {
            let $ = cheerio.load(data)
            let link_eps = []
            $('#venkonten > div.venser > div.episodelist > ul > li').each(function (a, b) {
                link_eps.push({ episode: $(b).find('span > a').text(), upload_at: $(b).find('span.zeebr').text(), link: $(b).find('span > a').attr('href') })
            })
            let hasil = {
                title: { 
                    indonesia: $('#venkonten > div.venser > div.jdlrx > h1').text(),
                    anonym: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(1) > span').text().replace('Judul: ', ''),
                    japanese: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(2) > span').text().replace('Japanese: ', '')
                },
                score: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(3) > span').text().replace('Skor: ', ''),
                producer: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(4) > span').text().replace('Produser: ', ''),
                type: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(5) > span').text().replace('Tipe: ', ''),
                status: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(6) > span').text().replace('Status: ', ''),
                total_eps: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(7) > span').text().replace('Total Episode: ', ''),
                duration: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(8) > span').text().replace('Durasi: ', ''),
                release: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(9) > span').text().replace('Tanggal Rilis: ', ''),
                studio: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(10) > span').text().replace('Studio: ', ''),
                genre: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(11) > span').text().replace('Genre: ', ''),
                synopsis: $('#venkonten > div.venser > div.fotoanime > div.sinopc > p').text(),
                link_eps: link_eps
            }
            resolve(hasil)
        })
    })
}

async function otakudesuDownload(url) {
    return new Promise((resolve, reject) => {
        axios({
            url,
            method: 'GET',
            headers: {
                "user-agent": "Mozilla/5.0 (Linux; Android 10; RMX2020) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Mobile Safari/537.36"
            }
        }).then(({ data }) => {
            let $ = cheerio.load(data)
            let mp4 = []
            $('#venkonten > div.venser > div.venutama > div.download > ul:nth-child(2) > li').each(function (a, b) {
                $(b).find('a').each(function (c, d) {
                    mp4.push({ resolusi: $(b).find('strong').text(), size: $(b).find('i').text(), type: $(d).text(), link: $(d).attr('href') })
                })
            })
            let mkv = []
            $('#venkonten > div.venser > div.venutama > div.download > ul:nth-child(3) > li').each(function (a, b) {
                $(b).find('a').each(function (c, d) {
                    mkv.push({ resolusi: $(b).find('strong').text(), size: $(b).find('i').text(), type: $(d).text(), link: $(d).attr('href') })
                })
            })
            let hasil = {
                title: $('#venkonten > div.venser > div.venutama > h1').text(),
                post: $('#venkonten > div.venser > div.venutama > div.kategoz > span:nth-child(2)').text().replace('Posted by ', ''),
                release: $('#venkonten > div.venser > div.venutama > div.kategoz > span:nth-child(4)').text().replace('Release on ', ''),
                credit: $('#venkonten > div.venser > div.cukder > div.infozin > div > p:nth-child(1)').text().replace('Credit: ', ''),
                encoder: $('#venkonten > div.venser > div.cukder > div.infozin > div > p:nth-child(2)').text().replace('Encoder: ', ''),
                genres: $('#venkonten > div.venser > div.cukder > div.infozin > div > p:nth-child(3)').text().replace('Genres: ', ''),
                duration: $('#venkonten > div.venser > div.cukder > div.infozin > div > p:nth-child(4)').text().replace('Duration: ', ''),
                type: $('#venkonten > div.venser > div.cukder > div.infozin > div > p:nth-child(5)').text().replace('Tipe: ', ''),
                image: $('#venkonten > div.venser > div.cukder > img').attr('src'),
                link_mp4: mp4,
                link_mkv: mkv
            }
            resolve(hasil)
        })
    })
}

async function anime(q) {
    return new Promise((resolve, reject) => {
        axios.get('https://myanimelist.net/anime.php?cat=anime&q='+q)
        .then((get) => {
            let $ = cheerio.load(get.data)
            let anime = []
            $('#content > div.js-categories-seasonal.js-block-list.list > table > tbody > tr').each(function (a, b) {
                anime.push($(b).find('td:nth-child(1) > div > a').attr('href') || '')
            })
            let random = anime[Math.floor(Math.random() * anime.length)]
            axios.get(random)
            .then((res) => {
                let $$ = cheerio.load(res.data)
                let related = []
                $$('#content > table > tbody > tr > td:nth-child(2) > div.js-scrollfix-bottom-rel > table > tbody > tr:nth-child(3) > td > table > tbody > tr').each(function (a, b) {
                    related.push({ type: $$(b).find('td:nth-child(1)').text(), name: $$(b).find('td:nth-child(2)').text() })
                })
                let character = []
                $$('#content > table > tbody > tr > td:nth-child(2) > div > table > tbody > tr:nth-child(3) > td > div.detail-characters-list.clearfix').eq(0).find('table').each(function (a, b) {
                    character.push({
                        character: {
                            name: $$(b).find('tbody > tr > td:nth-child(2) > h3').text(),
                            status: $$(b).find('tbody > tr > td:nth-child(2) > div > small').text(),
                            detail: $$(b).find('tbody > tr > td:nth-child(2) > h3 > a').attr('href'),
                            image: $$(b).find('tbody > tr > td.ac.borderClass > div > a > img').attr('data-src') || $$(b).find('tbody > tr > td.ac.borderClass > div > a > img').attr('src')
                        },
                        voice_actor: {
                            name: $$(b).find('tbody > tr > td:nth-child(3) > table > tbody > tr > td.va-t.ar.pl4.pr4 > a').text(),
                            origin: $$(b).find('tbody > tr > td:nth-child(3) > table > tbody > tr > td.va-t.ar.pl4.pr4 > small').text(),
                            detail: $$(b).find('tbody > tr > td:nth-child(3) > table > tbody > tr > td.va-t.ar.pl4.pr4 > a').attr('href'),
                            image: $$(b).find('table > tbody > tr > td:nth-child(2) > div > a > img').attr('data-src') || $$(b).find('table > tbody > tr > td:nth-child(2) > div > a > img').attr('src')
                        }
                    })
                })
                let staff = []
                $$('#content > table > tbody > tr > td:nth-child(2) > div > table > tbody > tr:nth-child(3) > td > div.detail-characters-list.clearfix').eq(1).find('table').each(function (a, b) {
                    staff.push({
                        name: $$(b).find('tbody > tr > td:nth-child(2) > a').text(),
                        status: $$(b).find('tbody > tr > td:nth-child(2) > div > small').text(),
                        detail: $$(b).find('tbody > tr > td:nth-child(2) > a').attr('href'),
                        image: $$(b).find('tbody > tr > td.ac.borderClass > div > a > img').attr('data-src') || $$(b).find('tbody > tr > td.ac.borderClass > div > a > img').attr('src')
                    })
                })
                let info = []
                $$('#content > table > tbody > tr > td.borderClass > div > div.spaceit_pad').each(function (a, b) {
                    info.push({ type: $$(b).text().split(':')[0].trim().split('\n')[0] || $$(b).text().split(':')[0].trim() || '', result: $$(b).text().split(':')[1].trim().split('\n')[0] || $$(b).text().split(':')[1].trim() || '' })
                })
                let hasil = {
                    title: $$('#contentWrapper > div:nth-child(1) > div > div.h1-title > div > h1').text(),
                    info: info,
                    image: $$('#content > table > tbody > tr > td.borderClass > div > div:nth-child(1) > a > img').attr('data-src') || $$('#content > table > tbody > tr > td.borderClass > div > div:nth-child(1) > a > img').attr('src'),
                    trailer: $$('div.anime-detail-header-video.di-tc.va-t.pl16 > div.video-promotion > a').attr('href'),
                    synopsis: $$('#content > table > tbody > tr > td:nth-child(2) > div > table > tbody > tr:nth-child(1) > td > p').text(),
                    related,
                    character,
                    staff
                }
                resolve(hasil)
            })
        })
    })
}

async function manga(q) {
    return new Promise((resolve, reject) => {
        axios.get('https://myanimelist.net/manga.php?cat=manga&q='+q)
        .then((get) => {
            let $ = cheerio.load(get.data)
            let manga = []
            $('#content > div.js-categories-seasonal.js-block-list.list > table > tbody > tr').each(function (a, b) {
                manga.push($(b).find('td:nth-child(2) > a').attr('href') || '')
            })
            let random = manga[Math.floor(Math.random() * manga.length)]
            axios.get(random)
            .then((res)=> {
                let $$ = cheerio.load(res.data)
                let related = []
                $$('#content > table > tbody > tr > td:nth-child(2) > div.js-scrollfix-bottom-rel > table > tbody > tr:nth-child(3) > td > table > tbody > tr').each(function (a, b) {
                    related.push({ type: $$(b).find('td:nth-child(1)').text(), name: $$(b).find('td:nth-child(2) > a').text(), url: 'https://myanimelist.net'+$$(b).find('td:nth-child(2) > a').attr('href') })
                })
                let info = []
                $$('#content > table > tbody > tr > td.borderClass > div > div.spaceit_pad').each(function (a, b) {
                    info.push({ type: $$(b).text().split(':')[0].trim() || '', result: $$(b).text().split(':')[1].trim() })
                })
                let character = []
                $$('#content > table > tbody > tr > td:nth-child(2) > div.js-scrollfix-bottom-rel > table > tbody > tr:nth-child(3) > td > div.detail-characters-list.clearfix > div.left-column.fl-l.divider > table').each(function (a, b) {
                    character.push({
                        character: {
                            name: $$(b).find('tbody > tr > td:nth-child(2) > a').text(),
                            status: $$(b).find('tbody > tr > td:nth-child(2) > div > small').text().trim(),
                            detail: $$(b).find('tbody > tr > td:nth-child(2) > a').attr('href'),
                            image: $$(b).find('tbody > tr > td.ac.borderClass > div > a > img').attr('data-src') || $$(b).find('tbody > tr > td.ac.borderClass > div > a > img').attr('src')
                        }
                    })
                })
                let hasil = {
                    title: $$('#contentWrapper > div:nth-child(1) > h1').text().trim(),
                    info: info,
                    image: $$('#content > table > tbody > tr > td.borderClass > div > div:nth-child(1) > a > img').attr('data-src') || $$('#content > table > tbody > tr > td.borderClass > div > div:nth-child(1) > a > img').attr('src'),
                    synopsis: $$('#content > table > tbody > tr > td:nth-child(2) > div.js-scrollfix-bottom-rel > table > tbody > tr:nth-child(1) > td > span').text(),
                    related,
                    character
                }
                resolve(hasil)
            })
        })
    })
}

async function wibu(q) {
    return new Promise((resolve, reject) => {
        axios.get('https://myanimelist.net/character.php?cat=character&q='+q)
        .then((get) => {
            let $ = cheerio.load(get.data)
            let character = []
            $('#content > table > tbody > tr').each(function (a, b) {
                character.push($(b).find('td:nth-child(2) > a').attr('href'))
            })
            let random = character[Math.floor(Math.random() * character.length)]
            axios.get(random+'/pics')
            .then((res) => {
                let $$ = cheerio.load(res.data)
                let hasil = []
                $$('#content > table > tbody > tr > td:nth-child(2) > table > tbody > tr').each(function (a, b) {
                    hasil.push({ name: $$(b).find('img').attr('alt'), image: $$(b).find('a').attr('href') ||$(b).find('img').attr('src') || $$(b).find('img').attr('data-src') })
                })
                resolve(hasil)
            })
        })
    })
}

async function fandom(q) {
    return new Promise((resolve, reject) => {
        axios.get(`https://jump.fandom.com/wiki/Special:Search?query=${q}&scope=internal&navigationSearch=true`)
        .then((get) => {
            let $ = cheerio.load(get.data)
            let getres = []
            $('#mw-content-text > section > div > div.unified-search__layout__main > ul > li').each(function (a, b) {
                getres.push($(b).find('article > h1 > a').attr('href'))
            })
            let random = "https://jump.fandom.com/wiki/JoJo%27s_Bizarre_Adventure"
            axios.get(random)
            .then((res) => {
                let $$ = cheerio.load(res.data)
                let part = []
                $$('#mw-content-text > div > ul > li').each(function (a, b) {
                    part.push({ part: $$(b).text().trim(), url: random.split('/')[0]+$$(b).find('a').attr('href') })
                })
                let info = []
                $$('#mw-content-text > div > table > tbody > tr').each(function (a, b) {
                    info.push({ type: $$(b).find('td:nth-child(1)').text().trim(), result: $$(b).find('td:nth-child(2)').text() })
                })
                let hasil = {
                    title: $$('body > div.main-container > div.resizable-container > div.page.has-right-rail > main > div.page-header > div.page-header__bottom > div.page-header__title-wrapper > h1').text().trim(),
                    info: $$('#mw-content-text > div > p:nth-child(2)').text(),
                    plot: $$('#mw-content-text > div > p:nth-child(6)').text(),
                    image: $$('#mw-content-text > div > table > tbody > tr:nth-child(1) > td > a').attr('href') || $$('#mw-content-text > div > table > tbody > tr:nth-child(1) > td > a > img').attr('src'),
                    part,
                    info,
                    lisensi: $$('body > div.main-container > div.resizable-container > div.page.has-right-rail > main > div.page-footer > div.license-description').text()
                }
                resolve(hasil || $$('body > div.main-container > div.resizable-container > div.page.has-right-rail > main').text())
            })
        })
    })
}

async function character(q) {
    return new Promise((resolve, reject) => {
        axios.get('https://myanimelist.net/character.php?cat=character&q='+q)
        .then((get) => {
            let $ = cheerio.load(get.data)
            let character = []
            $('#content > table > tbody > tr').each(function (a, b) {
                character.push($(b).find('td:nth-child(2) > a').attr('href'))
            })
            let random = character[Math.floor(Math.random() * character.length)]
            axios.get(random)
            .then((res) => {
                let $$ = cheerio.load(res.data)
                let voice = []
                $$('#content > table > tbody > tr > td:nth-child(2) > table').each(function (a, b) {
                    voice.push({ name: $$(b).find('td:nth-child(2) > a').text(), origin: $$(b).find('td:nth-child(2) > div > small').text(), detail: $$(b).find('td:nth-child(2) > a').attr('href'), image: $$(b).find('td:nth-child(1) > div > a > img').attr('data-src') || $$(b).find('td:nth-child(1) > div > a > img').attr('src') })
                })
                let animeography = []
                $$('#content > table > tbody > tr > td.borderClass > table:nth-child(6) > tbody > tr').each(function (a, b) {
                    animeography.push({ name: $$(b).find('td:nth-child(2) > a').text(), status: $$(b).find('td:nth-child(2) > div > small').text(), detail: $$(b).find('td:nth-child(2) > a').attr('href'), image: $$(b).find('td:nth-child(1) > div > a > img').attr('data-src') || $$(b).find('td:nth-child(1) > div > a > img').attr('src') })
                })
                let mangaography = []
                $$('#content > table > tbody > tr > td.borderClass > table:nth-child(9) > tbody > tr').each(function (a, b) {
                    mangaography.push({ name: $$(b).find('td:nth-child(2) > a').text(), status: $$(b).find('td:nth-child(2) > div > small').text(), detail: $$(b).find('td:nth-child(2) > a').attr('href'), image: $$(b).find('td:nth-child(1) > div > a > img').attr('data-src') || $$(b).find('td:nth-child(1) > div > a > img').attr('src') })
                })
                let hasil = {
                    name: $$('#contentWrapper > div:nth-child(1) > div > div.h1-title > h1').text(),
                    image: $$('#content > table > tbody > tr > td.borderClass > div:nth-child(1) > a > img').attr('data-src') || $$('#content > table > tbody > tr > td.borderClass > div:nth-child(1) > a > img').attr('src'),
                    detail: $$('#content > table > tbody > tr > td:nth-child(2)').text().split('Characters')[1].split('Voice Actors')[0].trim(),
                    voice_actor: voice,
                    animeography,
                    mangaography
                }
                resolve(hasil)
            })
        })
    })
}

async function topAnime(type = 'anime') {
    return new Promise((resolve, reject) => {
        // type = 1. airing, 2. upcoming, 3. tv, 4. movie, 5. ova, 6. ona, 7. special, 8. bypopularity, 9. favorite
        axios.get('https://myanimelist.net/topanime.php?type='+type)
        .then(({ data }) => {
            let $ = cheerio.load(data)
            let hasil = []
            $('tr.ranking-list').each(function (a, b) {
                hasil.push({
                    rank: $(b).find('td.rank.ac > span').text(),
                    title: $(b).find('td.title.al.va-t.word-break > div > div.di-ib.clearfix > h3').text(),
                    info: $(b).find('td.title.al.va-t.word-break > div > div.information.di-ib.mt4').text().trim(),
                    rating: $(b).find('td.score.ac.fs14 > div').text(),
                    detail: $(b).find('td.title.al.va-t.word-break > div > div.di-ib.clearfix > h3 > a').attr('href'),
                    image: $(b).find('td.title.al.va-t.word-break > a > img').attr('data-src') || $(b).find('td.title.al.va-t.word-break > a > img').attr('src')
                })
            })
            resolve(hasil)
        })
    })
}

async function topManga(type = 'manga') {
    // type = 1. manga, 2. oneshots, 3. doujin, 4. lightnovels, 5. novels, 6. manhwa, 7.manhua, 8. bypopularity, 9. favorite
    return new Promise((resolve, reject) => {
        axios.get('https://myanimelist.net/topmanga.php?type='+type)
        .then(({ data }) => {
            let $ = cheerio.load(data)
            let hasil = []
            $('tr.ranking-list').each(function (a, b) {
                hasil.push({
                    rank: $(b).find('td.rank.ac > span').text(),
                    title: $(b).find('td.title.al.va-t.clearfix.word-break > div > h3').text(),
                    info: $(b).find('td.title.al.va-t.clearfix.word-break > div > div.information.di-ib.mt4').text().trim(),
                    rating: $(b).find('td.score.ac.fs14 > div').text(),
                    detail: $(b).find('td.title.al.va-t.clearfix.word-break > div > h3 > a').attr('href'),
                    image: $(b).find('td.title.al.va-t.clearfix.word-break > a > img').attr('data-src') || $(b).find('td.title.al.va-t.clearfix.word-break > a > img').attr('src')
                })
            })
            resolve(hasil)
        })
    })
}