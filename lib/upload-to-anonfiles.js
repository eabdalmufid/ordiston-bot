import fs from 'fs';
import fetch from 'node-fetch';
import FormData from 'form-data';

async function get(id) {
    const response = await fetch(`https://api.anonfiles.com/v2/file/${id}/info`);
    return await response.json();
}

async function upload(path) {
    let data = new FormData();
    data.append('file', fs.createReadStream(path));
    const response = await fetch('https://api.anonfiles.com/upload', {
        method: 'POST',
        body: data
    });
    return await response.json();
}

async function download(fileURL, path) {
    if (!/((http|https):\/\/)(www.)?anonfiles\.com\b([-a-zA-Z0-9@:%._\+~#?&//=]*)/.test(fileURL)) {
        fileURL = (await get(fileURL))['data']['file']['url']['full'];
    }
    const response = await fetch(fileURL);
    var data = await response.text();
    let url = extractRawURL(data);
    path = path || extractFileName(data)

    const fileDownload = await fetch(url);
    const fileStream = fs.createWriteStream(path);
    await new Promise((resolve, reject) => {
        fileDownload.body.pipe(fileStream);
        fileDownload.body.on('error', reject);
        fileStream.on('finish', resolve);
    });
}

function extractRawURL(websiteData) {
    return websiteData.match(/https:\/\/cdn-[0-9]{3}.anonfiles.com\/[aA-zZ0-9]+\/[aA-zZ0-9]+-[aA-zZ0-9]+\/[^"]+/)[0];
}

function extractFileName(websiteData) {
    return websiteData.match(/text-center text-wordwrap">[^<]+/)[0].replace('text-center text-wordwrap">', '');
}

const AnonFiles = { get, upload, download, extractRawURL, extractFileName };
export default AnonFiles;

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