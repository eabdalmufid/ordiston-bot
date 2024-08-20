import axios from 'axios'
import BodyForm from 'form-data'
import {
    fileTypeFromBuffer
} from 'file-type'
import fetch from 'node-fetch'
import fs from 'fs'
import cheerio from 'cheerio'


function TelegraPh(Path) {
    return new Promise(async (resolve, reject) => {
        if (!fs.existsSync(Path)) return reject(new Error("File not Found"))
        try {
            const form = new BodyForm();
            form.append("file", fs.createReadStream(Path))
            const data = await axios({
                url: "https://telegra.ph/upload",
                method: "POST",
                headers: {
                    ...form.getHeaders()
                },
                data: form
            })
            //console.log(data)
            return resolve("https://telegra.ph" + data.data[0].src)
        } catch (err) {
            return reject(new Error(String(err)))
        }
    })
}

async function UploadFileUgu(input) {
    return new Promise(async (resolve, reject) => {
        const form = new BodyForm();
        form.append("files[]", fs.createReadStream(input))
        await axios({
            url: "https://uguu.se/upload.php",
            method: "POST",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
                ...form.getHeaders()
            },
            data: form
        }).then((data) => {
            resolve(data.data.files[0])
        }).catch((err) => reject(err))
    })
}

function webp2mp4File(path) {
    return new Promise((resolve, reject) => {
        const form = new BodyForm()
        form.append('new-image-url', '')
        form.append('new-image', fs.createReadStream(path))
        axios({
            method: 'post',
            url: 'https://s6.ezgif.com/webp-to-mp4',
            data: form,
            headers: {
                'Content-Type': `multipart/form-data; boundary=${form._boundary}`
            }
        }).then(({
            data
        }) => {
            const bodyFormThen = new BodyForm()
            const $ = cheerio.load(data)
            const file = $('input[name="file"]').attr('value')
            bodyFormThen.append('file', file)
            bodyFormThen.append('convert', "Convert WebP to MP4!")
            axios({
                method: 'post',
                url: 'https://ezgif.com/webp-to-mp4/' + file,
                data: bodyFormThen,
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`
                }
            }).then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const result = 'https:' + $('div#output > p.outfile > video > source').attr('src')
                resolve({
                    status: true,
                    message: "Created By MRHRTZ",
                    result: result
                })
            }).catch(reject)
        }).catch(reject)
    })
}

function UpHardianto(path) {
    return new Promise(async (resolve, reject) => {
        var form = new BodyForm()
        form.append('recfile', fs.createReadStream(path))
        await axios(`https://uploader.hardianto.xyz/upload`, {
            method: 'POST',
            data: form,
            headers: {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9,id;q=0.8",
                "content-type": `multipart/form-data; boundary=${form._boundary}`
            }
        }).then(({
            data
        }) => {
            console.log(data.file)
            resolve(data.file)

        }).catch(e => console.log(e))
    })
}

async function floNime(medianya, options = {}) {
    const {
        ext
    } = await fileTypeFromBuffer(medianya) || options.ext
    var form = new BodyForm()
    form.append('file', medianya, 'tmp.' + ext)
    jsonnya = await fetch('https://flonime.my.id/upload', {
            method: 'POST',
            body: form
        })
        .then((response) => response.json())
        .then((result) => {
            return result
        })
        .catch(e => {
            return e
        })
    return jsonnya
}


export {
    TelegraPh,
    UploadFileUgu,
    webp2mp4File,
    UpHardianto,
    floNime
}


import {
    fileURLToPath,
    URL
} from 'url'
import chalk from 'chalk'
const __filename = new URL('', import.meta.url).pathname
const __dirname = new URL('.', import.meta.url).pathname
let file = fileURLToPath(import.meta.url)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.bgGreen(chalk.black("[  UPDATE ]")), chalk.white(`${__filename}`))
    import(`${file}?update=${Date.now()}`)
})