import fetch from "node-fetch"

async function UploadToIBB(url, expiration, ibbkey) {
//Key c93b7d1d3f7a145263d4651c46ba55e4
    let data = await fetch("https://api.imgbb.com/1/upload?key=" + ibbkey + "&expiration=" + expiration + "&image=" + url).then(v => v.json())
    return data
}

export {
    UploadToIBB
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