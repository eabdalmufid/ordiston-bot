import axios from 'axios'
import cheerio from 'cheerio'

async function webp2mp4(url) {
    const res = await axios('https://ezgif.com/webp-to-mp4?url=' + url)
    const $ = cheerio.load(res.data)
    const file = $('input[name="file"]').attr('value')
    const data = {
        file: file,
        convert: 'Convert WebP to MP4!',
    }
    const res2 = await axios({
        method: 'post',
        url: 'https://ezgif.com/webp-to-mp4/' + data.file,
        data: new URLSearchParams(Object.entries(data))
    })
    const $2 = cheerio.load(res2.data)
    const link = $2('div#output > p.outfile > video > source').attr('src')
    const output = 'https:' + link
    return output
}

async function webp2img(url) {
    const res = await axios('https://s5.ezgif.com/webp-to-png?url=' + url)
    const $ = cheerio.load(res.data)
    const file = $('input[name="file"]').attr('value')
    const data = {
        file: file,
        'convert-to-webp': 'Convert to PNG!',
    }
    const res2 = await axios({
        method: 'post',
        url: 'https://ezgif.com/webp-to-png/' + data.file,
        data: new URLSearchParams(Object.entries(data))
    })
    const $2 = cheerio.load(res2.data)
    const link = $2('div#output > p.outfile > img').attr('src')
    const output = 'https:' + link
    return output
}

async function img2webp(url) {
    const res = await axios('https://s5.ezgif.com/jpg-to-webp?url=' + url)
    const $ = cheerio.load(res.data)
    const file = $('input[name="file"]').attr('value')
    const data = {
        file: file,
        'convert-to-webp': 'Convert WebP to MP4!',
    }
    const res2 = await axios({
        method: 'post',
        url: 'https://ezgif.com/jpg-to-webp/' + data.file,
        data: new URLSearchParams(Object.entries(data))
    })
    const $2 = cheerio.load(res2.data)
    const link = $2('div#output > p.outfile > img').attr('src')
    const output = 'https:' + link
    return output
}

async function vid2webp(url) {
    const res = await axios('https://s5.ezgif.com/video-to-webp?url=' + url)
    const $ = cheerio.load(res.data)
    const file = $('input[name="file"]').attr('value')
    const data = {
        file: file,
        end: 4,
        'video-to-webp': 'Convert to GIF!',
    }
    const res2 = await axios({
        method: 'post',
        url: 'https://ezgif.com/video-to-webp/' + data.file,
        data: new URLSearchParams(Object.entries(data))
    })
    const $2 = cheerio.load(res2.data)
    const link = $2('div#output > p.outfile > img').attr('src')
    const output = 'https:' + link
    return output
}

export {
    webp2mp4,
    webp2img,
    img2webp,
    vid2webp
}

import {
    fileURLToPath,
    URL
} from 'url'
import chalk from 'chalk'
import fs from 'fs'
const __filename = new URL('', import.meta.url).pathname
const __dirname = new URL('.', import.meta.url).pathname
let file = fileURLToPath(import.meta.url)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.bgGreen(chalk.black("[  UPDATE ]")), chalk.white(`${__filename}`))
    import(`${file}?update=${Date.now()}`)
})