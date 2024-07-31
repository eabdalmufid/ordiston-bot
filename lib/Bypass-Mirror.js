
import { load } from "cheerio";
import axios from "axios";

export async function bypassMirrored(url) {
    try{
    let res, status
    let id = url.split("/files/")[1].split("/")[0]
    res = await axios.get(`https://www.mirrored.to/downlink/${id}`)
    let $ = load(res.data)

    let redirect = $("body > div.container.dl-width > div > div > a").attr("href")
    res = await axios.get(redirect)

    let apiRequest = res.data.split('ajaxRequest.open("GET", "')[1].split('", true);')[0]
    res = await axios.get("https://mirrored.to"+apiRequest)
    let new$ = load(res.data)

    let arr = []

    new$("tr").each((i,el)=>{
        let host = $(el).find("img").first().attr("alt")
        let url = $(el).find(".get_btn").parent().attr("href")
         status = $(el).find("td:nth-child(4)").text()
        status = status.trim()
        if(!host) return
        arr.push({host,url,status})
    })

    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        if(element.url){
            let newUrl = await getLink(element.url)
            arr[i].url = newUrl
        }
    }
    return arr
    } catch (error) {
        console.log(`Error on ${url}`)
        throw url
    }
}

export async function getLink(url){
    let res = await axios.get(url)
    let $ = load(res.data)
    return $("code").text()
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