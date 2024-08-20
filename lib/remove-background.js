import fetch from "node-fetch"
import {
    UploadToIBB
} from "./upload-to-ibb.js"

async function RemoveBackground(url, ibbkey) {
    let Response = null;
    let task_id;
    await fetch("https://api.simplified.com/api/v1/growth-tools", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                action: "REMOVE_BACKGROUND",
                image_url: url,
                image_type: "image/jpg",
            }),
        })
        .then((res) => res.json())
        .then((json) => {
            task_id = json.task_id;
        })
        .catch((err) => console.log(err));

    while (true) {
        Response = await (
            await fetch("https://api.simplified.com/api/v1/tasks/" + task_id, {
                method: "GET",
                hostname: "api.simplified.com",
            })
        ).json();
        if (Response.info != "") {
            let IBB = await UploadToIBB(Response.info.data.url, 600, ibbkey)
            return IBB;
        }
    }
}

export {
    RemoveBackground
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